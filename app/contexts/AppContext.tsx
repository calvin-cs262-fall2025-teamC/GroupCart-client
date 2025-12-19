
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Favor } from "../models/Favor";
import { Group } from '../models/Group';
import { ListItem } from '../models/ListItem';
import { SharedShoppingItem } from "../models/SharedShoppingItem";
import { User } from '../models/User';
import { ApiClient } from "../services/ApiClient";

/**
 * Interface defining the shape of the AppContext.
 * Contains user and group state, grocery lists, favors, and methods to manage them.
 */
interface AppContextType {

    user: User | null;
    setUser: (user: User) => void;
    group: Group | null;
    setGroup: (group: Group) => void;
    myGroceryList: ListItem[] | null;
    setUserGroceryList: (groceryList: ListItem[]) => void;
    groupGroceryCollection: SharedShoppingItem[] | null;
    setGroupGroceryCollection: (groceryList: SharedShoppingItem[]) => void;
    favors: Favor[] | null;
    setFavors: (favor: Favor[]) => void;

    // Wrapper functions
    loadUser: (username: string) => Promise<void>;
    loadGroup: (groupID: string) => Promise<Group>;
    loadMyGroceryList: () => Promise<void>;
    loadGroupGroceryList: () => Promise<void>;
    loadFavorsForUser: () => Promise<void>;
    loadFavorsByUser: () => Promise<void>;
    createMyItem: (item: string, priority: number) => Promise<void>;
    updateMyItem: (newInfo: Partial<ListItem>) => Promise<void>;
    deleteMyItem: (id: number) => Promise<void>;
    createNewUser: (newUser: Partial<User>) => Promise<void>;
    createNewGroup: (id: string, name: string, users: string[]) => Promise<void>;
    createFavor: (itemId: number, item: string, forUser: string, amount: number) => Promise<void>;
    updateFavor: (id: number, reimbursed: boolean, amount: number) => Promise<void>;
    updateMyUser: (newInfo: Partial<User>) => Promise<void>;
}

/**
 * React Context for managing global application state including user, group, and grocery lists.
 */
export const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Provider component for AppContext.
 * Manages all application state and provides wrapper functions for API interactions.
 * @param {ReactNode} children - The child components to wrap with the provider
 */
export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [group, setGroup] = useState<Group | null>(null);
    const [myGroceryList, setUserGroceryList] = useState<ListItem[] | null>(null);
    const [groupGroceryCollection, setGroupGroceryCollection] = useState<SharedShoppingItem[] | null>(null);
    const [favors, setFavors] = useState<Favor[] | null>(null);

    /**
     * Loads a user's information from the API and sets it in context.
     * @param {string} username - The username to load
     * @returns {Promise<void>}
     * @throws {Error} Throws "USER_NOT_FOUND" or "NETWORK_ERROR"
     */
    const loadUser = async (username: string) => {
        try {
            const retrievedUser: Partial<User> = await ApiClient.getUser(username);
            const localUser: User = { ...retrievedUser, username: username };
            console.log(`SETTING USER in CONTEXT to:`, localUser);
            setUser(localUser);
            console.log("SETTING USER in CONTEXT");
        } catch (err: any) {
            throw new Error(err.status === 404 ? "USER_NOT_FOUND" : "NETWORK_ERROR");
        }
    }

    /**
     * Loads group information from the API and sets it in context.
     * @param {string} groupId - The group ID to load
     * @returns {Promise<Group>} The loaded group object
     * @throws {Error} Throws "GROUP_NOT_FOUND" or "NETWORK_ERROR"
     */
    const loadGroup = async (groupId: string) => {
        try{
            const safeGroupId = ApiClient.slugify(groupId);
            const retrievedGroup = await ApiClient.getGroup(safeGroupId);
            console.log(retrievedGroup);
            setGroup(retrievedGroup);
            return retrievedGroup
        } catch (err: any){
            throw new Error(err.status === 404 ? "GROUP_NOT_FOUND" : "NETWORK_ERROR");
        }
    }

    /**
     * Loads the current user's personal grocery list from the API.
     * @returns {Promise<void>}
     * @throws {Error} Throws "CURRENT_USER_NOT_LOGGED_IN", "LIST_NOT_FOUND", or "NETWORK_ERROR"
     */
    const loadMyGroceryList = async () => {
        // console.log("AppContext.loadMyGroceryList");
        if (!user) {
            throw new Error("CURRENT_USER_NOT_LOGGED_IN");
        }
        try {
            const myGroceryList: ListItem[] = await ApiClient.getUserGroceryList(user.username);
            // console.log(userGroceryList);
            setUserGroceryList(myGroceryList);
        } catch (err: any) {
            throw new Error(err.status === 404 ? "LIST_NOT_FOUND" : "NETWORK_ERROR");
        }
    }

    /**
     * Loads the group's shared grocery list from the API.
     * @returns {Promise<void>}
     */
    const loadGroupGroceryList = async () => {
        const groupGroceryCollection = await ApiClient.getGroupGroceryList();
        setGroupGroceryCollection(groupGroceryCollection);
    }

    /**
     * Loads favors requested for the current user from the API.
     * @returns {Promise<void>}
     */
    const loadFavorsForUser = async () => {
        if (!user?.username) return;
        const favorsForUser = await ApiClient.getFavorsForUser(user.username);
        setFavors(favorsForUser);
    }

    /**
     * Loads favors fulfilled by the current user from the API.
     * @returns {Promise<void>}
     */
    const loadFavorsByUser = async () => {
        if (!user?.username) return;
        const favorsByUser = await ApiClient.getFavorsByUser(user.username);
        setFavors(favorsByUser);
    }

    /**
     * Creates a new item in the current user's grocery list.
     * @param {string} item - The name/description of the item
     * @param {number} priority - The priority level of the item
     * @returns {Promise<void>}
     */
    const createMyItem = async (item: string, priority: number) => {
        if (!user?.username) return;
        await ApiClient.createItem(user.username, { item, priority });
        await loadMyGroceryList();
    }

    /**
     * Updates an existing item in the current user's grocery list.
     * @param {Partial<ListItem>} newInfo - Partial list item object with updated fields
     * @returns {Promise<void>}
     * @throws {Error} Throws "USER_NOT_LOGGED_IN" or "MISSING_ITEM_ID"
     */
    const updateMyItem = async (newInfo:Partial<ListItem>) => {
        if (!user?.username) throw new Error("USER_NOT_LOGGED_IN");
        if (!newInfo.id) throw new Error("MISSING_ITEM_ID");

        await ApiClient.modifyListItem(user.username, newInfo);
        await loadMyGroceryList();
    }

    /**
     * Updates the current user's information.
     * @param {Partial<User>} newInfo - Partial user object with updated fields
     * @returns {Promise<void>}
     * @throws {Error} Throws "User not loaded" if no user is currently logged in
     */
    const updateMyUser = async (newInfo: Partial<User>) => {
        if (!user?.username) {
            throw new Error("User not loaded");
        }
        const safeInfo: Partial<User> = {
            ...newInfo,
            groupId: typeof newInfo.groupId === "string"
                ? ApiClient.slugify(newInfo.groupId)
                : user.groupId,
            username: user.username,
        };
        await ApiClient.modifyUser(safeInfo);
    };

    /**
     * Creates a new user in the system.
     * @param {Partial<User>} newUser - Partial user object with user details
     * @returns {Promise<void>}
     * @throws {Error} Throws "USER_ALREADY_EXISTS" or "NETWORK_ERROR"
     */
    const createNewUser = async (newUser: Partial<User>): Promise<void> => {
        try {
            await ApiClient.createUser(newUser);
        } catch (err: any) {
            console.log(err);
            if (err.status === 409) {
                throw new Error("USER_ALREADY_EXISTS");// throw new Error("USER_ALREADY_EXISTS");
            }
            throw new Error("NETWORK_ERROR");
            // throw new Error("UNABLE_TO_CREATE_USER");
        }
    };

    /**
     * Creates a new group in the system.
     * @param {string} id - The group ID
     * @param {string} name - The name of the group
     * @param {string[]} users - Array of usernames to add to the group
     * @returns {Promise<void>}
     * @throws {Error} Throws "GROUP_ALREADY_EXISTS" or "NETWORK_ERROR"
     */
    const createNewGroup = async (id: string, name: string, users: string[]) => {
        const safeId = ApiClient.slugify(id);
        try {
            await ApiClient.createGroup(safeId, name, users);
            if (id === group?.id) {
                await loadGroup(safeId);
            }
        } catch (err: any) {
            console.log(err);
            if (err.status === 409) {
                throw new Error("GROUP_ALREADY_EXISTS");
            }
            throw new Error("NETWORK_ERROR");
        }
    }

    /**
     * Creates a new favor by recording a purchase for another user.
     * @param {number} itemId - The ID of the list item being fulfilled
     * @param {string} item - The name/description of the item
     * @param {string} forUser - Username of the user receiving the favor
     * @param {number} amount - The cost amount of the favor
     * @returns {Promise<void>}
     */
    const createFavor = async (itemId: number, item: string, forUser: string, amount: number) => {
        if (!user?.username) return;
        await ApiClient.fulfillFavor(itemId, item, user.username, forUser, amount);
        await loadFavorsByUser();
    }

    /**
     * Updates an existing favor record.
     * @param {number} id - The unique identifier of the favor
     * @param {boolean} reimbursed - Whether the favor has been reimbursed
     * @param {number} amount - The updated amount for the favor
     * @returns {Promise<void>}
     */
    const updateFavor = async (id: number, reimbursed: boolean, amount: number) => {
        await ApiClient.modifyFavor(id, reimbursed, amount);
        await loadFavorsForUser();
    }

    /**
     * Deletes an item from the current user's grocery list.
     * @param {number} id - The unique identifier of the list item to delete
     * @returns {Promise<void>}
     * @throws {Error} Throws "USER_NOT_LOGGED_IN", "ITEM_NOT_FOUND", or "NETWORK_ERROR"
     */
    const deleteMyItem = async (id: number) => {
        if (!user?.username) throw new Error("USER_NOT_LOGGED_IN");
        console.log("ID OF ITEM CALLED FOR DEL: ",id, "ON USER", user.username);
        try {
            await ApiClient.deleteItem(user.username, id);
            await loadMyGroceryList();
        } catch (err: any) {
            console.log(err);
            if (err.status === 404) {
                console.log(err);
                throw new Error("ITEM_NOT_FOUND");
            }
            throw new Error("NETWORK_ERROR");
        }
    }

    const value: AppContextType = {
        user,
        setUser,
        group,
        setGroup,
        myGroceryList,
        setUserGroceryList,
        groupGroceryCollection,
        setGroupGroceryCollection,
        favors,
        setFavors,
        loadUser,
        loadGroup,
        loadMyGroceryList,
        loadGroupGroceryList,
        loadFavorsForUser,
        loadFavorsByUser,
        createMyItem,
        updateMyItem,
        deleteMyItem,
        createNewUser,
        createNewGroup,
        createFavor,
        updateFavor,
        updateMyUser
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/**
 * Custom hook to access the AppContext.
 * Must be used within an AppProvider.
 * @returns {AppContextType} The current app context value
 * @throws {Error} Throws error if used outside of AppProvider
 */
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}
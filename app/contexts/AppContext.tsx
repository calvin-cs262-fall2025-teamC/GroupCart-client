
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Favor } from "../models/Favor";
import { Group } from '../models/Group';
import { ListItem } from '../models/ListItem';
import { SharedShoppingItem } from "../models/SharedShoppingItem";
import { User } from '../models/User';
import { ApiClient } from "../services/ApiClient";

interface AppContextType {

    user: User | null;
    setUser: (user: User) => void;
    group: Group | null;
    setGroup: (group: Group) => void;
    userGroceryList: ListItem[] | null;
    setUserGroceryList: (groceryList: ListItem[]) => void;
    groupGroceryCollection: SharedShoppingItem[] | null;
    setGroupGroceryCollection: (groceryList: SharedShoppingItem[]) => void;
    favors: Favor[] | null;
    setFavors: (favor: Favor[]) => void;

    // Wrapper functions
    loadUser: (username: string) => Promise<void>;
    loadGroup: (groupID: string) => Promise<Group>;
    loadUserGroceryList: () => Promise<void>;
    loadGroupGroceryList: () => Promise<void>;
    loadFavorsForUser: () => Promise<void>;
    loadFavorsByUser: () => Promise<void>;
    createMyItem: (item: string, priority: number) => Promise<void>;
    updateMyItem: (id: number, item: string, priority: number) => Promise<void>;
    createNewUser: (username: string) => Promise<void>;
    createNewGroup: (id: string, name: string, users: string[]) => Promise<void>;
    createFavor: (itemId: number, item: string, forUser: string, amount: number) => Promise<void>;
    updateFavor: (id: number, reimbursed: boolean, amount: number) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [group, setGroup] = useState<Group | null>(null);
    const [userGroceryList, setUserGroceryList] = useState<ListItem[] | null>(null);
    const [groupGroceryCollection, setGroupGroceryCollection] = useState<SharedShoppingItem[] | null>(null);
    const [favors, setFavors] = useState<Favor[] | null>(null);

    // Use this for client component handlind:      return { status: "found", user };
    const loadUser = async (username: string) => {
        // setUser({ username: "alice", firstName: "Unknown", lastName: "Unknown", groupId: "none" });
        try {
            const retrievedUser = await ApiClient.getUser(username);
            setUser(retrievedUser);
        } catch (err: any) {
            throw new Error("Issue Loading User");
        }
    }

    const loadGroup = async () => {
        const retrievedGroup = await ApiClient.getGroup("dev-team");
        console.log(retrievedGroup);
        setGroup(retrievedGroup);
        return retrievedGroup
    }

    const loadUserGroceryList = async () => {
        const userGroceryList = await ApiClient.getUserGroceryList("abyle");
        console.log(userGroceryList);
        setUserGroceryList(userGroceryList);
    }

    const loadGroupGroceryList = async () => {
        const groupGroceryCollection = await ApiClient.getGroupGroceryList();
        setGroupGroceryCollection(groupGroceryCollection);
    }

    const loadFavorsForUser = async () => {
        if (!user?.username) return;
        const favorsForUser = await ApiClient.getFavorsForUser(user.username);
        setFavors(favorsForUser);
    }

    const loadFavorsByUser = async () => {
        if (!user?.username) return;
        const favorsByUser = await ApiClient.getFavorsByUser(user.username);
        setFavors(favorsByUser);
    }

    const createMyItem = async (item: string, priority: number) => {
        if (!user?.username) return;
        await ApiClient.createItem(user.username, { item, priority });
        await loadUserGroceryList();
    }

    const updateMyItem = async (id: number, item: string, priority: number) => {
        if (!user?.username) return;
        await ApiClient.modifyListItem(user.username, id, item, priority);
        await loadUserGroceryList();
    }

    const createNewUser = async (username: string): Promise<void> => {
        try {
            await ApiClient.createUser(username);
        } catch (err: any) {
            console.log(err);
            if (err.status === 409) {
                throw new Error("USER_ALREADY_EXISTS");// throw new Error("USER_ALREADY_EXISTS");
            }
            throw new Error("NETWORK_ERROR");
            // throw new Error("UNABLE_TO_CREATE_USER");
        }
    };




    const createNewGroup = async (id: string, name: string, users: string[]) => {
        await ApiClient.createGroup(id, name, users);
        if (id === group?.id) {
            await loadGroup();
        }
    }

    const createFavor = async (itemId: number, item: string, forUser: string, amount: number) => {
        if (!user?.username) return;
        await ApiClient.fulfillFavor(itemId, item, user.username, forUser, amount);
        await loadFavorsByUser();
    }

    const updateFavor = async (id: number, reimbursed: boolean, amount: number) => {
        await ApiClient.modifyFavor(id, reimbursed, amount);
        await loadFavorsForUser();
    }

    useEffect(() => {
        loadGroup();
        loadUserGroceryList();
        loadGroupGroceryList();
    }, []);

    const value: AppContextType = {
        user,
        setUser,
        group,
        setGroup,
        userGroceryList,
        setUserGroceryList,
        groupGroceryCollection,
        setGroupGroceryCollection,
        favors,
        setFavors,
        loadUser,
        loadGroup,
        loadUserGroceryList,
        loadGroupGroceryList,
        loadFavorsForUser,
        loadFavorsByUser,
        createMyItem,
        updateMyItem,
        createNewUser,
        createNewGroup,
        createFavor,
        updateFavor
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}
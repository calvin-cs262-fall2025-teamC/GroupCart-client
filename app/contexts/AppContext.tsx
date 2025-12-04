
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

    const loadUser = async () => {
        // setUser({ username: "alice", firstName: "Unknown", lastName: "Unknown", groupId: "none" });
        const retrievedUser = await ApiClient.getUser("abyle");
        setUser(retrievedUser);
    }

    const loadGroup = async () => {
        const retrievedGroup = await ApiClient.getGroup("dev-team");
        console.log(retrievedGroup);
        setGroup(retrievedGroup);
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

    useEffect(() => {
        loadUser();
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
        setFavors
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
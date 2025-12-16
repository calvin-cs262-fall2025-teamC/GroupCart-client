import { Favor } from '../models/Favor';
import { Group } from '../models/Group';
import { ListItem } from '../models/ListItem';
import { SharedShoppingItem } from '../models/SharedShoppingItem';
import { User } from '../models/User';

export class ApiClient {
  private static BASE_URL: string = `https://groupcart-ggadhpaze4axhxhf.mexicocentral-01.azurewebsites.net/api`;

  // Send a request to the service, meant to be used by the other methods
  // NOT meant to be used directly within other components. (use methods marked "public" for components)
  private static async request(path: string, method: string = "GET", body?: any) {
    const response = await fetch(`${this.BASE_URL}/${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) throw new Error(`Error ${response.status}`);

    return await response.json();
  }

  // Get group by group id
  public static async getGroup(id: string): Promise<Group> {
    return this.request(`group/${id}`, "GET");
  }

  // Get user info by username
  public static async getUser(username: string): Promise<User> {
    return this.request(`user/${username}`, "GET");
  }

  // Get user list by username
  public static async getUserGroceryList(username: string): Promise<ListItem[]> {
    return this.request(`list/${username}`, "GET");
  }

  // Get favors fulfilled by a user
  public static async getFavorsByUser(username: string): Promise<Favor[]> {
    return this.request(`favors/by/${username}`, "GET");
  }

  public static async getFavorsForUser(username: string): Promise<Favor[]> {
    return this.request(`favors/for/${username}`, "GET");
  }

  public static async getGroupGroceryList(): Promise<SharedShoppingItem[]> {
    return this.request(`shop`, "GET");
  }
  

  public static async createUser(username: string): Promise<void>{
    const data = {firstName : "deffirstname", lastName : "deflastname"};
    return this.request(`user/${username}`, "POST", data);
  }

  public static async createGroup(id: string, name: string, users: string[]): Promise<void>{
    const data = {name: name, users: users};
    return this.request(`group/${id}`, "POST", data);
  }

  public static async fulfillFavor(itemId: number, item: string, by: string, forUser: string, amount: number): Promise<void>{
    const data = {itemId: itemId, item: item, by: by, for: forUser, amount: amount};
    return this.request(`favor`, "POST", data);
  }

  public static async modifyListItem(username: string, id: number, item: string, priority: number): Promise<void>{
    const data = {item: item, priority: priority};
    return this.request(`list/${username}/${id}`, "PUT", data);
  }

  public static async modifyFavor(id: number, reimbursed: boolean, amount: number): Promise<void>{
    const data = {reimbursed: reimbursed, amount: amount};
    return this.request(`favor/${id}`, "PUT", data);
  }

  // Add item to List
  public static async createItem(
    username: string,
    data: { item: string; priority: number }
  ): Promise<void> {
    return this.request(`list/${username}`, "POST", data);
  }
}
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

    // // Handle 404 gracefully
    // if (response.status === 404) return null;

    // Throw for other non-success responses
    if (!response.ok) {
      const text = await response.text();
      const error = new Error(`HTTP ${response.status}: ${text}`);
      (error as any).status = response.status;
      throw error;
    }

    // Parse and return JSON
    return response.json();
  }

  // Provide this to users of ApiClient to make URL friendly values, like when creating a userID or a
  public static slugify(input: string): string {
    return input
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // remove special characters
      .replace(/\s+/g, '-')      // replace whitespace with dashes
      .replace(/-+/g, '-');      // collapse multiple dashes
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

  public static async createUser(newUser: Partial<User>): Promise<{ message: string, username: string, firstName: string, lastName: string }> {
    const data = { firstName: "deffirstname", lastName: "deflastname" };
    return this.request(`user/${newUser.username}`, "POST", data);
  }

  public static async createGroup(id: string, name: string, users: string[]): Promise<void> {
    const data = { name: name, users: users };
    return this.request(`group/${id}`, "POST", data);
  }

  public static async fulfillFavor(itemId: number, item: string, by: string, forUser: string, amount: number): Promise<void> {
    const data = { itemId: itemId, item: item, by: by, for: forUser, amount: amount };
    return this.request(`favor`, "POST", data);
  }

  public static async modifyListItem(username: string, newInfo: Partial<ListItem>): Promise<void> {
    const data = { item: newInfo.item, priority: newInfo.priority };
    return this.request(`list/${username}/${newInfo.id}`, "PUT", data);
  }

  public static async modifyFavor(id: number, reimbursed: boolean, amount: number): Promise<void> {
    const data = { reimbursed: reimbursed, amount: amount };
    return this.request(`favor/${id}`, "PUT", data);
  }

  public static async modifyUser(newInfo: Partial<User>): Promise<void> {
    const data = newInfo;
    console.log("apiclient:", newInfo);
    return this.request(`user/${newInfo.username}`, "PUT", data);
  }

  public static async createItem(
    username: string,
    data: { item: string; priority: number }
  ): Promise<void> {
    return this.request(`list/${username}`, "POST", data);
  }

  public static async deleteItem(username: string, id: number): Promise<void> {
    console.log("ApiClient.deleteItem");
    console.log("id: ", id);
    return this.request(`list/${username}/${id}`, "DELETE");
  }

}
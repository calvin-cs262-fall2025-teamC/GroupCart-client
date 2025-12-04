import { Favor } from '../models/Favor';
import { Group } from '../models/Group';
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

  // Get favors fulfilled by a user
  public static async getFavorsByUser(username: string): Promise<Favor[]> {
    return this.request(`favors/by/${username}`, "GET");
  }

  public static async getFavorsForUser(username: string): Promise<Favor[]> {
    return this.request(`favors/for/${username}`, "GET");
  }

  // Add item to List
  public static async addItemToUserList(
    username: string,
    data: { item: string; priority: number }
  ): Promise<any> {
    return this.request(`list/${username}`, "POST", data);
  }
}
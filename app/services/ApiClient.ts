import { Favor } from '../models/Favor';
import { Group } from '../models/Group';
import { ListItem } from '../models/ListItem';
import { SharedShoppingItem } from '../models/SharedShoppingItem';
import { User } from '../models/User';

/**
 * API client for communicating with the GroupCart backend service.
 * Provides methods for managing users, groups, grocery lists, and favors.
 */
export class ApiClient {
  private static BASE_URL: string = `https://groupcart-ggadhpaze4axhxhf.mexicocentral-01.azurewebsites.net/api`;

  /**
   * Send a request to the service, meant to be used by the other methods.
   * NOT meant to be used directly within other components. (use methods marked "public" for components)
   * @private
   * @param {string} path - The API endpoint path
   * @param {string} [method="GET"] - The HTTP method (GET, POST, PUT, DELETE)
   * @param {any} [body] - Optional request body to be JSON stringified
   * @returns {Promise<any>} The JSON response from the API
   * @throws {Error} Throws an error with HTTP status and response text for non-success responses
   */
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

  /**
   * Converts a string into a URL-friendly slug format.
   * Useful for creating user IDs or other URL parameters.
   * @param {string} input - The string to slugify
   * @returns {string} The slugified string (lowercase, with special chars removed and spaces replaced with dashes)
   */
  public static slugify(input: string): string {
    return input
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // remove special characters
      .replace(/\s+/g, '-')      // replace whitespace with dashes
      .replace(/-+/g, '-');      // collapse multiple dashes
  }

  /**
   * Retrieves group information by group ID.
   * @param {string} id - The unique identifier of the group
   * @returns {Promise<Group>} The group object
   */
  public static async getGroup(id: string): Promise<Group> {
    return this.request(`group/${id}`, "GET");
  }

  /**
   * Retrieves user information by username.
   * @param {string} username - The username of the user
   * @returns {Promise<User>} The user object
   */
  public static async getUser(username: string): Promise<User> {
    return this.request(`user/${username}`, "GET");
  }

  /**
   * Retrieves a user's personal grocery list.
   * @param {string} username - The username of the user
   * @returns {Promise<ListItem[]>} Array of list items for the user
   */
  public static async getUserGroceryList(username: string): Promise<ListItem[]> {
    return this.request(`list/${username}`, "GET");
  }

  /**
   * Retrieves favors fulfilled by a specific user.
   * @param {string} username - The username of the user who fulfilled the favors
   * @returns {Promise<Favor[]>} Array of favors fulfilled by the user
   */
  public static async getFavorsByUser(username: string): Promise<Favor[]> {
    return this.request(`favors/by/${username}`, "GET");
  }

  /**
   * Retrieves favors requested for a specific user.
   * @param {string} username - The username of the user who requested the favors
   * @returns {Promise<Favor[]>} Array of favors requested for the user
   */
  public static async getFavorsForUser(username: string): Promise<Favor[]> {
    return this.request(`favors/for/${username}`, "GET");
  }

  /**
   * Retrieves the shared group grocery list.
   * @returns {Promise<SharedShoppingItem[]>} Array of shared shopping items for the group
   */
  public static async getGroupGroceryList(): Promise<SharedShoppingItem[]> {
    return this.request(`shop`, "GET");
  }

  /**
   * Creates a new user in the system.
   * @param {Partial<User>} newUser - Partial user object containing user details
   * @returns {Promise<{message: string, username: string, firstName: string, lastName: string}>} Response containing success message and user details
   */
  public static async createUser(newUser: Partial<User>): Promise<{ message: string, username: string, firstName: string, lastName: string }> {
    return this.request(`user/${newUser.username}`, "POST", newUser);
  }

  /**
   * Creates a new group in the system.
   * @param {string} id - The unique identifier for the group
   * @param {string} name - The name of the group
   * @param {string[]} users - Array of usernames to add to the group
   * @returns {Promise<void>}
   */
  public static async createGroup(id: string, name: string, users: string[]): Promise<void> {
    const data = { name: name, users: users };
    return this.request(`group/${id}`, "POST", data);
  }

  /**
   * Fulfills a favor by recording the purchase of an item for another user.
   * @param {number} itemId - The ID of the list item being fulfilled
   * @param {string} item - The name/description of the item
   * @param {string} by - Username of the user fulfilling the favor
   * @param {string} forUser - Username of the user receiving the favor
   * @param {number} amount - The cost amount of the favor
   * @returns {Promise<void>}
   */
  public static async fulfillFavor(itemId: number, item: string, by: string, forUser: string, amount: number): Promise<void> {
    const data = { itemId: itemId, item: item, by: by, for: forUser, amount: amount };
    return this.request(`favor`, "POST", data);
  }

  /**
   * Modifies an existing list item for a user.
   * @param {string} username - The username of the user whose list item to modify
   * @param {Partial<ListItem>} newInfo - Partial list item object containing updated fields
   * @returns {Promise<void>}
   */
  public static async modifyListItem(username: string, newInfo: Partial<ListItem>): Promise<void> {
    const data = { item: newInfo.item, priority: newInfo.priority };
    return this.request(`list/${username}/${newInfo.id}`, "PUT", data);
  }

  /**
   * Modifies an existing favor record.
   * @param {number} id - The unique identifier of the favor
   * @param {boolean} reimbursed - Whether the favor has been reimbursed
   * @param {number} amount - The updated amount for the favor
   * @returns {Promise<void>}
   */
  public static async modifyFavor(id: number, reimbursed: boolean, amount: number): Promise<void> {
    const data = { reimbursed: reimbursed, amount: amount };
    return this.request(`favor/${id}`, "PUT", data);
  }

  /**
   * Modifies an existing user's information.
   * @param {Partial<User>} newInfo - Partial user object containing updated fields
   * @returns {Promise<void>}
   */
  public static async modifyUser(newInfo: Partial<User>): Promise<void> {
    const data = newInfo;
    console.log("apiclient:", newInfo);
    return this.request(`user/${newInfo.username}`, "PUT", data);
  }

  /**
   * Creates a new grocery list item for a user.
   * @param {string} username - The username of the user
   * @param {{item: string, priority: number}} data - Object containing item name and priority level
   * @returns {Promise<void>}
   */
  public static async createItem(
    username: string,
    data: { item: string; priority: number }
  ): Promise<void> {
    return this.request(`list/${username}`, "POST", data);
  }

  /**
   * Deletes a grocery list item for a user.
   * @param {string} username - The username of the user
   * @param {number} id - The unique identifier of the list item to delete
   * @returns {Promise<void>}
   */
  public static async deleteItem(username: string, id: number): Promise<void> {
    console.log("ApiClient.deleteItem");
    console.log("id: ", id);
    return this.request(`list/${username}/${id}`, "DELETE");
  }
}
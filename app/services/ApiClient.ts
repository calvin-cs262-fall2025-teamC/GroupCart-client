export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://your-api.com') {
    this.baseUrl = baseUrl;
  }

  private async request(path: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  }

  // Example endpoints
  static async getUsers(): Promise<string[]> {
    // return this.request('/users');
    return ['good', 'job'];
  }

  async getUser(id: string) {
    return this.request(`/users/${id}`);
  }

  async createUser(data: any) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

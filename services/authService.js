import User from '../models/User.js';

class AuthService {
  #currentUser = null;

  get currentUser() {
    return this.#currentUser;
  }
  
  async signUp(credentials) {
    const response = await fetch("http://martha.jh.shawinigan.info/queries/insert-user/execute", {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'auth': 'Z2FicmllbDpwVTUwMEVzTmY2KjNxdg==',
        'Content-Type': 'application/json'
      }
    }).then(r => r.json());

    if (response.success) {
      this.#currentUser = new User({ id: response.lastInsertId, username: credentials.username });
    }

    return !!this.#currentUser;
  }

  async logIn(credentials) {
    const response = await fetch("http://martha.jh.shawinigan.info/queries/select-user-auth/execute", {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'auth': 'Z2FicmllbDpwVTUwMEVzTmY2KjNxdg==',
        'Content-Type': 'application/json'
      }
    }).then(r => r.json());

    if (response.success && response.data.length === 1) {
      const user = response.data[0];
      this.#currentUser = new User({ id: user.id, username: user.username });
    } else {
      this.#currentUser = null;
    }

    return !!this.#currentUser;
  }

  logOut() {
    this.#currentUser = null;
  }
}

const service = new AuthService();
export default service;

import config from "./config";

export default class Data {
  api(path, method = "GET", body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // check if auth is required
    if (requiresAuth) {
      // creates a base-64 encoded ASCII string from a string of data
      // interpolates the username and password values of the credentials object to produce an encoded string
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api("/users", "GET", null, true, { username, password });

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api("/users", "POST", user);

    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api("/courses", "GET", null);

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 500) {
      //TODO Need to create Error component
      return this.props.history.push("/error");
    } else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET", null);

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 500) {
      //TODO Need to create Error component
      return this.props.history.push("/error");
    } else {
      throw new Error();
    }
  }

  async deleteCourse(id, username, password) {
    console.log(id, username, password)
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, { username, password });

    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    } else if (response.status === 500) {
      return this.props.history.push("/error");
    } else {
      throw new Error();
    }
  }
}

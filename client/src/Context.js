import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    // uses destructuring to extract authenticatedUser
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      // add the actions property and object
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);

    // update authenticatedUser state if user is not null, otherwise it remains null
    if (user !== null) {
      user.password = password;
      
      this.setState( () => {
        return {
          authenticatedUser: user,
        }
      });

      // takes cooke name, cookie value, in this case the stringified user object, and expires option as parameters
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }

    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}


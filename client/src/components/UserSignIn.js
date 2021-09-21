import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignIn extends Component {
  state = {
    username: "",
    password: "",
    errors: [],
  }

  render() {
    const {
      username,
      password,
      errors,
    } = this.state;

    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <label>
                  Email Address
                  <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                </label>
                <label>
                  Password
                  <input 
                    id="password" 
                    name="password"
                    type="password"
                    value={password} 
                    onChange={this.change} 
                    placeholder="Password" />
                </label>               
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
          </p>
        </div>
      </main>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    // uses destructuring to extract the context prop
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    // unpacks properties from the state object
    const { username, password } = this.state;

    context.actions.signIn(username, password)
      // takes the fulfillment value as a parameter
      .then( user => {
        if (user === null) {
          this.setState( () => {
            return { errors: [ "Sign-in was unsuccessful" ] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push("/error");
      })
  }

  cancel = () => {
    this.props.history.push("/");
  }
}

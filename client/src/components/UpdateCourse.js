import React, { Component } from "react";
import Form from "./Form";

export default class Courses extends Component {
  state = {
    id: "",
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
    user: []
  }

  componentDidMount() {
    const { context } = this.props;
    const id = this.props.match.params.id;
    
    context.data.getCourse(id)
      .then(data => {
        if (data) {
          if (data.userId === +context.authenticatedUser.id) {
            this.setState({
              id: data.id,
              title: data.title,
              description: data.description,
              estimatedTime: data.estimatedTime,
              materialsNeeded: data.materialsNeeded
            })
            this.setState({ user: data.User });
          } else {
            this.props.history.push("/forbidden");
          }
        } else {
          this.props.history.push("/notfound");
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error");
      })
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      user
    } = this.state;

    return (
      <div className="wrap">
        <h2>Update Course</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.change} />

                  <p>By {user.firstName} {user.lastName}</p>

                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={this.change}>
                  </textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={this.change} />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    value={materialsNeeded}
                    onChange={this.change}>

                  </textarea>
                </div>
              </div>
            </React.Fragment>
        )}
        />
      </div>
    )
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
    const { context } = this.props;
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;
    const course = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    context.data.updateCourse(course, emailAddress, password)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push(`/courses/${this.state.id}`)
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push("/error");
      });
  }

  cancel = () => {
    this.props.history.push(`/courses/${this.state.id}`);
  }
}
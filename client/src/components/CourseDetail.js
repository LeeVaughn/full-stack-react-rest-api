import React, { Component} from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Courses from "./Courses";

export default class CourseDetail extends Component {
  state = {
    course: [],
    user: []
  }

  componentDidMount() {
    const { context } = this.props;
    const id = this.props.match.params.id;

    context.data.getCourse(id)
      .then(data => {
        if (data) {
          this.setState({ course: data });
          this.setState({ user: data.User });
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
    const { course, user } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <React.Fragment>
        <div className="actions--bar">
          <div className="wrap">
            {/* https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator */}
            {authUser && +authUser.id === user.id &&
              <React.Fragment>
                <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                <Link className="button" to="#" onClick={this.delete}>Delete Course</Link>
              </React.Fragment>
            }
            <Link className="button button-secondary" to="/">Return to List</Link>
          </div>
        </div>
              
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>By {user.firstName} {user.lastName}</p>
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }

  delete = () => {
    const { context } = this.props;
    const user = context.authenticatedUser;

    context.data.deleteCourse(this.state.course.id, user.emailAddress, user.password)
      .then( data => {
        this.props.history.push("/");
      })
  }
}
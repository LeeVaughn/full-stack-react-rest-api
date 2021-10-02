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
    console.log(id)

    context.data.getCourse(id)
      .then(data => {
        this.setState({ course: data });
        this.setState({ user: data.User });
      })
      .catch(err => {
        console.log(err);
        this.props.history.push(from);
      })
  }

  render() {
    const { course, user } = this.state;

    return (
      <React.Fragment>
        <div className="actions--bar">
          <div className="wrap">
            <a className="button" href={`/courses/${course.id}/update`}>Update Course</a>
            <a className="button" href="#">Delete Course</a>
            <a className="button button-secondary" href="/">Return to List</a>
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
}
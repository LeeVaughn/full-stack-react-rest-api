import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Courses extends Component {
  render() {
    return (
      <main>
        <div className="wrap main--grid">
          <Link className="course--module course--link" to="/notfound">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">Build a Basic Bookcase</h3>
          </Link>
          <Link className="course--module course--link" to="/notfound">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">Learn How to Program</h3>
          </Link>
          <Link className="course--module course--add--module" to="/courses/create">
            <span className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
              New Course
            </span>
          </Link>
        </div>
      </main>
    );
  }
}

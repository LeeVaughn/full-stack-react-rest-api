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
        </div>
      </main>
    );
  }
}

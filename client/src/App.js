import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import Error from "./components/Error";
import NotFound from "./components/NotFound";


import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
  <Router>
    <HeaderWithContext />

    <Switch>
      <Route exact path="/" component={CoursesWithContext} />
      <Route exact path="/courses/:id/update" component={UpdateCourseWithContext} />
      <Route exact path="/courses/:id" component={CourseDetailWithContext} />
      <Route path="/signin" component={UserSignInWithContext} />
      <Route path="/signup" component={UserSignUpWithContext} />
      <Route path="/signout" component={UserSignOutWithContext} />
      <Route path="/error" component={Error} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

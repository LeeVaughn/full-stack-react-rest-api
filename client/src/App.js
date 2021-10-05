import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import UnhandledError from "./components/UnhandledError";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";


import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContent = withContext(CreateCourse);
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
      <Route exact path="/courses/create" component={CreateCourseWithContent} />
      <Route exact path="/courses/:id/update" component={UpdateCourseWithContext} />
      <Route exact path="/courses/:id" component={CourseDetailWithContext} />
      <Route path="/signin" component={UserSignInWithContext} />
      <Route path="/signup" component={UserSignUpWithContext} />
      <Route path="/signout" component={UserSignOutWithContext} />
      <Route path="/error" component={UnhandledError} />
      <Route path="/forbidden" component={Forbidden} />
      <Route path="/notfound" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

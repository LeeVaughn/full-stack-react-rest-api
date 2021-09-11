import React from 'react';
// extracts the context property from props
export default ({ context }) => {
  const authUser = context.authenticatedUser;

  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{ authUser.firstName } authenticated!</h1>
      <p>Your username is { authUser.emailAddress }</p>
    </div>
  </div>
  );
}
import React from 'react';
import { Redirect } from 'react-router-dom';

// extracts the context property from props
export default ({ context }) => {
  // calls the signOut action
  context.actions.signOut();

  return (
    <Redirect to="/" />
  );
}

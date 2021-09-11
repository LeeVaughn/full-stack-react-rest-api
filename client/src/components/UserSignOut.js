import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// extracts the context property from props
export default ({ context }) => {
  // component calls signOut and updates state after render
  useEffect(() =>  context.actions.signOut());

  return (
    <Redirect to="/" />
  );
}

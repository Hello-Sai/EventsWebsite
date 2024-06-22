// Routes.js
import React from 'react';
import { Route } from 'react-router-dom';
import AddEvent from './AddEvent';

const Routes = () => {
  return (
    <>
      <Route path="/createEvent"  component={AddEvent} />
    </>
  );
};

export default Routes;

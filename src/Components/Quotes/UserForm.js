import React, { useState } from 'react';
import { FormUserDetails } from './FormUserDetails';
import { FormPersonalDetails } from './FormPersonalDetails';
import { Success } from './Success';
export const UserForm = () => {
  switch (step) {
    case 1:
      return (
        <FormUserDetails
        />
      );
    case 2:
      return (
        <FormPersonalDetails
        />
      );
    default:
      return <Success />;
  }
};

import { createContext, useState } from 'react';

export const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    phoneNumber: '',
  });

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};

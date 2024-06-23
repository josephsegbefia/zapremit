import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transferData, setTransferData] = useState({
    transferAmount: '',
    receivableAmount: '',
    transferFee: '',
    totalToPay: '',
    recipientPhone: '',
    recipientFirstName: '',
    recipientMiddleName: '',
    recipientLastName: '',
    recipientId: '',
    deliveryMethod: '',
    reason: '',
    initiationDateTime: '',
    transferInitiated: false,
    inProgress: false,
    status: '',

    identifier: '', // for page or screen identification
  });

  const [rate, setRate] = useState(16.12);

  const [userIsVerified, setUserIsVerified] = useState(false); // This will later come from the backend on the user object.
  // Will be true if the user has provided his address information and ID document has been checked.
  // It will be a isVerified attribute on the user object

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        transferData,
        setTransferData,
        rate,
        setRate,
        userIsVerified,
        setUserIsVerified,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
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
    destinationCountry: '',
    destinationCountryCode: '',
    transferCurrency: '',
    transferCurrencyCode: '',
    offeredExchangeRate: '',
    actualExchangeRate: '',
    transferProfit: '',
    identifier: '',
  });
  const [profitMargin, setProfitMargin] = useState(1);
  const [rates, setRates] = useState({
    actualExchangeRate: '',
    offeredExchangeRate: '',
  });
  const [userIsVerified, setUserIsVerified] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await getCurrentUser();
      if (res) {
        setIsLoggedIn(true);
        setUser(res);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const refetchUser = () => fetchCurrentUser();

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    isLoading,
    transferData,
    setTransferData,
    rates,
    setRates,
    userIsVerified,
    setUserIsVerified,
    profitMargin,
    refreshUser: refetchUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;

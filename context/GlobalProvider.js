import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    transferFee: 0.99,
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

  const [country, setCountry] = useState({
    name: '',
    countryCode: '',
    currencyCode: '',
    currencyName: '',
    currencySymbol: '',
    flag: '',
  });

  const [profitMargin, setProfitMargin] = useState(1);
  const [rates, setRates] = useState({
    actualExchangeRate: 16.9,
    offeredExchangeRate: 16.6,
  });
  const [userIsVerified, setUserIsVerified] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res) {
        setIsLoggedIn(true);
        setUser(res);
        await AsyncStorage.setItem('accountId', res.$id);
        const storedAccountId = await AsyncStorage.getItem('accountId');
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

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
    country,
    setCountry,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;

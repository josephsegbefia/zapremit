import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser, adminProfitInfo } from '../lib/appwrite';
import useAppwrite from '../lib/useAppwrite';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // This will also serve as the user data loading state
  const [profitMargin, setProfitMargin] = useState(0);
  const [transferFee, setTransferFee] = useState(0);
  const [transferData, setTransferData] = useState({
    transferAmount: '',
    receivableAmount: '',
    transferFee: '',
    totalToPay: 0,
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
    callingCode: '',
  });

  const [rates, setRates] = useState({
    actualExchangeRate: null,
    offeredExchangeRate: null,
    unitProfit: null,
  });
  const [userIsVerified, setUserIsVerified] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res) {
        setIsLoggedIn(true);
        setUser(res);
        await AsyncStorage.setItem('accountId', res.$id);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching user data
    }
  };

  const setProfitInfo = async () => {
    try {
      const response = await adminProfitInfo();
      setProfitMargin(response.profitMargin);
      setTransferFee(response.transferFee);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    setProfitInfo();
  }, []);

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
    transferFee,
    country,
    setCountry,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;

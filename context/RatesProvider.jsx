import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite';
import useFetchRate from '../lib/fetchRate';
import { getRate } from '../lib/appwrite';
import { useGlobalContext } from './GlobalProvider';

const RatesContext = createContext();
const { user } = useGlobalContext();
export const useRatesContext = () => useContext(RatesContext);

const RatesProvider = ({ children }) => {
  const [isgettingRate, setIsGettingRate] = useState(false);
  const [userbaseCurrencyCode, setUserBaseCurrencyCode] = useState('');
  const [usertargetCurrencyCode, setUserTargetCurrencyCode] = useState('');

  const fetchRates = () => {};
};

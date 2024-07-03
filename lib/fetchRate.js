import { View, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getRate } from './appwrite';

const useFetchRate = (baseCurrency, targetCurrency, amount) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRate = async () => {
    setIsLoading(true);
    try {
      const rateData = await getRate(baseCurrency, targetCurrency, amount);
      setData(rateData);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, []);
};

export default useFetchRate;

import { View, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getRate } from './appwrite';

const useFetchRate = (fn) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRate = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, []);

  return { data, isLoading };
};

export default useFetchRate;

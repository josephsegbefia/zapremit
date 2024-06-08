import { View, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthData = async () => {
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
    fecthData();
  }, []);

  const refetch = () => fecthData();
  return { data, isLoading, refetch };
};

export default useAppwrite;

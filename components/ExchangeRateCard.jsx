import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { getRate } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateOfferedRateAndUnitProfit } from '../lib/profitCalculator';
import LoadingOverlay from './LoadingOverlay';

const ExchangeRateCard = ({ title, hostCountryFlag, recipientCountryFlag }) => {
  const { user, isLoading, setRates, profitMargin, rates } = useGlobalContext();
  const [isRateLoading, setIsRateLoading] = useState(true);

  const RATE_FETCH_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

  const fetchRate = async () => {
    if (!user || !user.currencyCode || !user.destinationCountryCurrencyCode) {
      return;
    }

    const rateKey = `${user.currencyCode}_${user.destinationCountryCurrencyCode}`;
    const lastFetchKey = `lastFetch_${rateKey}`;

    try {
      const lastFetchTime = await AsyncStorage.getItem(lastFetchKey);
      const now = Date.now();

      if (
        lastFetchTime &&
        now - parseInt(lastFetchTime) < RATE_FETCH_INTERVAL
      ) {
        const storedRate = await AsyncStorage.getItem(rateKey);
        if (storedRate) {
          const parsedStoredRate = JSON.parse(storedRate);
          setRates((prev) => ({
            ...prev,
            actualExchangeRate: parsedStoredRate.actualRate,
            offeredExchangeRate: parsedStoredRate.offeredRate,
            unitProfit: parsedStoredRate.unitProfit,
          }));
          setIsRateLoading(false);
          return;
        }
      }

      const rateData = await getRate(
        user.currencyCode,
        user.destinationCountryCurrencyCode,
        1
      );
      const parsedRate = JSON.parse(rateData);
      const actualRate = parsedRate?.rate;
      const { offeredRate, unitProfit } = calculateOfferedRateAndUnitProfit(
        actualRate,
        profitMargin
      );

      await AsyncStorage.setItem(
        rateKey,
        JSON.stringify({ actualRate, offeredRate, unitProfit })
      );
      await AsyncStorage.setItem(lastFetchKey, now.toString());

      setRates((prev) => ({
        ...prev,
        actualExchangeRate: actualRate,
        offeredExchangeRate: offeredRate,
        unitProfit: unitProfit,
      }));
      setIsRateLoading(false);
    } catch (error) {
      console.error('Failed to fetch and store rate:', error);
      setIsRateLoading(false);
    }
  };

  useEffect(() => {
    if (
      !isLoading &&
      user &&
      user.currencyCode &&
      user.destinationCountryCurrencyCode
    ) {
      fetchRate();
    }
  }, [isLoading, user, profitMargin]);

  if (isRateLoading || isLoading) {
    return <LoadingOverlay message='Loading exchange rate...' />;
  }

  return (
    <View className='bg-white rounded-xl'>
      <Text className='text-center text-primary font-psemibold text-sm py-5'>
        {title}
      </Text>
      <View className='flex-row justify-evenly'>
        <View className='items-center justify-center'>
          <Image
            source={{ uri: hostCountryFlag }}
            resizeMode='cover'
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text className='text-center mt-3 text-primary font-pbold'>
            1.00 {user.currencyCode}
          </Text>
        </View>
        <View className='mt-3'>
          <FontAwesome name='exchange' color='#004d40' size={30} />
        </View>
        <View className='items-center justify-center'>
          <Image
            source={{ uri: recipientCountryFlag }}
            resizeMode='cover'
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text className='text-center mt-3 text-primary font-pbold'>
            {rates.offeredExchangeRate} {user.destinationCountryCurrencyCode}
          </Text>
        </View>
      </View>
      <View className='items-center py-5'>
        <CustomButton
          title='Send Now'
          containerStyles='w-[80%]'
          handlePress={() => router.push('/send')}
        />
      </View>
    </View>
  );
};

export default ExchangeRateCard;

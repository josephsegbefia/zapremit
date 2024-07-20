import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import CountryFlag from 'react-native-country-flag';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { adminProfitInfo, getRate } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  calculateOfferedRateAndUnitProfit,
  calculateTotalProfit,
} from '../lib/profitCalculator';
import LoadingOverlay from './LoadingOverlay';
import useAppwrite from '../lib/useAppwrite';

const ExchangeRateCard = ({ title, hostCountryFlag, recipientCountryFlag }) => {
  const { data: transferProfitInfo } = useAppwrite(adminProfitInfo);
  const { user, setRates, profitMargin, rates, country } = useGlobalContext();

  const [transferFee, setTransferFee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchedRates, setHasFetchedRates] = useState(false);

  const RATE_FETCH_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     // Alert.alert('Success', 'AsyncStorage has been cleared!');
  //   } catch (error) {
  //     // Alert.alert('Error', 'Failed to clear AsyncStorage');
  //     console.error('Failed to clear AsyncStorage:', error);
  //   }
  // };

  // clearAsyncStorage();
  const fetchRate = async () => {
    const rateKey = `${user?.currencyCode}_${user?.destinationCountryCurrencyCode}`;
    const lastFetchKey = `lastFetch_${rateKey}`;

    try {
      // Check the timestamp of the last fetch
      const lastFetchTime = await AsyncStorage.getItem(lastFetchKey);
      const now = Date.now();

      if (
        lastFetchTime &&
        now - parseInt(lastFetchTime) < RATE_FETCH_INTERVAL
      ) {
        // If the rates were fetched recently, use the stored rates
        const storedRate = await AsyncStorage.getItem(rateKey);
        if (storedRate) {
          const parsedStoredRate = JSON.parse(storedRate);

          setRates((prev) => ({
            ...prev,
            actualExchangeRate: parsedStoredRate.actualRate,
            offeredExchangeRate: parsedStoredRate.offeredRate,
            unitProfit: parsedStoredRate.unitProfit,
          }));
          setIsLoading(false);
          setHasFetchedRates(true);
          return;
        }
      }

      // If not stored or the stored rates are outdated, fetch the rate
      const rateData = await getRate(
        user?.currencyCode,
        user?.destinationCountryCurrencyCode,
        1
      );

      const parsedRate = JSON.parse(rateData);
      const actualRate = parsedRate?.rate;
      console.log('ACTUAL RATE===>', actualRate);
      const { offeredRate, unitProfit } = calculateOfferedRateAndUnitProfit(
        actualRate,
        profitMargin
      );

      // Store the rate and timestamp in AsyncStorage
      await AsyncStorage.setItem(
        rateKey,
        JSON.stringify({ actualRate, offeredRate, unitProfit })
      );
      await AsyncStorage.setItem(lastFetchKey, now.toString());

      // Update state with the fetched rate
      setRates((prev) => ({
        ...prev,
        actualExchangeRate: actualRate,
        offeredExchangeRate: offeredRate,
        unitProfit: unitProfit,
      }));
      setIsLoading(false);
      setHasFetchedRates(true);
    } catch (error) {
      console.error('Failed to fetch and store rate:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user?.currencyCode &&
      user?.destinationCountryCurrencyCode //&&
      // !hasFetchedRates
    ) {
      fetchRate();
    }
  }, [
    user?.currencyCode,
    user?.destinationCountryCurrencyCode,
    profitMargin,
    setRates,
    country,
  ]);

  if (isLoading) {
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
          {/* <CountryFlag
            isoCode={hostCountryId}
            size={50}
            className='rounded-full w-[50px] h-[50px]'
          /> */}
          <Text className='text-center mt-3 text-primary font-pbold'>
            1.00 {user?.currencyCode}
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
          {/* <CountryFlag
            isoCode={recipientCountryId}
            size={50}
            className='rounded-full w-[50px] h-[50px]'
          /> */}
          <Text className='text-center mt-3 text-primary font-pbold'>
            {rates.offeredExchangeRate} {user?.destinationCountryCurrencyCode}
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

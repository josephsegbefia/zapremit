import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import CountryFlag from 'react-native-country-flag';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { getRate } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';
const ExchangeRateCard = ({
  title,
  hostCountryId,
  userCountryFlag,
  recipientCountryId,
}) => {
  const { user } = useGlobalContext();
  const [exchangeRate, setExchangeRate] = useState('');
  const [offeredRate, setOfferedRate] = useState('');
  const [profit, setProfit] = useState('');

  const fetchRate = async () => {
    const result = await getRate(
      user.currencyCode,
      user.destinationCountryCurrencyCode,
      1
    );
    return result;
  };

  const applyProfitMargin = (rate, profitMargin) => {
    const profitRate = rate * (profitMargin / 100);
    const rawOfferedRate = rate - profitRate;
    const offeredRate = Math.floor(rawOfferedRate * 100) / 100; // Truncate to 2 decimal places
    const additionalProfit = rawOfferedRate - offeredRate;
    return {
      offeredRate: offeredRate.toFixed(2),
      profit: (profitRate + additionalProfit).toString(),
    };
  };

  useEffect(() => {
    const updateRate = async () => {
      const rate = await fetchRate();
      const parsedRate = JSON.parse(rate);
      setExchangeRate(parsedRate);

      const profitMargin = 1; // Example profit margin percentage
      const actualRate = parsedRate.rate;
      const { offeredRate, profit } = applyProfitMargin(
        actualRate,
        profitMargin
      );

      setOfferedRate(offeredRate);
      setProfit(profit);
    };

    updateRate();
  }, []);

  console.log(profit);
  return (
    <View className='bg-white rounded-xl'>
      <Text className='text-center text-primary font-psemibold text-sm py-5'>
        {title}
      </Text>
      <View className='flex-row justify-around'>
        <View>
          <CountryFlag
            isoCode={hostCountryId}
            size={50}
            className='rounded-full w-[50px] h-[50px]'
          />
          <Text className='text-center mt-3 text-primary font-pbold'>
            1.00 {user.currencyCode}
          </Text>
        </View>
        <View className='mt-5'>
          <FontAwesome name='exchange' color='#004d40' size={30} />
        </View>
        <View>
          <CountryFlag
            isoCode={recipientCountryId}
            size={50}
            className='rounded-full w-[50px] h-[50px]'
          />
          <Text className='text-center mt-3 text-primary font-pbold'>
            {offeredRate} {user.destinationCountryCurrencyCode}
          </Text>
        </View>
      </View>
      <View className='items-center py-5'>
        <CustomButton
          title='Send Now'
          containerStyles='w-[80%]'
          handlePress={() => router.push('/send')}
          // handlePress={() => router.push('extrascreens/addrecipient')}
        />
      </View>
    </View>
  );
};

export default ExchangeRateCard;

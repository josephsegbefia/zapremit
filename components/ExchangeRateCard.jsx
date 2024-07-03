import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import CountryFlag from 'react-native-country-flag';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { getRate } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';
import { applyProfitMargin } from '../lib/profitCalculator';
import LoadingOverlay from './LoadingOverlay';
import useFetchRate from '../lib/fetchRate';

const ExchangeRateCard = ({
  title,
  hostCountryId,
  userCountryFlag,
  recipientCountryId,
}) => {
  const { data: rateData, isLoading } = useFetchRate(() =>
    getRate('EUR', 'GHS', 2)
  );
  const { user, setRates, profitMargin } = useGlobalContext();
  const [exchangeRate, setExchangeRate] = useState('');

  // Rate && profit computation
  console.log(rateData);

  const parsedRate = JSON.parse(rateData);
  const actualRate = parsedRate?.rate;
  const { offeredRate, profit } = applyProfitMargin(actualRate, profitMargin);

  // const [isLoading, setIsLoading] = useState(false);

  // const fetchRate = async () => {
  //   const result = await getRate(
  //     user.currencyCode,
  //     user.destinationCountryCurrencyCode,
  //     1
  //   );
  //   return result;
  // };

  // useEffect(() => {
  //   try {
  //     const updateRate = async () => {
  //       // to limit API requests I will set the exchange rate values manually in development
  //       const rate = await fetchRate();
  //       const parsedRate = JSON.parse(rate);
  //       setExchangeRate(parsedRate);

  //       // Example profit margin percentage
  //       const actualRate = parsedRate.rate;
  //       const { offeredRate, profit } = applyProfitMargin(
  //         actualRate,
  //         profitMargin
  //       );

  //       setOfferedRate(offeredRate);
  //       setRates({
  //         offeredExchangeRate: offeredRate,
  //         unitProfit: profit,
  //         actualExhangeRate: actualRate,
  //       });
  //       setProfit(profit);
  //     };

  //     updateRate();
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  if (isLoading) {
    return <LoadingOverlay message='Loading...' />;
  }
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
            1.00 {user?.currencyCode}
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
            {offeredRate} {user?.destinationCountryCurrencyCode}
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

import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import CountryFlag from 'react-native-country-flag';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { getRate } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';
import { applyProfitMargin } from '../lib/profitCalculator';
import LoadingOverlay from './LoadingOverlay';

const ExchangeRateCard = ({ title, hostCountryFlag, recipientCountryFlag }) => {
  const { user, profitMargin, setRates, rates } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      const rateData = await getRate(
        user?.currencyCode,
        user?.destinationCountryCurrencyCode,
        1
      );
      const parsedRate = JSON.parse(rateData);
      const actualRate = parsedRate?.rate;
      const { offeredRate } = applyProfitMargin(actualRate, profitMargin);

      setRates((prev) => ({
        ...prev,
        actualExchangeRate: actualRate,
        offeredExchangeRate: offeredRate,
      }));
      setIsLoading(false);
    };

    if (user?.currencyCode && user?.destinationCountryCurrencyCode) {
      fetchRate();
    }
  }, [
    user?.currencyCode,
    user?.destinationCountryCurrencyCode,
    profitMargin,
    setRates,
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

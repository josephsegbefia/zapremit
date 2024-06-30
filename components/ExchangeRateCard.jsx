import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import CountryFlag from 'react-native-country-flag';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { getRate } from '../lib/appwrite';

const ExchangeRateCard = ({
  title,
  hostCountryId,
  userCountryFlag,
  recipientCountryId,
}) => {
  const [rate, setRate] = useState('');

  useEffect(() => {
    const rate = getRate('USD', 'EUR');
    setRate(rate);
  }, []);

  console.log('RATE========>', rate);
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
            1.00 EUR
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
            17.00 GHS
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

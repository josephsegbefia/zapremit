import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExchangeRateCard from '../../components/ExchangeRateCard';
import React from 'react';

const Home = () => {
  return (
    <SafeAreaView className='h-full bg-primary-50  items-center'>
      <View className='justify-center text-center w-[90%] mt-20'>
        <ExchangeRateCard
          title='Current Rate'
          hostCountryId='de'
          recipientCountryId='gh'
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

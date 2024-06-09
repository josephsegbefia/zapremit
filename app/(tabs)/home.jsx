import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExchangeRateCard from '../../components/ExchangeRateCard';
import React from 'react';
import CustomCard from '../../components/CustomCard';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const { user } = useGlobalContext();
  console.log(user);
  return (
    <ScrollView className='h-full bg-primary-50'>
      <SafeAreaView className='items-center mb-10'>
        <View className='mt-8'>
          <Text className='text-primary font-psemibold text-xl'>
            Welcome back, {user.firstName}
          </Text>
        </View>
        <View className='justify-center text-center w-[95%] mt-5'>
          <ExchangeRateCard
            title='Current Rate'
            hostCountryId='de'
            recipientCountryId='gh'
          />
        </View>
        <View className='mt-10 flex flex-row border-b-2 border-primary'>
          <Text className='font-pmedium text-sm text-primary mb-1'>
            Recent Transfers
          </Text>
        </View>
        <View className='w-[95%] mt-10'>
          <CustomCard
            firstName='Harry'
            lastName='Potter'
            amount='1,276 GHS'
            date='May, 20 2024'
            status='Failed'
            isTransferHistory
          />
          <CustomCard
            firstName='Severus'
            lastName='Snape'
            amount='300 GHS'
            date='May, 27 2024'
            status='delivered'
            isTransferHistory
          />
          <CustomCard
            firstName='S'
            lastName='S'
            amount='300 GHS'
            date='May, 27 2024'
            status='delivered'
            isTransferHistory
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

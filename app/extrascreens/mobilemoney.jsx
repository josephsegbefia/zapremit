import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router, useNavigation } from 'expo-router';

import { Feather } from '@expo/vector-icons';
import InfoCard from '../../components/InfoCard';

// Please take note that this screen will have to change once you connect to zeepay. It must show the different mobile
// money options available in a recipients country. For now it is hardcoded and limited to Ghana. The same will apply
// the other methods such as Bank Transfer, Cash Pickup and the rest.

const MobileMoney = () => {
  const { transferData, setTransferData } = useGlobalContext();
  const navigation = useNavigation();
  const mobileMoneyProviders = [
    {
      company: 'Vodafone GH',
      service: 'Vodafone Cash',
      limit: '15K GHS',
      fee: 0.99,
    },
    {
      company: 'AirtelTigo',
      service: 'AirtelTigo Cash Cash',
      limit: '15K GHS',
      fee: 0.99,
    },
    {
      company: 'MTN',
      service: 'MTN MoMo',
      limit: '15K GHS',
      fee: 0.99,
    },
  ];

  return (
    <ScrollView className='h-full bg-primary-50'>
      <SafeAreaView className='pb-10'>
        <View className='w-[90%]'>
          <InfoCard
            title='Important Information'
            info='Please make sure the recipient has a registered mobile money account
            number with the provider. A wrong number may lead to a delay in your
            transfer.'
          />
        </View>

        <View className='items-center'>
          {mobileMoneyProviders.map((provider) => (
            <TouchableOpacity
              key={provider.company}
              className='w-[95%] bg-white rounded-xl mt-5 py-10 px-4'
              onPress={() => {
                setTransferData({
                  ...transferData,
                  transferFee: provider.fee,
                  deliveryMethod: provider.service,
                });
                navigation.navigate('send');
              }}
            >
              <View className='flex-row justify-between'>
                <View className='flex-row'>
                  <View className='justify-center bg-primary-50 items-center border-2 border-primary w-[40px] h-[40px] rounded-full'>
                    <Text className='text-primary font-psemibold text-xl'>
                      <Feather name='smartphone' size={24} color='#004d40' />
                    </Text>
                  </View>
                  <View className='justify-center px-4'>
                    <Text className=' text-primary text-xl font-psemibold'>
                      {provider.service}
                    </Text>
                  </View>
                </View>
              </View>
              <View className=''>
                <Text className='text-primary font-pregular ml-14'>
                  Up to {provider.limit}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MobileMoney;

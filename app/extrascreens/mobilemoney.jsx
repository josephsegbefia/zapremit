import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router, useNavigation } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const MobileMoney = () => {
  const navigation = useNavigation();
  const mobileMoneyProviders = [
    {
      company: 'Vodafone GH',
      service: 'Vodafone Cash',
      limit: '15K GHS',
    },
    {
      company: 'AirtelTigo',
      service: 'AirtelTigo Cash Cash',
      limit: '15K GHS',
    },
    {
      company: 'MTN',
      service: 'MTN MoMo',
      limit: '15K GHS',
    },
  ];

  return (
    <ScrollView className='h-full bg-primary-50'>
      <SafeAreaView>
        <View className='flex-row px-4'>
          <Ionicons
            name='information-circle-outline'
            size={24}
            color='#004d40'
            // style={{ fontWeight: 'bold' }}
          />
          <View className='justify-center mb-4'>
            <View className='w-[90%]'>
              <Text className='px-2 font-psemibold'>Important Information</Text>
              <Text className='text-xs mt-3 text-justify'>
                Please make sure the recipient has a registered mobile money
                account number with the provider. A wrong number may lead to a
                delay in your transfer.
              </Text>
            </View>
          </View>
        </View>
        <View className='items-center'>
          {mobileMoneyProviders.map((provider) => (
            <TouchableOpacity
              key={provider.company}
              className='w-[95%] bg-white rounded-xl mt-5 py-10 px-4'
              onPress={() =>
                navigation.navigate('send', {
                  data: provider.service,
                })
              }
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

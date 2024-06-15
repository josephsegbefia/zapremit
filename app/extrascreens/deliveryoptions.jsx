import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import InfoCard from '../../components/InfoCard';

const DeliveryOptions = () => {
  const deliveryOptions = [
    {
      title: 'Mobile Money',
      initials: <Feather name='smartphone' size={24} color='#004d40' />,
      fee: '0.99 EUR',
      eta: 'Less than a min',
      info: 'Money will be available in recipients mobile money wallet in seconds. Make sure you have entered the correct mobile money number',
      screen: 'mobilemoney',
    },
    {
      title: 'Cash Pickup',
      initials: <FontAwesome6 name='money-bills' size={24} color='#004d40' />,
      fee: '0.99 EUR',
      eta: 'Less than a min',
      info: 'Money will be available in less than a minute at our agent locations',
      screen: 'cashpickup',
    },
    {
      title: 'Bank Transfer',
      initials: <FontAwesome name='bank' size={24} color='#004d40' />,
      fee: '0.99 EUR',
      eta: 'Less than a min',
      info: 'Money will be available in all banks across Ghana',
      screen: 'banktransfer',
    },
  ];
  return (
    <ScrollView className='h-full bg-primary-50'>
      <SafeAreaView>
        <View className='w-[90%]'>
          <InfoCard
            title='Important Information'
            info='You can choose your preferred delivery option. Under each option there are other suboptions to pick'
          />
        </View>

        <View className='items-center'>
          {deliveryOptions.map((option) => (
            <TouchableOpacity
              key={option.title}
              className='w-[95%] bg-white rounded-xl mt-5 py-10 px-4'
              onPress={() => router.push(`/extrascreens/${option.screen}`)}
            >
              <View className='flex-row justify-between'>
                <View className='flex-row'>
                  <View className='justify-center items-center border-2 border-primary w-[60px] h-[60px] rounded-full'>
                    <Text className='text-primary font-psemibold text-xl'>
                      {option.initials}
                    </Text>
                  </View>
                  <View className='justify-center px-4'>
                    <Text className=' text-primary text-xl font-psemibold'>
                      {option.title}
                    </Text>
                  </View>
                </View>
                <View className='justify-center px-4'>
                  <AntDesign name='caretdown' size={14} color='#004d40' />
                </View>
              </View>
              <View className='ml-20'>
                <Text className='text-primary font-psemibold'>
                  Fee: {option.fee}
                </Text>
                <Text className='text-primary font-psemibold'>
                  ETA: {option.eta}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DeliveryOptions;

import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import CustomButton from '../../components/CustomButton';

// The purpose of this component is to make sure users verify their phone numbers before they can use the app.
// Phone number verification should normally happen during the signup process, but some users may have aborted the process along the way
// This component ensures they verify their number when they open the app
const VerifyPhone = () => {
  return (
    <SafeAreaView className='bg-primary-50 h-full'>
      <View className='justify-center items-center px-6'>
        <Logo
          styles='bg-primary-50 border-primary'
          logoTextColor='text-primary'
          color='#004d40'
          text='Zap Remit'
        />
        <Text className=' text-primary text-center mt-10'>
          Your phone number is unverified. Please click the button below to
          verify your number, to continue using the app. It only takes a few
          seconds
        </Text>
      </View>
      <View className='items-center mt-20'>
        <View className='w-[95%]'>
          <CustomButton title='VERIFY NUMBER NOW' />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyPhone;

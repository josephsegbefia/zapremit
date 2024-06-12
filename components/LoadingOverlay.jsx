import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const LoadingOverlay = ({ message }) => {
  return (
    <SafeAreaView className='h-full bg-primary-50'>
      <View className='justify-center items-center mt-[100px]'>
        <ActivityIndicator size='large' color='#FF9C01' />
        <Text className='text-xl text-center text-primary mt-5 font-psemibold'>
          {message}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoadingOverlay;

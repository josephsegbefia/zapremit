import { View, Text } from 'react-native';
import React from 'react';

const MiniTransferSummary = ({ transferFee, totalToPay }) => {
  return (
    <View className='items-center'>
      <View className='w-[95%] bg-white px-4 mt-6 rounded-xl'>
        <View className='flex-row justify-between py-2'>
          <View className='justify-center'>
            <Text className='text-primary font-psemibold'>Transfer fee</Text>
          </View>
          <View className='justify-center'>
            <Text className='text-primary font-psemibold'>
              GHS {transferFee}
            </Text>
          </View>
        </View>

        <View className='flex-row justify-between my-2'>
          <View className='justify-center'>
            <Text className='text-primary font-psemibold'>Total</Text>
          </View>
          <View className='justify-center'>
            <Text className='text-primary font-psemibold'>{totalToPay}</Text>
          </View>
        </View>
      </View>
      <View className='mt-2 mb-20'></View>
    </View>
  );
};

export default MiniTransferSummary;

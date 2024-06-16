import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SendScreenOptionsCard = ({
  handlePress,
  icon,
  opacity,
  dropdownIcon,
  deliveryMethod,
}) => {
  return (
    <TouchableOpacity
      className='bg-white rounded-xl w-[95%]  mt-6 flex-row py-3 justify-between'
      onPress={handlePress}
      activeOpacity={opacity}
    >
      <View className='flex-row px-4 gap-3'>
        <View className='border border-primary rounded-full w-10 h-10 justify-center items-center'>
          {icon}
        </View>
        <View className='justify-center'>
          <Text className='text-primary font-psemibold text-base'>
            {!deliveryMethod ? 'Select delivery option' : `${deliveryMethod}`}
          </Text>
        </View>
      </View>
      <View className='justify-center px-5'>{dropdownIcon}</View>
    </TouchableOpacity>
  );
};

export default SendScreenOptionsCard;

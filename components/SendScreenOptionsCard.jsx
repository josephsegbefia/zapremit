import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SendScreenOptionsCard = ({
  isDeliveryMethodSelect,
  handlePress,
  icon,
  opacity,
  dropdownIcon,
  deliveryMethod,
  // title,
  reason,
  styles,
}) => {
  return (
    <TouchableOpacity
      className={`bg-white rounded-xl w-[95%] flex-row py-3 justify-between ${styles}`}
      onPress={handlePress}
      activeOpacity={opacity}
    >
      <View className='flex-row px-4 gap-3'>
        <View className='border border-primary rounded-full w-10 h-10 justify-center items-center'>
          {icon}
        </View>
        <View className='justify-center'>
          {isDeliveryMethodSelect ? (
            <Text className='text-primary font-psemibold text-base'>
              {!deliveryMethod ? 'Select delivery option' : `${deliveryMethod}`}
            </Text>
          ) : (
            <Text className='text-primary font-psemibold text-base'>
              {!reason ? 'Reason for sending' : `${reason}`}
            </Text>
          )}
        </View>
      </View>
      <View className='justify-center px-5'>{dropdownIcon}</View>
    </TouchableOpacity>
  );
};

export default SendScreenOptionsCard;

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomCard = ({
  firstName,
  middleName,
  lastName,
  amount,
  date,
  status,
  customStyles,
  isTransferHistory,
}) => {
  const initials = firstName.charAt(0) + lastName.charAt(0);
  const fullName = firstName + ' ' + lastName;

  return (
    <View className='w-100%'>
      <View className={` border-none bg-white rounded-xl px-3 py-3 mt-3`}>
        <View className='flex flex-row justify-between gap-3'>
          <View className='flex flex-row'>
            <View className='w-[50px] h-[50px] items-center justify-center rounded-full border-2 border-primary mx-3'>
              <Text className='text-primary font-psemibold'>{initials}</Text>
            </View>
            <View className='py-3'>
              <Text className='text-xl font-psemibold text-primary'>
                {fullName}
              </Text>
            </View>
          </View>

          {/* <View className='py-3'>
            <Text className='text-xl font-psemibold'>{fullName}</Text>
          </View> */}
          <View>
            <Text className='py-4 font-psemibold'>{amount}</Text>
          </View>
        </View>
        {isTransferHistory && (
          <View className='flex flex-row gap-3 justify-evenly mt-1'>
            <Text className='py-1 text-primary'>Sent {date}</Text>
            <Text
              className={`py-1 ${
                status === 'delivered' ? 'text-primary' : 'text-primary-red'
              }`}
            >
              {status === 'delivered' ? 'Succesful' : 'Problematic'}
            </Text>

            <TouchableOpacity className='border rounded-full px-4'>
              <Text className='text-sm font-semibold text-primary text-center py-0.5'>
                View
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomCard;

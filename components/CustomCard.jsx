import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

const CustomCard = ({
  firstName,
  middleName,
  lastName,
  amount,
  date,
  status,
  customStyles,
  isTransferHistory,
  empty,
}) => {
  const { user } = useGlobalContext();
  const initials =
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

  let fullName;
  if (middleName) {
    fullName =
      firstName.trim() + ' ' + middleName.trim() + ' ' + lastName.trim();
  } else {
    fullName = firstName.trim() + ' ' + lastName.trim();
  }

  return (
    <View className='w-100%'>
      <View
        className={`border-none bg-white rounded-xl px-3 py-3 mt-2 ${customStyles}`}
      >
        <View className='flex flex-row justify-between gap-3'>
          <View className='flex flex-row'>
            <View className='w-[50px] h-[50px] items-center justify-center rounded-full border-2 border-primary mx-3'>
              {empty ? (
                <Text className='text-primary font-psemibold'>NT</Text>
              ) : (
                <Text className='text-primary font-psemibold'>{initials}</Text>
              )}
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
            <Text className='py-4 font-psemibold text-primary'>
              {isTransferHistory && user?.destinationCountryCurrencyCode}{' '}
              {amount}
            </Text>
          </View>
        </View>
        {isTransferHistory && (
          <View className='flex flex-row gap-3 justify-evenly mt-1'>
            <Text className='py-1 text-primary'>Sent {date}</Text>
            <Text
              className={`py-1 ${
                status === 'Success' ? 'text-primary' : 'text-primary-red'
              }`}
            >
              {status === 'Success' ? 'Succesful' : 'Problematic'}
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

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Feather } from '@expo/vector-icons';
import formatDate from '../../lib/formatDate';

const Profile = () => {
  const { user } = useGlobalContext();

  let fullName;
  if (user.middleName) {
    fullName =
      user.firstName.trim() +
      ' ' +
      user.middleName.trim() +
      ' ' +
      user.lastName.trim();
  } else {
    fullName = user.firstName.trim() + ' ' + user.lastName.trim();
  }

  return (
    <SafeAreaView className='h-full bg-primary-50'>
      <ScrollView>
        <View className='items-center'>
          <View className='py-2 w-[95%] mb-2 mt-2'>
            <Text className='text-primary font-psemibold'>
              Personal Information
            </Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 mb-2'>
            <Text className='font-psemibold text-primary'>Name</Text>
            <Text className='text-base text-primary'>{fullName}</Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 my-2'>
            <Text className='font-psemibold text-primary'>Date of birth</Text>
            <Text className='text-base text-primary'>October 13, 2024</Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 my-2'>
            <Text className='font-psemibold text-primary'>Address</Text>
            <Text className='text-base text-primary'>
              Müllerstraße Straße 21, 12623 Berlin
            </Text>
          </View>

          <View className='py-2 w-[95%] mb-2 mt-2'>
            <Text className='text-primary font-psemibold'>
              Account Information
            </Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 mb-2'>
            <Text className='font-psemibold text-primary'>Email Address</Text>
            <Text className='text-base text-primary'>{user.email}</Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 my-2'>
            <Text className='font-psemibold text-primary'>Phone Number</Text>
            <Text className='text-base text-primary'>
              {user.callingCode}
              {user.phone}
            </Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 my-2'>
            <Text className='font-psemibold text-primary'>Member Since</Text>
            <Text className='text-base text-primary'>
              {formatDate(user.$createdAt)}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.3}>
            <View className='w-[95%] rounded-lg bg-white px-3 py-3 mt-10 flex-row justify-between'>
              <View className='justify-center'>
                <Text className='font-psemibold text-primary-red'>
                  Sign out
                </Text>
              </View>
              <Feather name='log-out' size={24} color='#ED2939' />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

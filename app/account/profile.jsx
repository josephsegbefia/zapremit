import { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation, Redirect } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Feather } from '@expo/vector-icons';
import { signOut } from '../../lib/appwrite';
import formatDate from '../../lib/formatDate';

const Profile = () => {
  const navigation = useNavigation();
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  let fullName;
  if (user?.middleName) {
    fullName =
      user?.firstName.trim() +
      ' ' +
      user?.middleName.trim() +
      ' ' +
      user?.lastName.trim();
  } else {
    fullName = user?.firstName.trim() + ' ' + user?.lastName.trim();
  }

  const signout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    return navigation.navigate('index');
  };

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
            <Text className='text-base text-primary'>{user?.dob}</Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 my-2'>
            <Text className='font-psemibold text-primary'>Address</Text>
            <Text className='text-base text-primary'>
              {user?.street}, {user?.postcode} {user?.city} {user?.country}
            </Text>
          </View>

          <View className='py-2 w-[95%] mb-2 mt-2'>
            <Text className='text-primary font-psemibold'>
              Account Information
            </Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 mb-2'>
            <Text className='font-psemibold text-primary'>Email Address</Text>
            <Text className='text-base text-primary'>{user?.email}</Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 my-2'>
            <Text className='font-psemibold text-primary'>Phone Number</Text>
            <Text className='text-base text-primary'>
              {user?.completePhone}
            </Text>
          </View>
          <View className='w-[95%] rounded-lg bg-white px-3 py-3 my-2'>
            <Text className='font-psemibold text-primary'>Member Since</Text>
            <Text className='text-base text-primary'>
              {user && formatDate(user?.$createdAt)}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.3} onPress={signout}>
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

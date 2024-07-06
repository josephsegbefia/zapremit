import { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { AntDesign, Feather } from '@expo/vector-icons';
import ChangeSendCountry from '../../components/ChangeSendCountry';
import { signOut } from '../../lib/appwrite';
import { updateUserCurrencyInfo } from '../../lib/appwrite';
import formatDate from '../../lib/formatDate';
import { getUserById } from '../../lib/appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingOverlay from '../../components/LoadingOverlay';

const Profile = () => {
  const navigation = useNavigation();
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [showCountries, setShowCountries] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [country, setCountry] = useState({
    name: '',
    countryCode: '',
    currencyCode: '',
    currencyName: '',
    currencySymbol: '',
    flag: '',
  });

  const initialRender = useRef(true); // Ref to track initial render

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

  const getAccountId = async () => {
    try {
      const id = await AsyncStorage.getItem('accountId');
      if (id !== null) {
        setAccountId(id);
        console.log('ID=======>', id);
      }
    } catch (error) {
      console.error('Error fetching accountId from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      // Skip the first render
      initialRender.current = false;
    } else {
      const callUser = async () => {
        const response = await getUserById(accountId);
        setUser(response);
        console.log('user====>', response);
      };
      callUser();
    }
  }, [country]);

  useEffect(() => {
    getAccountId();
  }, []);

  if (isUpdating) {
    return <LoadingOverlay message='Applying changes...' />;
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
          <TouchableOpacity
            className='w-[95%] rounded-lg bg-white px-3 py-3 mb-2'
            onPress={() => setShowCountries(true)}
          >
            <View className='flex-row justify-between'>
              <Text className='font-psemibold text-primary'>Sending to</Text>
              <View className='justify-center'>
                <AntDesign name='caretdown' size={14} color='#004d40' />
              </View>
            </View>
            <View className='mt-2 flex-row'>
              <Image
                source={{ uri: user?.destinationCountryFlag }}
                className='w-[30px] h-[20px] rounded-md border border-primary'
              />
              <Text className='text-primary font-psemibold px-6'>
                {user?.destinationCountry}
              </Text>
            </View>
          </TouchableOpacity>
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
      {showCountries && (
        <ChangeSendCountry
          country={country}
          setCountry={setCountry}
          setModalVisible={setShowCountries}
          updateUser={updateUserCurrencyInfo}
          setIsUpdating={setIsUpdating}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;

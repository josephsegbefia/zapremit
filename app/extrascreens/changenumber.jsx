import { View, Text } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField';
import CountryCodePicker from '../../components/CountryCodePicker';
import { updateUserPhone } from '../../lib/appwrite';
import { router, useNavigation } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import { sendOTP } from '../../lib/appwrite';
import LoadingOverlay from '../../components/LoadingOverlay';

const ChangeNumber = () => {
  const { user } = useGlobalContext();
  const navigation = useNavigation();

  const [isUpdating, setIsUpdating] = useState(false);
  const [countryInfo, setCountryInfo] = useState({
    completePhone: '',
    name: '',
    code: '',
    callingCode: '',
    currencyCode: '',
    currencyName: '',
    currencySymbol: '',
  });

  const data = countryInfo;
  const userId = user.$id;

  const handleSubmit = async () => {
    setIsUpdating(true);
    try {
      const response = await updateUserPhone(data, userId);
      await sendOTP(data.completePhone);
      console.log('DATA====>', data);

      router.replace('/extrascreens/otpscreen');
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isUpdating) {
    return <LoadingOverlay message='Updating phone number...' />;
  }
  return (
    <View className='items-center h-full bg-primary-50'>
      <Text className='font-psemibold text-primary mt-20 mb-20'>
        Please change your number here
      </Text>
      <View className='px-10'>
        <View className='mb-10'>
          <CountryCodePicker
            countryInfo={countryInfo}
            setCountryInfo={setCountryInfo}
          />
        </View>

        <View className='flex flex-row px-4 mt-5'>
          <CustomButton
            title='Back'
            containerStyles='w-[100px] mt-3 mr-3 bg-transparent border-primary-red flex-2'
            textStyles='text-primary-red'
            handlePress={() => navigation.goBack()}
          />
          <CustomButton
            title='UPDATE NUMBER'
            containerStyles='w-[100px] mt-3 flex-1'
            // isLoading={isSubmitting}
            handlePress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default ChangeNumber;

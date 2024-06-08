import { useState, useContext } from 'react';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker';
import {
  View,
  Text,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useNavigation, router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { SignupContext } from '../../context/signup-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { createUser } from '../../lib/appwrite';

const Signup3 = () => {
  const { signupData, setSignupData } = useContext(SignupContext);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const navigation = useNavigation();

  const [selected, setSelected] = useState('+233');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  let countryName;
  if (country) {
    countryName = country.name;
  }

  console.log(countryName);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setSignupData({
      ...signupData,
      country: countryName,
      phone: `${selected}${phone}`,
    });
    if (!phone || !country) {
      Alert.alert(
        'Error',
        'Please select a country and enter your phone number'
      );
      return;
    }
    setIsSubmitting(true);
    const firstName = signupData.firstName.trim();
    const lastName = signupData.lastName.trim();
    const email = signupData.email.trim();
    const password = signupData.password.trim();

    try {
      const result = await createUser(
        firstName,
        lastName,
        email,
        password,
        countryName,
        phone
      );
      setUser(result);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
    // router.replace('/confirmOTP');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className='bg-primary-50 h-full'>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          style={{ flex: 1 }}
        >
          <View className='w-full justify-center px-4'>
            <Text className='text-2xl text-primary text-semibold my-10 text-center font-semibold'>
              Sign up to zap
            </Text>
          </View>
          <View className='w-full justify-center px-4 mb-6 mt-3'>
            <Text className='text-base text-black-200 font-pmedium'>
              Country & Phone
            </Text>
            <View className='mt-3'>
              <CountryCodeDropdownPicker
                selected={selected}
                setSelected={setSelected}
                setCountryDetails={setCountry}
                phone={phone}
                setPhone={setPhone}
                countryCodeTextStyles={{
                  fontSize: 14,
                  fontFamily: 'Poppins-SemiBold',
                }}
                countryCodeContainerStyles={{
                  height: 42,
                  backgroundColor: '#e0f2f1',
                  borderColor: '#80cbc4',
                  borderWidth: 2,
                }}
                phoneStyles={{
                  fontSize: 20,
                  borderColor: '#80cbc4',
                  borderWidth: 2,
                  color: '#004d40',
                  fontFamily: 'Poppins-SemiBold',
                }}
                searchTextStyles={{ fontSize: 28 }}
                dropdownStyles={{ backgroundColor: '#e0f2f1' }}
              />
            </View>
            {country && (
              <Text className='text-base text-black-200 font-pmedium mt-3'>
                You will be sending money from {country.name}
              </Text>
            )}
          </View>
        </KeyboardAvoidingView>
        <View className='flex flex-row px-4 mt-5'>
          <CustomButton
            title='Back'
            containerStyles='w-[100px] mt-3 mr-3 bg-transparent border-primary-red flex-2'
            textStyles='text-primary-red'
            handlePress={() => navigation.goBack()}
          />
          <CustomButton
            title='SUBMIT'
            containerStyles='w-[100px] mt-3 flex-1'
            isLoading={isSubmitting}
            handlePress={submit}
          />
        </View>
        <View className='justify-center pt-5 flex-row gap-2'>
          <Text className='text-lg text-primary font-regular'>
            Don't have an account?
          </Text>
          <Link
            href='/signup1'
            className='text-lg font-psemibold text-secondary-100'
          >
            Sign up
          </Link>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup3;

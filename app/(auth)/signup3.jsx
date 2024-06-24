import { useState, useContext } from 'react';
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
import InfoCard from '../../components/InfoCard';
import CountryCodePicker from '../../components/CountryCodePicker';
import { SignupContext } from '../../context/signup-context';
import { useCountryPickerContext } from '../../context/country-picker-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { createUser } from '../../lib/appwrite';

const Signup3 = () => {
  const { signupData, setSignupData } = useContext(SignupContext);
  const { countryData, setCountryData } = useCountryPickerContext();
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const navigation = useNavigation();

  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [completePhone, setCompletePhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setSignupData((prev) => ({
      ...prev,
      country: country,
      code: countryData.code,
      phone: countryData.phone,
      completePhone: countryData.completePhone,
    }));

    if (!countryData.phone || !countryData.name) {
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
    const callingCode = countryData.callingCode.trim();
    const code = countryData.code.trim();
    const completePhone = countryData.completePhone.trim();
    const phone = countryData.phone.trim();
    const country = countryData.name.trim();

    const data = {
      firstName,
      lastName,
      email,
      password,
      country,
      callingCode,
      code,
      completePhone,
      phone,
    };
    // try {
    //   const result = await createUser(signupData);
    //   setUser(result);
    //   setIsLoggedIn(true);
    // } catch (error) {
    //   Alert.alert('Error', error.message);
    // } finally {
    //   setIsSubmitting(false);
    // }
    // router.replace('/extrascreens/otpscreen');
    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className='bg-primary-50 h-full'>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          style={{ flex: 1 }}
        >
          <View className='w-full items-center px-4'>
            <Text className='text-2xl text-primary text-semibold my-10 text-center font-semibold'>
              Sign up to zap
            </Text>
          </View>
          <View className='w-full justify-center px-4 mb-6 mt-3'>
            <Text className='text-base text-primary font-pmedium'>
              Country & Phone
            </Text>
            <View className='w-[95%] mt-4'>
              <InfoCard
                title='Phone number format'
                info='Please start your phone number without the first zero after the country code. Failure to do so will result in not receiving the OTP.'
              />
            </View>
            <View className='mt-3'>
              <CountryCodePicker setCountry={setCountry} />
            </View>
            {country && (
              <Text className='text-base text-primary font-pmedium mt-3'>
                You will be sending money from {country}
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

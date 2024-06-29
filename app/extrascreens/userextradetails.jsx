import { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import LoadingOverlay from '../../components/LoadingOverlay';
import DateField from '../../components/DateField';
import { updateUser } from '../../lib/appwrite';
import CountryCodePicker from '../../components/CountryCodePicker';
import Countries from '../../components/Countries';

const UserExtraDetails = () => {
  const { user, isLoading } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dob, setDob] = useState('');
  const [dateError, setDateError] = useState('');
  const [country, setCountry] = useState({
    name: '',
    countryCode: '',
    currencyCode: '',
    currencyName: '',
    currencySymbol: '',
    flag: '',
  });
  const [form, setForm] = useState({
    street: '',
    hseNum: '',
    city: '',
    postcode: '',
  });

  const submitHandler = async () => {
    if (!form.street || !form.city || !form.postcode || !dob) {
      Alert.alert('Error', 'Please make sure all fields are filled');
      return;
    }
    if (dateError) {
      Alert.alert('Error', dateError);
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        street: form.street,
        postcode: form.postcode,
        city: form.city,
        dob: dob,
        userId: user.$id,
        // Destination country details

        destinationCountry: country.name,
        destinationCountryCurrencyCode: country.currencyCode,
        destinationCountryCurrencyName: country.currencyName,
        destinationCountryFlag: country.flag,
        destinationCountryCurrencySymbol: country.currencySymbol,
        destinationCountryCode: country.countryCode,
      };
      console.log(data);
      await updateUser(data);
      router.replace('/home');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message='Loading...' />;
  }

  if (isSubmitting) {
    return <LoadingOverlay message='Updating user info...' />;
  }
  return (
    <SafeAreaView className='h-full bg-primary-50'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView className=''>
          <View className='w-[95%]'>
            <Text className='px-4 text-sm text-primary font-psemibold mb-4'>
              Tell us a bit more about yourself
            </Text>
          </View>

          <View className='flex-1 items-center'>
            <View className='w-[95%]'>
              <FormField
                editable={false}
                title='Country'
                otherStyles='mt-4'
                value={user.country}
              />
              <FormField
                title='Street Address'
                otherStyles='mt-4'
                value={form.street}
                handleChangeText={(e) => setForm({ ...form, street: e })}
                autoComplete={false}
                autoCapitalize={false}
                autoCorrect={false}
                placeholder='e.g. Alfred-Jung-Straße 14'
              />

              <FormField
                title='Post Code'
                otherStyles='mt-4'
                value={form.postcode}
                handleChangeText={(e) => setForm({ ...form, postcode: e })}
                autoComplete={false}
                autoCapitalize={false}
                autoCorrect={false}
                placeholder='e.g. 10369'
              />
              <FormField
                title='City'
                otherStyles='mt-4'
                value={form.city}
                // keyboardType='email-address'
                handleChangeText={(e) => setForm({ ...form, city: e })}
                autoComplete={false}
                autoCapitalize={false}
                autoCorrect={false}
                placeholder='e.g. Berlin'
              />
              <DateField
                title='Date of birth'
                otherStyles='mt-3 mb-3'
                placeholder='DD/MM/YYYY'
                setDob={setDob}
                dob={dob}
                setDateError={setDateError}
              />
              <Countries country={country} setCountry={setCountry} />
              <View className='mt-10'>
                <CustomButton title='SUBMIT' handlePress={submitHandler} />
              </View>
            </View>
          </View>
        </ScrollView>
        {/* <View className='items-center'>
          <View className='w-[95%]'>

          </View>
        </View> */}
      </KeyboardAvoidingView>
      <View className='flex flex-row px-4 mt-5'>
        {/* <CustomButton
          title='Cancel'
          containerStyles='w-[100px] mt-3 mr-3 bg-transparent border-primary-red flex-2'
          textStyles='text-primary-red'
          handlePress={() => navigation.goBack()}
        />
        <CustomButton
          title='SUBMIT'
          containerStyles='w-[100px] mt-3 flex-1'
          isLoading={isSubmitting}
          handlePress={submit}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default UserExtraDetails;

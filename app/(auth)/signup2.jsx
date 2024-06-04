import { useState } from 'react';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker';
import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useNavigation, router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';

const Signup2 = () => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState('+49');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  const [form, setForm] = useState({
    country: country.name,
    streetAddress: '',
    state: '',
    city: '',
    password: '',
    consfirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    router.replace('/send');
  };

  return (
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
          <Text className='text-base text-black-200 font-pmedium mt-3'>
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className='w-full justify-center px-4 mb-6 mt-3'>
            <FormField
              title='Street Address'
              value={form.streetAddress}
              handleChangeText={(e) => setForm({ ...form, streetAddress: e })}
              otherStyles='mt-3'
            />
            <FormField
              title='State'
              value={form.state}
              handleChangeText={(e) => setForm({ ...form, state: e })}
              otherStyles='mt-3'
            />
            <FormField
              title='City'
              value={form.city}
              handleChangeText={(e) => setForm({ ...form, city: e })}
              otherStyles='mt-3'
            />
            <FormField
              title='Password'
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles='mt-3'
            />
            <FormField
              title='Confirm Password'
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles='mt-3'
            />
          </View>
        </ScrollView>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup2;

import { useState } from 'react';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker';

import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  Alert,
  ScrollView,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Router, router, useNavigation } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import Logo from '../../components/Logo';

// import {login} from '../../lib/appwrite
const Signup1 = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('+49');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  const [form, setForm] = useState({
    // country: '',
    // phone: '',
    streetAddress: '',
    state: '',
    city: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};
  return (
    <SafeAreaView className='bg-primary-50 h-full'>
      <View className='w-full justify-center px-4'>
        <Text className='text-2xl text-primary text-semibold mt-5 text-center font-semibold'>
          Sign up to zap
        </Text>
        <View className='mt-10'>
          <CountryCodeDropdownPicker
            selected={selected}
            setSelected={setSelected}
            setCountryDetails={setCountry}
            phone={phone}
            setPhone={setPhone}
            countryCodeTextStyles={{ fontSize: 13 }}
          />
        </View>
      </View>
      <ScrollView>
        <View className='w-full justify-center px-4 mb-6 mt-3'>
          {/* <FormField
            title='Country'
            value={form.country}
            handleChangeText={(e) => setForm({ ...form, country: e })}
            otherStyles='mt-3'
          />
          <FormField
            title='Phone'
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            otherStyles='mt-3'
          /> */}
          <FormField
            title='Street Address'
            value={form.street}
            handleChangeText={(e) => setForm({ ...form, streetAddress: e })}
            otherStyles='mt-3'
            // keyboardType='email-address'
          />
          <FormField
            title='State'
            value={form.state}
            handleChangeText={(e) => setForm({ ...form, state: e })}
            otherStyles='mt-3'
            // keyboardType='email-address'
          />
          <FormField
            title='City'
            value={form.city}
            handleChangeText={(e) => setForm({ ...form, city: e })}
            otherStyles='mt-3'
            // keyboardType='email-address'
          />

          <View className='flex flex-row w-full'>
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
              handlePress={() => {}}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup1;

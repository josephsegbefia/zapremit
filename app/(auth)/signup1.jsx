import { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Router, router, useNavigation } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import Logo from '../../components/Logo';

// import {login} from '../../lib/appwrite
const Signup2 = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextClick = () => {
    router.push('/signup2');
  };
  return (
    <SafeAreaView className='bg-primary-50 h-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View className='w-full justify-center px-4 my-6'>
            <Text className='text-2xl text-primary text-semibold mt-5 text-center font-semibold'>
              Sign up to zap
            </Text>
            <FormField
              title='First Name'
              value={form.firstName}
              handleChangeText={(e) => setForm({ ...form, firstName: e })}
              otherStyles='mt-3'
            />
            <FormField
              title='Last Name'
              value={form.lastName}
              handleChangeText={(e) => setForm({ ...form, lastName: e })}
              otherStyles='mt-3'
            />
            <FormField
              title='Email'
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles='mt-3'
              keyboardType='email-address'
            />

            <View style={{ flex: 1 }}>
              <Text className='text-base text-black-200 font-pmedium mt-3'>
                Date of Birth
              </Text>
              <TouchableOpacity
                className='border-2 border-primary-200 w-full h-16 px-4 bg-primary-50 rounded-xl focus:border-primary items-center flex-row mt-4'
                onPress={showDatePicker}
              >
                {Platform.OS === 'android' && (
                  <Text className='text-primary font-semibold text-base'>
                    {date.toLocaleDateString()}
                  </Text>
                )}
                {show && (
                  <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                    // style={{ width: '%' }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View className='flex flex-row w-full'>
              <CustomButton
                title='Back'
                containerStyles='w-[100px] mt-3 mr-3 bg-transparent border-primary-red flex-2'
                textStyles='text-primary-red'
                handlePress={() => navigation.goBack()}
              />
              <CustomButton
                title='Next'
                containerStyles='w-[100px] mt-3 flex-1'
                isLoading={isSubmitting}
                handlePress={handleNextClick}
              />
            </View>
            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-primary font-regular'>
                Have an account already?
              </Text>
              <Link
                href='/login'
                className='text-lg font-psemibold text-secondary-100'
              >
                Log In
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup2;

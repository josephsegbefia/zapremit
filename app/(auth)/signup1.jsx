import { useState, useContext } from 'react';

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
import { SignupContext } from '../../context/signup-context';

// import {login} from '../../lib/appwrite
const Signup1 = () => {
  const navigation = useNavigation();
  const { signupData, setSignupData } = useContext(SignupContext);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextClick = () => {
    // if (!form.firstName || !form.lastName || !form.email) {
    //   Alert.alert('Error', 'Check your inputs!');
    //   return;
    // }
    setSignupData({
      ...signupData,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
    });

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
          <View className='w-full justify-center px-4'>
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
          </View>
        </ScrollView>
        <View className='flex flex-row w-full px-4'>
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
        <View className='justify-center pt-5 flex-row gap-2 mb-3'>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup1;

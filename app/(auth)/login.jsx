import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Router, router, useNavigation } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import Logo from '../../components/Logo';

// import {login} from '../../lib/appwrite
const Login = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};
  return (
    <SafeAreaView className='bg-primary-50 h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[50vh] px-4 my-6'>
          <Logo styles='bg-primary-50 border-primary' color='#004d40' />
          <Text className='text-2xl text-primary text-semibold mt-5 text-center font-semibold'>
            Log in to zap
          </Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-3'
          />
          <View className='flex flex-row w-full'>
            <CustomButton
              title='Back'
              containerStyles='w-[100px] mt-3 mr-3 bg-transparent border-primary-red flex-2'
              textStyles='text-primary-red'
              handlePress={() => navigation.goBack()}
            />
            <CustomButton
              title='Log In'
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

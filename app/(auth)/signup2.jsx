import { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignupContext } from '../../context/signup-context';
import { Link, useNavigation, router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';

const Signup2 = () => {
  const { signupData, setSignupData } = useContext(SignupContext);
  const navigation = useNavigation();

  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    setSignupData({
      ...signupData,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
    router.replace('/signup3');
  };

  console.log(signupData);
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
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className='w-full justify-center px-4 mb-6 mt-3'>
            <FormField
              title='Password'
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles='mt-3'
            />
            <FormField
              title='Confirm Password'
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
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
            title='NEXT'
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

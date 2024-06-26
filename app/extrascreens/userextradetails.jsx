import { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import LoadingOverlay from '../../components/LoadingOverlay';
import DateField from '../../components/DateField';

const UserExtraDetails = () => {
  const { user, isLoading } = useGlobalContext();
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    // dob: '',
    street: '',
    hseNum: '',
    city: '',
    postcode: '',
  });

  console.log(dob);
  console.log(error);
  const submitHandler = () => {};

  if (isLoading) {
    <LoadingOverlay message='Loading...' />;
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
                otherStyles='mt-3 mb-10'
                placeholder='DD/MM/YYYY'
                setDob={setDob}
                dob={dob}
                setError={setError}
              />
              <CustomButton title='SUBMIT' handlePress={submitHandler} />
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

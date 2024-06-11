import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomCountryPhone from '../../components/CustomCountryPhone';
import FormField from '../../components/FormField';

const AddRecipient = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    callingCode: '',
    phone: '',
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className='h-full bg-primary-50'>
        {/* <CustomCountryPhone /> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          style={{ flex: 1 }}
        >
          <View className='w-[90%]'>
            <Text className='px-4 text-sm text-primary font-psemibold mb-4'>
              Recipient's contact information
            </Text>
          </View>

          <View className='flex-1 items-center'>
            <View className='w-[90%]'>
              <FormField title='First Name' otherStyles='mt-4' />
              <FormField title='Last Name' otherStyles='mt-4' />
              <FormField title='Email' otherStyles='mt-4' />
              {/* Replace this section with country selector - waiting for the website to behave well */}
              <Text className='text-base text-primary font-pmedium mt-4'>
                Phone Number
              </Text>
              <View className='flex flex-row gap-x-2.5'>
                <View className='w-[25%]'>
                  <FormField placeholder='+49' keyboardType='number-pad' />
                </View>
                <View className='w-[70%]'>
                  <FormField placeholder='15213111325' />
                </View>
              </View>
              {/* End of replacement */}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddRecipient;

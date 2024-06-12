import { useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import LoadingOverlay from '../../components/LoadingOverlay';

const EditRecipient = () => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
  });

  useEffect(() => {
    setForm({
      ...form,
      firstName: parsedItem.firstName,
      lastName: parsedItem.lastName,
      middleName: parsedItem.middleName,
      email: parsedItem.email,
    });
  }, []);

  console.log(parsedItem.$id);

  const submit = () => {
    setIsSubmitting(true);
  };

  if (isSubmitting) {
    return (
      <View>
        <LoadingOverlay message='Saving...' />
      </View>
    );
  }

  return (
    <SafeAreaView className='h-full bg-primary-50'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className='w-[90%]'>
              <Text className='px-4 text-sm text-primary font-psemibold mb-4'>
                Recipient's contact information
              </Text>
            </View>

            <View className='flex-1 items-center'>
              <View className='w-[90%]'>
                <FormField
                  title='First Name'
                  otherStyles='mt-4'
                  value={form.firstName}
                  handleChangeText={(e) => setForm({ ...form, firstName: e })}
                />
                <FormField
                  title='Middle Name'
                  otherStyles='mt-4'
                  value={form.middleName}
                  handleChangeText={(e) => setForm({ ...form, middleName: e })}
                />

                <FormField
                  title='Last Name'
                  otherStyles='mt-4'
                  value={form.lastName}
                  handleChangeText={(e) => setForm({ ...form, lastName: e })}
                />
                <FormField
                  title='Email'
                  otherStyles='mt-4'
                  value={form.email}
                  keyboardType='email-address'
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                />
                <Text className='text-base text-primary font-pmedium mt-4'>
                  Phone Number
                </Text>
                <View className='flex flex-row gap-x-2.5'>
                  <View className='w-[25%]'>
                    <FormField
                      placeholder='+49'
                      keyboardType='number-pad'
                      value={form.callingCode}
                      handleChangeText={(e) => setCode(e)}
                    />
                  </View>
                  <View className='w-[70%]'>
                    <FormField
                      placeholder='15213111325'
                      value={form.phone}
                      keyboardType='number-pad'
                      handleChangeText={(e) => setNumber(e)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View className='flex flex-row px-4 mt-5'>
        <CustomButton
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
        />
      </View>
    </SafeAreaView>
  );
};

export default EditRecipient;

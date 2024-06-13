import { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';
import LoadingOverlay from '../../components/LoadingOverlay';
import CountryCodePicker from '../../components/CountryCodePicker';

import { updateRecipient } from '../../lib/appwrite';
import { deleteRecipient } from '../../lib/appwrite';

const EditRecipient = () => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
  });

  const setPhoneNumber = (phone, code) => {
    setPhone(phone);
    setCode(code);
  };

  useEffect(() => {
    setForm({
      firstName: parsedItem.firstName,
      lastName: parsedItem.lastName,
      middleName: parsedItem.middleName,
      email: parsedItem.email,
    });
    setCode(parsedItem.callingCode);
    setPhone(parsedItem.phone);
  }, []);

  const submit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !code || !phone) {
      return Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);
    try {
      await updateRecipient({
        ...form,
        documentId: parsedItem.$id,
        code: code,
        phone: phone,
      });
      router.replace(`/recipients`);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log(error);
    } finally {
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        middleName: '',
      });
      setPhone: '';
      setCode: '';
      setIsSubmitting(false);
    }
  };

  const deleteHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteRecipient(parsedItem.$id);
      router.replace('/recipients');
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'Recipient could not be deleted. It is our fault. Retry again later'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <View>
        <LoadingOverlay message='Updating...' />
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
                Edit recipient's contact information
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
                <View className='mt-3'>
                  <CountryCodePicker
                    phone={phone}
                    code={code}
                    setPhone={setPhoneNumber}
                  />
                </View>
                <TouchableOpacity className='mt-5' onPress={deleteHandler}>
                  <Text className='text-primary-red font-psemibold'>
                    Delete this recipient
                  </Text>
                </TouchableOpacity>
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
          title='UPDATE'
          containerStyles='w-[100px] mt-3 flex-1'
          isLoading={isSubmitting}
          handlePress={submit}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditRecipient;

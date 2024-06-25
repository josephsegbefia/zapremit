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
import useAppwrite from '../../lib/useAppwrite';
import { getRecipientById } from '../../lib/appwrite';
import { updateRecipient } from '../../lib/appwrite';
import { deleteRecipient } from '../../lib/appwrite';

const EditRecipient = () => {
  const { user } = useGlobalContext();
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);

  // const [code, setCode] = useState('');

  const { data: recipient, isLoading } = useAppwrite(() =>
    getRecipientById(user.$id, parsedItem.$id)
  );

  const [countryCode, setCountryCode] = useState('');
  const [countryCallingCode, setCountryCallingCode] = useState('');
  // Not needed here but required in adding a recipient. Passed tp the country picker comp here to prevent the code from breaking
  const [country, setCountry] = useState();
  const [recipientPhone, setRecipientPhone] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
  });

  console.log(recipient);
  // const setPhoneNumber = (phone, code) => {
  //   setPhone(phone);
  //   setCode(code);
  // };

  useEffect(() => {
    setForm({
      firstName: recipient.firstName,
      lastName: recipient.lastName,
      middleName: recipient.middleName,
      email: recipient.email,
    });
    setCountryCode(recipient.code);
    setCountryCallingCode(recipient.callingCode);
    setRecipientPhone(recipient.phone);
  }, [recipient]);

  const submit = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !countryCode ||
      !recipientPhone
    ) {
      return Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);
    const data = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      middleName: form.middleName.trim(),
      email: form.email.trim(),
      phone: recipientPhone,
      country: country,
      code: countryCode,
      callingCode: countryCallingCode,
      completePhone: `${countryCallingCode}${recipientPhone}`,
      documentId: recipient.$id,
    };
    try {
      await updateRecipient(data);
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
      setCountryCode('');
      setCountryCallingCode('');
      setCountry('');
      setIsSubmitting(false);
    }

    console.log('DATA====>', data);
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

  if (isLoading) {
    return (
      <View>
        <LoadingOverlay message='Loading recipient data...' />
      </View>
    );
  }

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
            <View className='w-[95%]'>
              <Text className='px-4 text-sm text-primary font-psemibold mb-4'>
                Edit recipient's contact information
              </Text>
            </View>

            <View className='flex-1 items-center'>
              <View className='w-[95%]'>
                <FormField
                  title='First Name'
                  otherStyles='mt-4'
                  value={form.firstName}
                  handleChangeText={(e) => setForm({ ...form, firstName: e })}
                  autoComplete={false}
                  autoCorrect={false}
                  autoCapitalize={false}
                />
                <FormField
                  title='Middle Name'
                  otherStyles='mt-4'
                  value={form.middleName}
                  handleChangeText={(e) => setForm({ ...form, middleName: e })}
                  autoComplete={false}
                  autoCorrect={false}
                  autoCapitalize={false}
                />

                <FormField
                  title='Last Name'
                  otherStyles='mt-4'
                  value={form.lastName}
                  handleChangeText={(e) => setForm({ ...form, lastName: e })}
                  autoComplete={false}
                  autoCorrect={false}
                  autoCapitalize={false}
                />
                <FormField
                  title='Email'
                  otherStyles='mt-4'
                  value={form.email}
                  keyboardType='email-address'
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                  autoComplete={false}
                  autoCorrect={false}
                  autoCapitalize={false}
                />
                <View className='mt-3'>
                  <CountryCodePicker
                    isEditing
                    countryCode={countryCode}
                    countryCallingCode={countryCallingCode}
                    setCountry={setCountry}
                    setCountryCode={setCountryCode}
                    setCountryCallingCode={setCountryCallingCode}
                    recipientPhone={recipientPhone}
                    setRecipientPhone={setRecipientPhone}
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

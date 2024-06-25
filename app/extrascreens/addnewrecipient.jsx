import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryCodePicker from '../../components/CountryCodePicker';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useCountryPickerContext } from '../../context/country-picker-context';
import { createRecipient } from '../../lib/appwrite';
import LoadingOverlay from '../../components/LoadingOverlay';
import { router } from 'expo-router';

const AddNewRecipient = () => {
  const navigation = useNavigation();
  const { user, transferData, setTransferData } = useGlobalContext();
  const { countryData, setCountryData } = useCountryPickerContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [country, setCountry] = useState('');
  // const [countryCode, setCountryCode] = useState('');
  // const [recipientPhone, setRecipientPhone] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
  });

  // useEffect(() => {
  //   setRecipientPhone(countryData.completePhone);
  //   setCountryCode(countryData.code);
  // }, [code, completePhone]);

  const submit = async () => {
    const code = countryData.code.trim();
    const completePhone = countryData.completePhone.trim();
    const phone = countryData.phone.trim();
    const recipientCountry = countryData.name.trim();

    const data = {
      firstName: form.firstName.trim(),
      middleName: form.middleName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      code: code,
      completePhone: completePhone,
      phone: phone,
      country: recipientCountry,
      userId: user.$id,
    };
    if (!form.firstName || !form.lastName || !form.email || !phone) {
      return Alert.alert('Error', 'Please fill in all the fields');
    }

    console.log(data);
    setIsSubmitting(true);
    try {
      const newRecipient = await createRecipient(data);

      if (transferData.identifier === 'add-new-recipient') {
        try {
          setTransferData((prev) => ({
            ...prev,
            recipientId: newRecipient.$id,
            recipientFirstName: newRecipient.firstName,
            recipientMiddleName: newRecipient?.middleName,
            recipientLastName: newRecipient.lastName,
            recipientPhone: newRecipient.phone,
          }));
        } catch (error) {
          console.log('Could not create recipient', error);
        } finally {
          setTransferData((prev) => ({
            ...prev,
            identifier: '',
          }));
        }
        router.replace('/send');
        return;
      }
      router.replace('/recipients');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        middleName: '',
      });
      setCountryData({
        callingCode: '',
        code: '',
        name: '',
        phone: '',
        flag: '',
        completePhone: '',
      });
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <View>
        <LoadingOverlay message='Creating recipient...' />
      </View>
    );
  }

  // const setPhoneNumber = (phone, code) => {
  //   setPhone(phone);
  //   setCode(code);
  // };

  return (
    <SafeAreaView className='h-full bg-primary-50'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback>
          <ScrollView className=''>
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
                  autoComplete={false}
                  autoCapitalize={false}
                  autoCorrect={false}
                />
                <FormField
                  title='Middle Name'
                  otherStyles='mt-4'
                  value={form.middleName}
                  handleChangeText={(e) => setForm({ ...form, middleName: e })}
                  autoComplete={false}
                  autoCapitalize={false}
                  autoCorrect={false}
                />

                <FormField
                  title='Last Name'
                  otherStyles='mt-4'
                  value={form.lastName}
                  handleChangeText={(e) => setForm({ ...form, lastName: e })}
                  autoComplete={false}
                  autoCapitalize={false}
                  autoCorrect={false}
                />
                <FormField
                  title='Email'
                  otherStyles='mt-4'
                  value={form.email}
                  keyboardType='email-address'
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                  autoComplete={false}
                  autoCapitalize={false}
                  autoCorrect={false}
                />

                <View className='mt-3'>
                  <CountryCodePicker setCountry={setCountry} />
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

export default AddNewRecipient;

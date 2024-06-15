import { useState } from 'react';
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
import { createRecipient } from '../../lib/appwrite';
import LoadingOverlay from '../../components/LoadingOverlay';

const AddNewRecipient = () => {
  const navigation = useNavigation();
  const { user, transferData, setTransferData } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
  });

  const submit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !code || !phone) {
      return Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);
    try {
      const newRecipient = await createRecipient({
        ...form,
        userId: user.$id,
        phone,
        code,
      });

      console.log('New Recipient:', newRecipient);

      setTransferData((prev) => ({
        ...prev,
        recipientFirstName: newRecipient.firstName,
        recipientMiddleName: newRecipient?.middleName,
        recipientLastName: newRecipient.lastName,
        recipientPhone: newRecipient.phone,
      }));

      console.log('Updated Transfer Data:', transferData);

      if (transferData.identifier === 'add-new-recipient') {
        setTransferData((prev) => ({
          ...prev,
          identifier: '',
        }));
        navigation.replace('extrascreens/sendto');
        return;
      }

      navigation.replace('recipients');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        middleName: '',
      });
      setPhone('');
      setCode('');
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

  const setPhoneNumber = (phone, code) => {
    setPhone(phone);
    setCode(code);
  };

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

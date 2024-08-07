import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('USER====>', user);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
  });

  const submit = async () => {
    const code = user.destinationCountryCode;
    const phone = form.phone;
    const callingCode = user.destinationCountryCallingCode;
    const completePhone = callingCode + phone;
    const recipientCountry = user.destinationCountry;
    const currencyCode = user.destinationCountryCurrencyCode;
    const currencyName = user.destinationCountryCurrencyName;
    const flag = user.destinationCountryFlag;
    const currencySymbol = user.destinationCountryCurrencySymbol;

    const data = {
      firstName: form.firstName.trim(),
      middleName: form.middleName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      code: code,
      callingCode: callingCode,
      completePhone: completePhone,
      phone: phone,
      flag: flag,
      country: recipientCountry,
      currencyCode: currencyCode,
      currencyName: currencyName,
      currencySymbol: currencySymbol,
      userId: user.$id,
    };
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      return Alert.alert('Error', 'Please fill in all the fields');
    }

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

  return (
    <SafeAreaView className='h-full bg-primary-50'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback>
          <ScrollView className=''>
            <View className='w-[95%]'>
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
                  <Text className='text-base text-primary font-pmedium mb-2'>
                    Phone
                  </Text>
                  <View className='flex-row gap-1'>
                    <View className='w-[27%]'>
                      <FormField
                        value={user?.destinationCountryCallingCode}
                        editable={false}
                      />
                    </View>
                    <View className='w-[71%]'>
                      <FormField
                        value={form.phone}
                        handleChangeText={(e) => setForm({ ...form, phone: e })}
                        autoComplete={false}
                        autoCapitalize={false}
                        autoCorrect={false}
                      />
                    </View>
                  </View>
                  {/* <CountryCodePicker
                    setCountryInfo={setCountryInfo}
                    countryInfo={countryInfo}
                  /> */}
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

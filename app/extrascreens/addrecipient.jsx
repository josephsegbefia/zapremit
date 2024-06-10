import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';

const AddRecipient = () => {
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  return (
    <SafeAreaView className='bg-primary-50 h-full px-6'>
      <ScrollView>
        <Text className='mt-10 text-primary text-2xl font-pbold'>
          Add Recipient
        </Text>
        <View className='mt-5'>
          <FormField
            title='First Name'
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles='mt-7'
          />
          <FormField
            title='Middle Name'
            value={form.middleName}
            handleChangeText={(e) => setForm({ ...form, middleName: e })}
            otherStyles='mt-3'
          />
          <FormField
            title='Last Name'
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles='mt-3'
          />
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-3'
            keyboardType='email-address'
          />
          <FormField
            title='Phone Number'
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            otherStyles='mt-3'
            keyboardType='phone-pad'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRecipient;

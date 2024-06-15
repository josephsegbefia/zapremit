import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import RecipientSelectOption from '../../components/RecipientSelectOption';
import React from 'react';

const SendTo = () => {
  const { transferData, setTransferData } = useGlobalContext();
  console.log(transferData);
  const navigation = useNavigation();
  return (
    <ScrollView className='bg-full bg-primary-50'>
      <SafeAreaView className='pb-10'>
        <View>
          <View className='items-center'>
            <RecipientSelectOption
              icon={<Ionicons name='person-add' size={30} color='white' />}
              title='Add New Recipient'
              handlePress={() => {}}
            />

            <RecipientSelectOption
              icon={<AntDesign name='contacts' size={30} color='white' />}
              title='Import Contacts'
              handlePress={() => {}}
            />

            <RecipientSelectOption
              icon={<AntDesign name='contacts' size={30} color='white' />}
              title='Select Existing Recipient'
              handlePress={() => navigation.navigate('recipients')}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SendTo;

{
  /* <View className='w-[95%] items-center'>
  <View className='flex-row w-full'>
    <View className='border border-primary w-[50px] h-[50px] justify-center items-center '>
      <Ionicons name='person-add' size={24} color='#004d40' />
    </View>
  </View>
</View>; */
}

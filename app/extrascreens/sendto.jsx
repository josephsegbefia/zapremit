import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import React from 'react';

const SendTo = () => {
  const { recipientFirstName, recipientLastName, recipientPhone } =
    useLocalSearchParams();

  console.log(recipientFirstName, recipientLastName, recipientPhone);
  const navigation = useNavigation();
  return (
    <ScrollView className='bg-full bg-primary-50'>
      <SafeAreaView className='pb-10'>
        <View>
          <View className='items-center'>
            <TouchableOpacity
              className='bg-white rounded-xl w-[95%] py-3 flex-row px-4 mb-4'
              activeOpacity={0.5}
            >
              <View className='bg-primary-200 justify-center items-center h-[50px] w-[50px] rounded-lg'>
                <Ionicons name='person-add' size={30} color='white' />
              </View>
              <View className='justify-center items-center px-8'>
                <Text className='text-primary font-psemibold text-base'>
                  Add new recipient
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className='bg-white rounded-xl w-[95%] py-3 flex-row px-4 mb-4'
              activeOpacity={0.5}
            >
              <View className='bg-primary-200 justify-center items-center h-[50px] w-[50px] rounded-lg'>
                <AntDesign name='contacts' size={30} color='white' />
              </View>
              <View className='justify-center items-center px-8'>
                <Text className='text-primary font-psemibold text-base'>
                  Import contacts
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className='bg-white rounded-xl w-[95%] py-3 flex-row px-4 '
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('recipients', {
                  identifier: 'select-recipient',
                })
              }
            >
              <View className='bg-primary-200 justify-center items-center h-[50px] w-[50px] rounded-lg'>
                <AntDesign name='contacts' size={30} color='white' />
              </View>
              <View className='justify-center items-center px-8'>
                <Text className='text-primary font-psemibold text-base'>
                  Select from exisiting recipients
                </Text>
              </View>
            </TouchableOpacity>
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

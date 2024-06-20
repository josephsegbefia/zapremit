import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';

const Account = () => {
  const { user } = useGlobalContext();

  const initials =
    user.firstName.charAt(0).toUpperCase() +
    user.lastName.charAt(0).toUpperCase();

  let fullName;
  if (user.middleName) {
    fullName =
      user.firstName.trim() +
      ' ' +
      user.middleName.trim() +
      ' ' +
      user.lastName.trim();
  } else {
    fullName = user.firstName.trim() + ' ' + user.lastName.trim();
  }

  const accountItems = [
    {
      title: 'Profile',
      icon: <AntDesign name='user' size={24} color='#004d40' />,
      onClick: () => {},
    },
    {
      title: 'Settings',
      icon: <AntDesign name='setting' size={24} color='#004d40' />,
      onClick: () => {},
    },
    {
      title: 'Payment Methods',
      icon: <AntDesign name='creditcard' size={24} color='#004d40' />,
      onClick: () => {},
    },
    {
      title: 'Support',
      icon: <MaterialIcons name='support-agent' size={24} color='#004d40' />,
      onClick: () => {},
    },
    {
      title: 'About',
      icon: <AntDesign name='infocirlceo' size={24} color='black' />,
      onClick: () => {},
    },
  ];

  return (
    <SafeAreaView className='h-full bg-primary-50'>
      <ScrollView>
        <View className='items-center'>
          <View className='border-2 border-primary justify-center items-center rounded-full w-[100px] h-[100px] mt-10'>
            <Text className='text-primary font-pbold text-3xl'>{initials}</Text>
          </View>
          <Text className='mt-6 font-psemibold text-xl text-primary'>
            {fullName}
          </Text>
          <Text className='text-primary text-pregular mt-1'>{user.email}</Text>
        </View>
        <View className='items-center'>
          <View className='mt-6 w-[90%]'>
            {accountItems.map((item) => (
              <TouchableOpacity className='flex-row justify-between bg-white py-4 my-2 rounded-xl px-2'>
                <View className='flex-row'>
                  <View className='mr-4'>{item.icon}</View>
                  <View className='justify-center'>
                    <Text className='text-primary font-psemibold'>
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View className='justify-center'>
                  <AntDesign name='caretright' size={11} color='#004d40' />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

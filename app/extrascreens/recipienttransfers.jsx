import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecipientTransfers = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);

  let fullName;
  if (parsedItem.middleName) {
    fullName =
      parsedItem.firstName + parsedItem.middleName + parsedItem.lastName;
  } else {
    fullName = parsedItem.firstName + ' ' + parsedItem.lastName;
  }

  const initials =
    parsedItem.firstName.charAt(0) + parsedItem.lastName.charAt(0);

  return (
    <SafeAreaView className='bg-primary-50 h-full'>
      <View>
        <Text>{fullName}</Text>
      </View>
    </SafeAreaView>
  );
};

export default RecipientTransfers;

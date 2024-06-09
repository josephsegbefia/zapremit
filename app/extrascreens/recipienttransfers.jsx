import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const RecipientTransfers = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);

  console.log(parsedItem);

  return (
    <View>
      <Text>RecipientTransfers</Text>
    </View>
  );
};

export default RecipientTransfers;

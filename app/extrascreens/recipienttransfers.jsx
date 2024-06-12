import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRecipientTransfers } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import CustomCard from '../../components/CustomCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmptyState from '../../components/EmptyState';

const RecipientTransfers = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);

  const { data: transfers } = useAppwrite(() =>
    getRecipientTransfers(parsedItem.$id)
  );

  let fullName;
  if (parsedItem.middleName) {
    fullName =
      parsedItem.firstName + parsedItem.middleName + parsedItem.lastName;
  } else {
    fullName = parsedItem.firstName + ' ' + parsedItem.lastName;
  }

  const initials =
    parsedItem.firstName.charAt(0) + parsedItem.lastName.charAt(0);

  const editPressHandler = () => {
    router.push({
      pathname: '/extrascreens/editrecipient',
      params: { item: item },
    });
  };

  return (
    <SafeAreaView className='bg-primary-50 h-full'>
      <FlatList
        data={transfers}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CustomCard
            firstName={parsedItem.firstName}
            lastName={parsedItem.lastName}
            amount={item.amount}
            status={item.status}
            date={item.date}
            isTransferHistory
          />
        )}
        ListHeaderComponent={() => (
          <View className='flex flex-row justify-between'>
            <View>
              <CustomCard
                firstName={parsedItem.firstName}
                middleName={parsedItem.middleName}
                lastName={parsedItem.lastName}
                customStyles='bg-primary-50'
              />
            </View>
            <View className='mt-9 px-4'>
              <TouchableOpacity onPress={editPressHandler}>
                <MaterialCommunityIcons
                  name='account-edit'
                  size={25}
                  color='#004d40'
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        stickyHeaderIndices={[0]}
        ListHeaderComponentStyle={styles.header}
        ListEmptyComponent={() => (
          <EmptyState
            title={`No transfers made to ${parsedItem.firstName} yet!`}
            subtitle={`Transfers to ${parsedItem.firstName} would appear here`}
            buttonLabel={`Send money to ${parsedItem.firstName}`}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default RecipientTransfers;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e0f2f1',
  },
});

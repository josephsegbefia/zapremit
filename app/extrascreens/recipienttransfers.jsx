import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRecipientTransfers } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import CustomCard from '../../components/CustomCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmptyState from '../../components/EmptyState';
import formatDate from '../../lib/formatDate';
import CustomButton from '../../components/CustomButton';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useGlobalContext } from '../../context/GlobalProvider';

const { width } = Dimensions.get('window');

const RecipientTransfers = () => {
  const navigation = useNavigation();
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);

  const { transferData, setTransferData } = useGlobalContext();
  const { data: transfers, isLoading: isLoading } = useAppwrite(() =>
    getRecipientTransfers(parsedItem.$id)
  );

  let smallScreen = 360;
  let isSmallScreen = width <= smallScreen;
  let pageWidth;

  if (isSmallScreen) {
    pageWidth = width * 0.5;
  }

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

  const sendMoneyToRecipient = (item) => {
    setTransferData((prev) => ({
      ...prev,
      recipientId: parsedItem.$id,
      recipientFirstName: item.firstName,
      recipientLastName: item.lastName,
      recipientPhone: item.phone,
      identifier: 'from-recipient-transfer-screen',
    }));
    navigation.navigate('send');
  };

  if (isLoading) {
    return <LoadingOverlay message='Loading...' />;
  }

  return (
    <SafeAreaView className='bg-primary-50 h-full w-full'>
      <FlatList
        data={transfers}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className='items-center'>
            <View className='w-[95%]'>
              <CustomCard
                firstName={parsedItem.firstName}
                lastName={parsedItem.lastName}
                amount={item.receivableAmount}
                status={item.status}
                date={formatDate(item.$createdAt)}
                isTransferHistory
              />
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='flex-row justify-between mb-5'>
            <View>
              <CustomCard
                firstName={parsedItem.firstName}
                middleName={parsedItem.middleName}
                lastName={parsedItem.lastName}
                customStyles='bg-primary-50'
              />
            </View>
            <View className='mt-9 px-5'>
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
            handlePress={() => sendMoneyToRecipient(parsedItem)}
          />
        )}
      />
      {transfers.length !== 0 && (
        <View className='items-center'>
          <View className='w-[95%] mb-4'>
            <CustomButton
              title={`Send ${parsedItem.firstName} money again!`}
              handlePress={() => sendMoneyToRecipient(parsedItem)}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RecipientTransfers;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e0f2f1',
  },
});

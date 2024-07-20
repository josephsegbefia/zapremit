import { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EmptyState from '../../components/EmptyState';
import CustomCard from '../../components/CustomCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import useAppwrite from '../../lib/useAppwrite';
import { getTransfers } from '../../lib/appwrite';
import LoadingOverlay from '../../components/LoadingOverlay';
import formatDate from '../../lib/formatDate';
import { useNavigation } from 'expo-router';
import FormField from '../../components/FormField';

const Transfers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredTransfers, setFilteredTransfers] = useState([]);
  const { user } = useGlobalContext();
  const { data: transfers, isLoading: isLoading } = useAppwrite(() =>
    getTransfers(user.$id)
  );

  const navigation = useNavigation();

  useEffect(() => {
    if (transfers) {
      setFilteredTransfers(
        transfers.filter((transfer) =>
          transfer.recipient.firstName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, transfers]);

  const renderItem = useCallback(
    ({ item }) => (
      <View className='w-full items-center'>
        <View className='w-[95%]'>
          <TouchableOpacity onPress={() => {}} activeOpacity={0.3}>
            <CustomCard
              firstName={item.recipient.firstName}
              lastName={item.recipient.lastName}
              date={formatDate(item.$createdAt)}
              status={item.status}
              amount={item.receivableAmount}
              isTransferHistory
              currencyCode={item.transferCurrencyCode}
            />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [navigation]
  );

  if (isLoading) {
    return <LoadingOverlay message='Loading...' />;
  }

  return (
    <SafeAreaView className='h-full bg-primary-50 flex-1'>
      <View className='my-3 px-4'>
        <View className='justify-between items-start flex-row mb-2'>
          <View>
            <Text className='mt-10 text-primary text-2xl font-pbold'>
              Transfers
            </Text>
          </View>
        </View>
        <View>
          <FormField
            placeholder='Search transfers by recipient first name'
            value={searchValue}
            handleChangeText={(e) => setSearchValue(e)}
          />
        </View>
      </View>
      <FlatList
        data={filteredTransfers}
        keyExtractor={(item) => item.$id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState
            title='No transfers found'
            subtitle='Your transfers will appear here'
            buttonLabel='Send Money Now'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Transfers;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e0f2f1',
  },
});

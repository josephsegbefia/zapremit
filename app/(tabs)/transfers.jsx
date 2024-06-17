import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import EmptyState from '../../components/EmptyState';
import CustomCard from '../../components/CustomCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import useAppwrite from '../../lib/useAppwrite';
import { getTransfers } from '../../lib/appwrite';
import LoadingOverlay from '../../components/LoadingOverlay';
import formatDate from '../../lib/formatDate';

const Transfers = () => {
  const { user } = useGlobalContext();
  const { data: transfers, isLoading: isLoading } = useAppwrite(() =>
    getTransfers(user.$id)
  );

  if (isLoading) {
    return <LoadingOverlay message='Loading...' />;
  }

  return (
    <SafeAreaView className='h-full bg-primary-50 flex-1'>
      <FlatList
        data={transfers}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className='w-full items-center'>
            <View className='mt-2 w-[95%]'>
              <CustomCard
                firstName={item.recipient.firstName}
                lastName={item.recipient.lastName}
                date={formatDate(item.$createdAt)}
                status={item.status}
                amount={item.receivableAmount}
                isTransferHistory
              />
            </View>
          </View>
        )}
        stickyHeaderIndices={[0]}
        ListHeaderComponentStyle={styles.header}
        ListHeaderComponent={() => (
          <View className='my-3 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='mt-10 text-primary text-2xl font-pbold'>
                  Transfers
                </Text>
              </View>
            </View>
          </View>
        )}
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

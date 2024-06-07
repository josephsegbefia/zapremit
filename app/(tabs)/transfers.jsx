import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList } from 'react-native';
import EmptyState from '../../components/EmptyState';
import CustomCard from '../../components/CustomCard';

const Transfers = () => {
  return (
    <SafeAreaView className='h-full bg-primary-50 items-center'>
      <FlatList
        data={
          [
            // {
            //   firstName: 'Joseph',
            //   lastName: 'Segbefia',
            //   date: '20th May, 2024',
            //   amount: '3020.78 GHS',
            //   status: 'falied',
            // },
          ]
        }
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CustomCard
            firstName={item.firstName}
            lastName={item.lastName}
            date={item.date}
            status={item.status}
            amount={item.amount}
            isTransferHistory
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-primary'>
                  Hello,
                </Text>
                <Text className='text-2xl font-psemibold text-primary'>
                  Joseph
                </Text>
                <Text className='text-sm text-primary'>
                  Have a look at all your transfers
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='You have not made any transfers yet'
            subtitle='Your transfers will appear here'
            buttonLabel='Send Money Now'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Transfers;

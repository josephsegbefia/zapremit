import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList } from 'react-native';
import EmptyState from '../../components/EmptyState';
import CustomCard from '../../components/CustomCard';

const Transfers = () => {
  return (
    <SafeAreaView className='h-full bg-primary-50 flex-1'>
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
            // {
            //   firstName: 'Joseph',
            //   lastName: 'Segbefia',
            //   date: '20th May, 2024',
            //   amount: '3020.78 GHS',
            //   status: 'falied',
            // },
            // {
            //   firstName: 'Joseph',
            //   lastName: 'Segbefia',
            //   date: '20th May, 2024',
            //   amount: '3020.78 GHS',
            //   status: 'falied',
            // },
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
          <View className='w-full items-center'>
            <View className='mt-2 w-[95%]'>
              <CustomCard
                firstName={item.firstName}
                lastName={item.lastName}
                date={item.date}
                status={item.status}
                amount={item.amount}
                isTransferHistory
              />
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='my-3 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                {/* <Text className='font-pmedium text-sm text-primary'>
                  Hello,
                </Text>
                <Text className='text-xl font-pbold text-primary'>Joseph</Text>
                <Text className='text-sm text-primary font-psemibold'>
                  Have a look at all your transfers
                </Text> */}
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

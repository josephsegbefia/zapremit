import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList } from 'react-native';
import EmptyState from '../../components/EmptyState';
import CustomCard from '../../components/CustomCard';

const Recipients = () => {
  return (
    <SafeAreaView className='h-full bg-primary-50 flex-1'>
      <FlatList
        data={
          [
            // {
            //   firstName: 'Joseph',
            //   lastName: 'Segbefia',
            // },
            // {
            //   firstName: 'Joseph',
            //   lastName: 'Segbefia',
            // },
            // {
            //   firstName: 'Joseph',
            //   lastName: 'Segbefia',
            // },
          ]
        }
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className='w-full items-center'>
            <View className='w-[95%]'>
              <CustomCard firstName={item.firstName} lastName={item.lastName} />
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='my-3 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-1'>
              <View>
                <Text className='font-pmedium text-sm text-primary'>
                  Hello,
                </Text>
                <Text className='text-xl font-pbold text-primary'>Joseph</Text>
                <Text className='text-sm text-primary font-psemibold'>
                  Have a look at all your recipients
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No recipients found'
            subtitle='Your transfers will appear here'
            buttonLabel='Add recipient'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Recipients;

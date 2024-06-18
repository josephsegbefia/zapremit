import { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import useAppwrite from '../../lib/useAppwrite';
import { getRecipients } from '../../lib/appwrite';
import EmptyState from '../../components/EmptyState';
import CustomCard from '../../components/CustomCard';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import LoadingOverlay from '../../components/LoadingOverlay';

const Recipients = () => {
  const navigation = useNavigation();

  const { user, transferData, setTransferData } = useGlobalContext();
  const { data: recipients, isLoading: isLoading } = useAppwrite(() =>
    getRecipients(user.$id)
  );

  if (isLoading) {
    return (
      <View>
        <LoadingOverlay message='Loading...' />
      </View>
    );
  }

  const handleRecipientPress = () => {};

  return (
    <>
      <SafeAreaView className='h-full bg-primary-50 flex-1'>
        <FlatList
          data={recipients}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View className='w-full items-center'>
              <View className='w-[95%]'>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      transferData.identifier === 'select-exisiting-recipient'
                    ) {
                      setTransferData({
                        ...transferData,
                        recipientId: item.$id,
                        recipientFirstName: item.firstName,
                        recipientLastName: item.lastName,
                        recipientMiddleName: item.middleName,
                        recipientPhone: item.phone,
                        identifier: '',
                      });
                      navigation.navigate('send');
                      return;
                    }
                    router.push({
                      pathname: '/extrascreens/recipienttransfers',
                      params: { item: JSON.stringify(item) },
                    });
                  }}
                  activeOpacity={0.3}
                >
                  <CustomCard
                    firstName={item.firstName}
                    middleName={item?.middleName}
                    lastName={item.lastName}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className='my-3 px-4 space-y-6'>
              <View className='justify-between items-start flex-row mb-1'>
                <View>
                  <Text className='mt-10 text-primary text-2xl font-pbold'>
                    Recipients
                  </Text>
                </View>
                <View className='mt-11'>
                  <TouchableOpacity
                    onPress={() => router.push('/extrascreens/addnewrecipient')}
                  >
                    <Ionicons name='person-add' size={24} color='#004d40' />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          stickyHeaderIndices={[0]}
          ListHeaderComponentStyle={styles.header}
          ListEmptyComponent={() => (
            <EmptyState
              title='No recipients found'
              subtitle='Your transfers will appear here'
              buttonLabel='Add recipient'
              handlePress={() => router.push('/extrascreens/addnewrecipient')}
            />
          )}
        />
        {transferData.identifier === 'select-exisiting-recipient' ? (
          <View className='items-center'>
            <View className='w-[95%]'>
              <CustomButton
                title='BACK'
                handlePress={() => {
                  setTransferData({
                    ...transferData,
                    identifier: '',
                  });
                  navigation.navigate('extrascreens/sendto');
                }}
              />
            </View>
          </View>
        ) : (
          ''
        )}
      </SafeAreaView>
    </>
  );
};

export default Recipients;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e0f2f1',
  },
});

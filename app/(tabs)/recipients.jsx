import { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import useAppwrite from '../../lib/useAppwrite';
import { getRecipients } from '../../lib/appwrite';
import EmptyState from '../../components/EmptyState';
import CustomCard from '../../components/CustomCard';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import { StatusBar } from 'expo-status-bar';

const Recipients = () => {
  const { user, setUser } = useGlobalContext();

  const { data: recipients } = useAppwrite(() => getRecipients(user.$id));

  console.log(recipients);
  return (
    <>
      <StatusBar color='#004d40' />
      <SafeAreaView className='h-full bg-primary-50 flex-1'>
        <FlatList
          data={recipients}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View className='w-full items-center'>
              <View className='w-[95%]'>
                <TouchableOpacity onPress={() => {}} activeOpacity={0.3}>
                  <CustomCard
                    firstName={item.firstName}
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
                  <Ionicons name='person-add' size={24} color='black' />
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
            />
          )}
        />
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

import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

const Settings = () => {
  return (
    <SafeAreaView className='h-full bg-primary-50'>
      <View className='my-3 px-4 space-y-6'>
        <View className='justify-between items-start flex-row mb-1'>
          <Text className='mt-10 text-primary text-2xl font-pbold'>
            Settings
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

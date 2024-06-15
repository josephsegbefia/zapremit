import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const RecipientSelectOption = ({ icon, title, handlePress }) => {
  return (
    <TouchableOpacity
      className='bg-white rounded-xl w-[95%] py-3 flex-row px-4 mb-4'
      activeOpacity={0.5}
      onPress={handlePress}
    >
      <View className='bg-primary-200 justify-center items-center h-[50px] w-[50px] rounded-lg'>
        {/* <Ionicons name='person-add' size={30} color='white' /> */}
        {icon}
      </View>
      <View className='justify-center items-center px-8'>
        <Text className='text-primary font-psemibold text-base'>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecipientSelectOption;

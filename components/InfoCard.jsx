import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoCard = ({ title, info }) => {
  return (
    <View className='flex-row px-4'>
      <Ionicons
        name='information-circle-outline'
        size={24}
        color='#004d40'
        // style={{ fontWeight: 'bold' }}
      />
      <View className='justify-center mb-4'>
        <View className='w-full'>
          <Text className='px-2 font-psemibold'>{title}</Text>
          <Text className='text-xs mt-3 text-justify'>
            {/* Please make sure the recipient has a registered mobile money account
            number with the provider. A wrong number may lead to a delay in your
            transfer. */}
            {info}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InfoCard;

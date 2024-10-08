import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoCard = ({ title, info, styles }) => {
  return (
    <View className={`flex-row ${styles}`}>
      <Ionicons
        name='information-circle-outline'
        size={24}
        color='#004d40'
        // style={{ fontWeight: 'bold' }}
      />
      <View className='justify-center mb-4'>
        <View className='w-full'>
          <Text className='px-2 font-psemibold text-primary'>{title}</Text>
          <Text className='text-xs mt-3 text-left'>
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

import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { images } from '../constants';
import CustomButton from './CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

const EmptyState = ({ title, subtitle, buttonLabel, handlePress }) => {
  const { transferData } = useGlobalContext();
  return (
    <View className='justify-center items-center px-4'>
      <Image
        source={images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      />
      <Text className='text-xl text-center font-psemibold text-primary mt-2 mb-5'>
        {title}
      </Text>
      <Text className='font-pmedium text-sm text-primary-500 mb-20'>
        {subtitle}
      </Text>
      {!transferData.identifier === 'select-existing-recipient' && (
        <CustomButton
          title={buttonLabel}
          containerStyles='w-full my-5'
          handlePress={handlePress}
        />
      )}
    </View>
  );
};

export default EmptyState;

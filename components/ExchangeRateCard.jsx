import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import CountryFlag from 'react-native-country-flag';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from './CustomButton';

const ExchangeRateCard = ({ title, hostCountryId, recipientCountryId }) => {
  return (
    <View className='bg-white rounded-xl'>
      <Text className='text-center text-primary font-psemibold text-sm py-5'>
        {title}
      </Text>
      <View className='flex-row justify-around'>
        <View>
          <CountryFlag
            isoCode={hostCountryId}
            size={50}
            className='rounded-full w-[50px] h-[50px]'
          />
          <Text className='text-center mt-3 text-primary font-pbold'>
            1.00 EUR
          </Text>
        </View>
        <View className='mt-5'>
          <FontAwesome name='exchange' color='#004d40' size={30} />
        </View>
        <View>
          <CountryFlag
            isoCode={recipientCountryId}
            size={50}
            className='rounded-full w-[50px] h-[50px]'
          />
          <Text className='text-center mt-3 text-primary font-pbold'>
            17.00 GHS
          </Text>
        </View>
      </View>
      <View className='items-center py-5'>
        {/* <TouchableOpacity
          onPress={() => router.replace('/send')}
          activeOpacity={0.3}
          className='bg-primary-200 border-none rounded-full justify-center items-center w-[80%] py-1'
        >
          <Text className='text-primary text-xl font-psemibold'>Send</Text>
        </TouchableOpacity> */}
        <CustomButton
          title='Send Now'
          containerStyles='w-[80%]'
          handlePress={() => router.push('/send')}
          // handlePress={() => router.push('extrascreens/addrecipient')}
        />
      </View>
    </View>
  );
};

export default ExchangeRateCard;

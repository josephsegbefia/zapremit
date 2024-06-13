import { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryFlag from 'react-native-country-flag';
import { FontAwesome } from '@expo/vector-icons';

const Send = () => {
  const [transferAmt, setTransferAmt] = useState('100');
  const [amtReceivable, setAmtReceivable] = useState('');
  return (
    <ScrollView className='h-full bg-primary-50'>
      <SafeAreaView className='justify-center'>
        <Text className='text-xl text-primary font-psemibold px-4 mt-10'>
          Send
        </Text>

        <View className='items-center'>
          <View className='bg-white rounded-xl mt-8 w-[95%] px-5 py-7'>
            <View className='border border-primary-200 w-full h-20 px-4 bg-white rounded-xl focus:border-primary items-center justify-between flex-row mb-5'>
              <View className='bg-primary-50 px-5 py-5 rounded-lg flex-row'>
                <CountryFlag
                  isoCode='de'
                  size={40}
                  className='w-[40px] h-[25px]'
                />
                <View className='justify-center'>
                  <Text className='text-primary font-psemibold px-4'>EUR</Text>
                </View>
              </View>
              <View className='px-5'>
                <View className='justify-center pt-1'>
                  <Text className='text-primary font-pregular'>You send</Text>
                </View>
                <TextInput
                  // keyboardType={keyboardType}
                  className='flex-1 text-primary font-semibold text-2xl text-center'
                  value={transferAmt}
                  // placeholder={placeholder}
                  placeholderTextColor='#7b7b8b'
                  onChangeText={(e) => setTransferAmt(e)}
                />
              </View>
            </View>
            <View className='items-center'>
              <View className='flex flex-row w-[70%] p-1 justify-around rounded-lg'>
                <Text className='text-sm font-psemibold'>1 EUR </Text>
                <FontAwesome name='bolt' size={20} color='#004d40' />
                <Text className='text-sm font-psemibold'>14.50 GHS </Text>
              </View>
            </View>

            <View className='border border-primary-200 w-full h-20 px-4 bg-white rounded-xl focus:border-primary items-center justify-between flex-row mt-5'>
              <View className='bg-primary-50 px-5 py-5 rounded-lg flex-row'>
                <CountryFlag
                  isoCode='de'
                  size={40}
                  className='w-[40px] h-[25px]'
                />
                <View className='justify-center'>
                  <Text className='text-primary font-psemibold px-4'>EUR</Text>
                </View>
              </View>
              <View className='px-5'>
                <View className='justify-center pt-1'>
                  <Text className='text-primary font-pregular'>
                    They receive
                  </Text>
                </View>
                <TextInput
                  // keyboardType={keyboardType}
                  className='flex-1 text-primary font-semibold text-2xl text-center'
                  value={transferAmt}
                  // placeholder={placeholder}
                  placeholderTextColor='#7b7b8b'
                  onChangeText={(e) => setTransferAmt(e)}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Send;

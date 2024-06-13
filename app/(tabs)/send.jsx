import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryFlag from 'react-native-country-flag';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Send = () => {
  const [transferAmt, setTransferAmt] = useState('100');

  // Would be worked on later
  const [sendingCurrency, setSendingCurrency] = useState('');
  const [receivingCurrency, setReceivingCurrency] = useState('');
  //End of would be worked on later

  const [amtReceivable, setAmtReceivable] = useState(null);

  // remember to make this dynamic
  const rate = 16.12;

  const conversionHandler = () => {
    let conAmt = parseFloat(transferAmt) * rate;
    let finalAmt = conAmt.toFixed(2);
    setAmtReceivable(finalAmt.toString());
  };

  useEffect(() => {
    conversionHandler();
  }, [transferAmt]);
  return (
    <ScrollView className='h-full bg-primary-50'>
      <SafeAreaView className='justify-center'>
        <Text className='text-xl text-primary font-psemibold px-4 mt-10'>
          Send
        </Text>

        <View className='items-center'>
          <View className='bg-white rounded-xl mt-8 w-[95%] px-5 py-7'>
            {/* Transfer amount card */}
            <View className='border border-primary-200 w-full h-20 px-4 bg-white rounded-xl focus:border-primary items-center justify-between flex-row mb-5'>
              <View className='bg-primary-50 px-7 py-5 rounded-lg flex-row'>
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
                  <Text className='text-primary text-xs font-pregular'>
                    You send
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
            {/* End of transfer amount card */}

            {/* Rate Bar in the middle */}
            <View className='items-center justify-center'>
              <View className='flex flex-row w-[70%] p-1 justify-between rounded-lg'>
                <Text className='text-sm font-psemibold'>1 EUR </Text>
                <FontAwesome name='bolt' size={20} color='#004d40' />
                <Text className='text-sm font-psemibold'>16.12 GHS </Text>
              </View>
            </View>
            {/* End of rate bar in the middle */}

            {/* Amount receivable card */}

            <View className='border border-primary-200 w-full h-20 px-4 bg-white rounded-xl focus:border-primary items-center justify-between flex-row mt-5'>
              <TouchableOpacity className='bg-primary-50 px-5 py-5 rounded-lg flex-row'>
                <CountryFlag
                  isoCode='gh'
                  size={40}
                  className='w-[40px] h-[25px]'
                />
                <View className='justify-center'>
                  <View className='flex flex-row justify-between'>
                    <Text className='text-primary font-psemibold px-4'>
                      GHS
                    </Text>
                    <View className='justify-center'>
                      <AntDesign name='caretdown' size={14} color='black' />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View className='px-5'>
                <View className='justify-center pt-1'>
                  <Text className='text-primary text-xs font-pregular'>
                    They receive
                  </Text>
                </View>
                <TextInput
                  // keyboardType={keyboardType}
                  className='flex-1 text-primary font-semibold text-2xl text-center'
                  value={amtReceivable}
                  // placeholder={placeholder}
                  placeholderTextColor='#7b7b8b'
                  onChangeText={(e) => setTransferAmt(e)}
                />
              </View>
            </View>
            {/* End of amount receivable  */}
          </View>
        </View>
        <View className='w-[95%] px-5 mt-6'>
          <Text className='text-primary font-psemibold'>Delivery Options</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Send;

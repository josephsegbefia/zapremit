import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryFlag from 'react-native-country-flag';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';
import CustomDropDown from '../../components/CustomDropDown';
import SendScreenOptionsCard from '../../components/SendScreenOptionsCard';
import MiniTransferSummary from '../../components/MiniTransferSummary';

const Send = () => {
  const navigation = useNavigation();
  const { user, transferData, setTransferData, rate } = useGlobalContext();
  const { deliveryMethod, transferFee, totalToPay } = transferData;

  const [transferAmt, setTransferAmt] = useState('100');
  const [sendingCurrency, setSendingCurrency] = useState('');
  const [receivingCurrency, setReceivingCurrency] = useState('');
  const [amtReceivable, setAmtReceivable] = useState(null);

  // const total = parseFloat(transferAmt) + parseFloat(transferFee);

  const conversionHandler = () => {
    if (transferAmt === undefined) {
      setAmtReceivable(parseFloat(0));
      return;
    }
    let conAmt = parseFloat(transferAmt) * rate;
    let finalAmt = conAmt.toFixed(2);
    setAmtReceivable(finalAmt.toString());
  };

  const openDeliveryMethods = () => {
    router.push('/extrascreens/deliveryoptions');
  };

  useEffect(() => {
    conversionHandler();
  }, [transferAmt]);

  const handleNext = () => {
    setTransferData({
      ...transferData,
      transferAmount: transferAmt,
      receivableAmount: amtReceivable,
      totalToPay: total,
    });
    navigation.navigate('extrascreens/sendto');
  };

  return (
    <SafeAreaView className='flex-1 bg-primary-50'>
      <ScrollView className='flex-1'>
        <View className='py-10'>
          <Text className='text-xl text-primary font-psemibold px-4 mt-10'>
            Start sending some money, {user?.firstName}
          </Text>

          <View className='items-center'>
            <View className='bg-white rounded-xl mt-8 w-[95%] px-5 py-7'>
              <View className='border border-primary-200 w-full h-20 px-4 bg-white rounded-xl focus:border-primary items-center justify-between flex-row mb-5'>
                <View className='bg-primary-50 px-7 py-5 rounded-lg flex-row'>
                  <CountryFlag
                    isoCode='de'
                    size={40}
                    className='w-[40px] h-[25px]'
                  />
                  <View className='justify-center'>
                    <Text className='text-primary font-psemibold px-4'>
                      EUR
                    </Text>
                  </View>
                </View>
                <View className='px-5'>
                  <View className='justify-center pt-1'>
                    <Text className='text-primary text-xs font-pregular'>
                      You send
                    </Text>
                  </View>
                  <TextInput
                    className='flex-1 text-primary font-semibold text-2xl text-center'
                    value={transferAmt}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={(e) => setTransferAmt(e)}
                  />
                </View>
              </View>

              <View className='items-center justify-center'>
                <View className='flex flex-row w-[70%] p-1 justify-between rounded-lg'>
                  <Text className='text-sm font-psemibold'>1 EUR </Text>
                  <FontAwesome name='bolt' size={20} color='#004d40' />
                  <Text className='text-sm font-psemibold'>16.12 GHS </Text>
                </View>
              </View>

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
                        <AntDesign name='caretdown' size={14} color='#004d40' />
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
                    className='flex-1 text-primary font-semibold text-2xl text-center'
                    value={amtReceivable}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={(e) => setTransferAmt(e)}
                  />
                </View>
              </View>
            </View>
          </View>

          <Text className='text-primary font-psemibold mt-6 text-sm pl-3'>
            DELIVERY OPTIONS
          </Text>
          <View className='items-center'>
            <SendScreenOptionsCard
              deliveryMethod={deliveryMethod}
              handlePress={openDeliveryMethods}
              icon={<FontAwesome name='bolt' size={20} color='#004d40' />}
              opacity={0.5}
              dropdownIcon={
                <AntDesign name='caretdown' size={14} color='#004d40' />
              }
            />
          </View>
          {deliveryMethod ? (
            <MiniTransferSummary
              transferFee={transferFee}
              totalToPay={totalToPay}
            />
          ) : null}
        </View>
      </ScrollView>
      {deliveryMethod ? (
        <View className='absolute bottom-5 w-full px-4 pb-4'>
          <CustomButton title='NEXT' handlePress={handleNext} />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Send;

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryFlag from 'react-native-country-flag';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';
import SendScreenOptionsCard from '../../components/SendScreenOptionsCard';
import ReasonsModal from '../extrascreens/reasonsModal';
import { calculateTotalProfit } from '../../lib/profitCalculator';
import ChangeSendCountry from '../../components/ChangeSendCountry';
import { updateUserCurrencyInfo } from '../../lib/appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../../components/LoadingOverlay';
import { getUserById } from '../../lib/appwrite';

const Send = () => {
  const {
    user,
    setUser,
    transferData,
    setTransferData,
    rates,
    transferFee,
    country,
    setCountry,
  } = useGlobalContext();
  const navigation = useNavigation();
  const initialRender = useRef(true);

  const { deliveryMethod, recipientFirstName, recipientLastName, reason } =
    transferData;

  const offeredRate = rates?.offeredExchangeRate;

  const [showCountries, setShowCountries] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [accountId, setAccountId] = useState(null);

  const [transferAmt, setTransferAmt] = useState(
    transferData.transferAmount || ''
  );
  const [amtReceivable, setAmtReceivable] = useState(
    transferData.receivableAmount || ''
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAccountId();
  }, [country]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (user) {
      setCountry({
        name: user.destinationCountry,
        countryCode: user.destinationCountryCode,
        currencyCode: user.destinationCountryCurrencyCode,
        currencyName: user.destinationCountryCurrencyName,
        currencySymbol: user.destinationCountryCurrencySymbol,
        flag: user.destinationCountryFlag,
      });
    }
  }, [user, setCountry]);

  const fullName = recipientFirstName
    ? `${recipientFirstName.trim()} ${recipientLastName.trim()}`
    : null;

  // Functions to handle text change in the amount fields
  const handleTransferAmtChange = (amt) => {
    amt = amt.replace(/[^0-9.,]/g, '');
    setTransferAmt(amt);
    const normalizedAmt = amt.replace(',', '.');
    const receivable = (
      parseFloat(normalizedAmt || 0) * rates.offeredExchangeRate
    ).toFixed(2);
    setAmtReceivable(normalizedAmt === '' ? '' : receivable);
    setTransferData((prev) => ({
      ...prev,
      transferAmount: amt,
      receivableAmount: normalizedAmt === '' ? '' : receivable,
    }));
  };

  const handleAmtReceivableChange = (amt) => {
    amt = amt.replace(/[^0-9.,]/g, '');
    setAmtReceivable(amt);
    const normalizedAmt = amt.replace(',', '.');
    const transferable = (
      parseFloat(normalizedAmt || 0) / rates.offeredExchangeRate
    ).toFixed(2);
    setTransferAmt(normalizedAmt === '' ? '' : transferable);
    setTransferData((prev) => ({
      ...prev,
      transferAmount: normalizedAmt === '' ? '' : transferable,
      receivableAmount: amt,
    }));
  };

  useEffect(() => {
    setTransferData((prev) => ({
      ...prev,
      identifier: '',
    }));
  }, [setTransferData]);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeReasons = useCallback(() => {
    setModalVisible(false);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const openDeliveryMethods = useCallback(() => {
    router.push('/extrascreens/deliveryoptions');
  }, []);

  const openReasons = useCallback(() => {
    openModal();
  }, [openModal]);

  const selectReason = useCallback(
    (selectedReason) => {
      setTransferData((prev) => ({
        ...prev,
        reason: selectedReason,
      }));
      closeModal();
    },
    [closeModal, setTransferData]
  );

  const handleRecipientSelectPress = useCallback(() => {
    navigation.navigate('extrascreens/selectrecipient');
  }, [navigation]);

  const handleNext = useCallback(() => {
    const transferAmountFloat = parseFloat(transferAmt);
    if (
      isNaN(transferAmountFloat) ||
      transferAmt === '' ||
      amtReceivable === ''
    ) {
      Alert.alert(
        'Error',
        'Please set a valid amount to transfer or amount to receive'
      );
      return;
    }
    const totalAmountToPay = transferAmountFloat + transferFee;
    setTransferData((prev) => ({
      ...prev,
      destinationCountry: country?.name,
      destinationCountryCode: country?.countryCode,
      transferCurrency: country?.currencyName,
      transferCurrencyCode: country?.currencyCode,
      offeredExchangeRate: rates?.offeredExchangeRate,
      actualExchangeRate: rates?.actualExchangeRate,
      totalToPay: totalAmountToPay,
    }));
    console.log('LOGTD====>', transferData, totalAmountToPay);
  }, [
    transferAmt,
    amtReceivable,
    transferFee,
    country,
    rates,
    setTransferData,
    transferData,
  ]);

  useEffect(() => {
    console.log('TRANSFER DATA====>', transferData);
  }, [transferData]);

  const getAccountId = useCallback(async () => {
    try {
      const id = await AsyncStorage.getItem('accountId');
      if (id !== null) {
        setAccountId(id);
      }
    } catch (error) {
      console.error('Error fetching accountId from AsyncStorage:', error);
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const callUser = async () => {
      if (!accountId) return;
      try {
        const response = await getUserById(accountId, { signal });
        setUser(response);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    callUser();

    return () => {
      controller.abort();
    };
  }, [accountId, setUser]);

  if (isUpdating) {
    return <LoadingOverlay message='Applying changes...' />;
  }

  return (
    <SafeAreaView className='flex-1 bg-primary-50'>
      <ScrollView className='flex-1'>
        <View className='py-10'>
          <Text className='text-xl text-primary font-psemibold px-4 mt-10'>
            Start sending some money, {user?.firstName}!
          </Text>

          <View className='items-center'>
            <View className='bg-white rounded-xl mt-8 w-[95%] px-5 py-7'>
              <View className='border border-primary-200 w-full h-20 px-4 bg-white rounded-xl focus:border-primary items-center justify-between flex-row mb-5'>
                <View className='bg-primary-50 px-7 py-5 rounded-lg flex-row'>
                  <CountryFlag
                    isoCode={user?.destinationCountryCode}
                    size={40}
                    className='w-[40px] h-[25px]'
                  />

                  <View className='justify-center'>
                    <Text className='text-primary font-psemibold px-4'>
                      {user?.currencyCode}
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
                    placeholder='0'
                    onChangeText={handleTransferAmtChange}
                    keyboardType='numeric'
                  />
                </View>
              </View>

              <View className='items-center justify-center'>
                <View className='flex flex-row w-[70%] p-1 justify-between rounded-lg'>
                  <Text className='text-sm font-psemibold text-primary'>
                    1 {user?.currencyCode}
                  </Text>
                  <FontAwesome name='bolt' size={20} color='#004d40' />
                  <Text className='text-sm font-psemibold text-primary'>
                    {offeredRate} {user?.destinationCountryCurrencyCode}
                  </Text>
                </View>
              </View>

              <View className='border border-primary-200 w-full h-20 px-4 bg-white rounded-xl focus:border-primary items-center justify-between flex-row my-5'>
                <View className='bg-primary-50 px-7 py-5 rounded-lg flex-row'>
                  <CountryFlag
                    isoCode={user?.destinationCountryCode}
                    size={40}
                    className='w-[40px] h-[25px]'
                  />
                  <View className='justify-center'>
                    <Text className='text-primary font-psemibold px-4'>
                      {user?.destinationCountryCurrencyCode}
                    </Text>
                  </View>
                </View>

                <View className='px-5'>
                  <View className='justify-center pt-1'>
                    <Text className='text-primary text-xs font-pregular'>
                      Recipient gets
                    </Text>
                  </View>
                  <TextInput
                    className='flex-1 text-primary font-semibold text-2xl text-center'
                    value={amtReceivable}
                    placeholder='0'
                    onChangeText={handleAmtReceivableChange}
                    keyboardType='numeric'
                  />
                </View>
              </View>

              <View className='mb-2'>
                <Text className='font-psemibold text-primary'>Send to</Text>
              </View>
              <TouchableOpacity
                className='border border-primary-200 w-full h-16 bg-primary-50 rounded-xl focus:border-primary items-center justify-between flex-row px-4 mb-5'
                onPress={handleRecipientSelectPress}
              >
                {fullName ? (
                  <Text className='font-pregular text-base text-primary-600'>
                    {fullName}
                  </Text>
                ) : (
                  <Text className='font-pregular text-base text-primary-600'>
                    Select Recipient
                  </Text>
                )}
                <AntDesign name='caretright' size={24} color='#004d40' />
              </TouchableOpacity>

              <View className='mb-2'>
                <Text className='font-psemibold text-primary'>
                  Delivery Method
                </Text>
              </View>
              <TouchableOpacity
                className='border border-primary-200 w-full h-16 bg-primary-50 rounded-xl focus:border-primary items-center justify-between flex-row px-4 mb-5'
                onPress={openDeliveryMethods}
              >
                <Text className='font-pregular text-base text-primary-600'>
                  {deliveryMethod || 'Select a delivery method'}
                </Text>
                <AntDesign name='caretright' size={24} color='#004d40' />
              </TouchableOpacity>

              <View className='mb-2'>
                <Text className='font-psemibold text-primary'>
                  Reason for Sending
                </Text>
              </View>
              <TouchableOpacity
                className='border border-primary-200 w-full h-16 bg-primary-50 rounded-xl focus:border-primary items-center justify-between flex-row px-4 mb-5'
                onPress={openReasons}
              >
                <Text className='font-pregular text-base text-primary-600'>
                  {reason || 'Select reason'}
                </Text>
                <AntDesign name='caretright' size={24} color='#004d40' />
              </TouchableOpacity>
            </View>

            <SendScreenOptionsCard styles='w-[95%]' />

            <CustomButton onPress={handleNext} title='Next' />
          </View>
        </View>
      </ScrollView>

      <ReasonsModal
        visible={modalVisible}
        onClose={closeReasons}
        selectReason={selectReason}
      />

      {showCountries && <ChangeSendCountry />}
    </SafeAreaView>
  );
};

export default Send;

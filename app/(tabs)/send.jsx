import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
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
import LoadingOverlay from '../../components/LoadingOverlay';
import { calculateTotalProfit } from '../../lib/profitCalculator';

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

  const { deliveryMethod, recipientFirstName, recipientLastName, reason } =
    transferData;

  const offeredRate = rates?.offeredExchangeRate;
  const unitProfit = rates?.unitProfit;

  // const [showCountries, setShowCountries] = useState(false); I might use this again later
  const [isUpdating, setIsUpdating] = useState(false);

  const [transferAmt, setTransferAmt] = useState(
    transferData.transferAmount || ''
  );
  const [amtReceivable, setAmtReceivable] = useState(
    transferData.receivableAmount || ''
  );
  const [modalVisible, setModalVisible] = useState(false);

  const [navigateToProfile, setNavigateToProfile] = useState(false);

  useEffect(() => {
    if (navigateToProfile) {
      router.push('/account/profile');
      setNavigateToProfile(false);
      setTransferData((prev) => ({
        ...prev,
        transferAmount: '',
        receivableAmount: '',
        recipientFirstName: '',
        recipientMiddleName: '',
        recipientLastName: '',
        recipientId: '',
        deliveryMethod: '',
        reason: '',
      }));
    }
  }, [navigateToProfile]);

  useEffect(() => {
    setIsUpdating(true);
    try {
      setCountry((prev) => ({
        name: user?.destinationCountry,
        countryCode: user?.destinationCountryCode,
        currencyCode: user?.destinationCountryCurrencyCode,
        currencyName: user?.destinationCountryCurrencyName,
        currencySymbol: user?.destinationCountryCurrencySymbol,
        flag: user?.destinationCountryFlag,
      }));
      setTransferData((prev) => ({
        ...prev,
        destinationCountry: country?.name,
        destinationCountryCode: country?.countryCode,
        transferCurrency: country?.currencyName,
        transferCurrencyCode: country?.currencyCode,
        offeredExchangeRate: rates?.offeredExchangeRate,
        actualExchangeRate: rates?.actualExchangeRate,
      }));
    } catch (error) {
      console.error('Error updating country or transfer data:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [user, setCountry, setTransferData]);

  const fullName = !recipientFirstName
    ? null
    : `${recipientFirstName.trim()} ${recipientLastName.trim()}`;

  const handleTransferAmtChange = (amt) => {
    amt = amt.replace(/[^0-9.,]/g, '');
    const normalizedAmt = amt.replace(',', '.');
    const receivable = (
      parseFloat(normalizedAmt || 0) * rates.offeredExchangeRate
    ).toFixed(2);
    setTransferAmt(amt);
    setAmtReceivable(normalizedAmt === '' ? '' : receivable);

    setTransferData((prev) => ({
      ...prev,
      transferAmount: amt,
      receivableAmount: normalizedAmt === '' ? '' : receivable,
    }));
  };

  const handleAmtReceivableChange = (amt) => {
    amt = amt.replace(/[^0-9.,]/g, '');
    const normalizedAmt = amt.replace(',', '.');
    const transferable = (
      parseFloat(normalizedAmt || 0) / rates.offeredExchangeRate
    ).toFixed(2);
    setAmtReceivable(amt);
    setTransferAmt(normalizedAmt === '' ? '' : transferable);

    // Calculate total to pay
    // const totalToPay = parseFloat(transferable || 0) + transferFee;
    // setTransferTotal(totalToPay.toFixed(2));

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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeReasons = () => {
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openDeliveryMethods = () => {
    router.push('/extrascreens/deliveryoptions');
  };

  const openReasons = () => {
    openModal();
  };

  const selectReason = (selectedReason) => {
    setTransferData((prev) => ({
      ...prev,
      reason: selectedReason,
    }));
    closeModal();
  };

  const handleRecipientSelectPress = () => {
    navigation.navigate('extrascreens/selectrecipient');
  };

  const handleNext = () => {
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

    const transferProfit = calculateTotalProfit(
      unitProfit,
      transferFee,
      transferAmountFloat
    );

    setTransferData((prev) => ({
      ...prev,
      totalToPay: parseFloat(transferAmountFloat + transferFee),
      transferProfit: transferProfit.totalProfitPerTransaction,
    }));

    router.push('/extrascreens/transferoverview');
  };

  useEffect(() => {
    console.log(transferData);
  }, [transferData]);

  const handleCountryChangePress = () => {
    Alert.alert(
      'Information',
      'Please go to your profile in the account screen to change the country to send to.',
      [
        {
          text: 'Cancel',
          style: 'destructive',
        },
        {
          text: 'Go to profile',
          style: 'default',
          onPress: () => {
            setNavigateToProfile(true);
          },
        },
      ]
    );
  };

  // Show loading screen when applying changes...
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
                    isoCode={user?.code || 'DE'}
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
                    value={transferData.transferAmount}
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

              <View className='border border-primary-200 w-full h-20 px-4 bg-white rounded-xl focus:border-primary items-center justify-between flex-row mt-5'>
                <TouchableOpacity
                  className='bg-primary-50 px-5 py-5 rounded-lg flex-row'
                  onPress={handleCountryChangePress}
                >
                  <CountryFlag
                    isoCode={user?.destinationCountryCode}
                    size={40}
                    className='w-[40px] h-[25px]'
                  />

                  <View className='justify-center'>
                    <View className='flex flex-row justify-between'>
                      <Text className='text-primary font-psemibold px-4'>
                        {user?.destinationCountryCurrencyCode}
                      </Text>
                    </View>
                  </View>
                  <View className='justify-center'></View>
                </TouchableOpacity>
                <View className='px-5'>
                  <View className='justify-center pt-1'>
                    <Text className='text-primary text-xs font-pregular'>
                      They receive
                    </Text>
                  </View>
                  <TextInput
                    className='flex-1 text-primary font-semibold text-2xl text-center'
                    value={transferData.receivableAmount}
                    placeholder='0'
                    onChangeText={handleAmtReceivableChange}
                    keyboardType='numeric'
                  />
                </View>
              </View>
            </View>
          </View>

          <Text className='text-primary font-psemibold mt-4 text-sm pl-3'>
            TRANSFER DETAILS
          </Text>
          <View className='items-center'>
            <SendScreenOptionsCard
              title='Select recipient'
              subtitle='Sending to'
              selectedOption={fullName}
              icon={<FontAwesome name='bolt' size={20} color='#004d40' />}
              styles='mt-2'
              opacity={0.5}
              handlePress={handleRecipientSelectPress}
              dropdownIcon={
                <AntDesign name='caretdown' size={14} color='#004d40' />
              }
            />
            {fullName && (
              <SendScreenOptionsCard
                styles='mt-2'
                title='Select delivery option'
                subtitle='Delivery method'
                selectedOption={deliveryMethod}
                handlePress={openDeliveryMethods}
                icon={<FontAwesome name='bolt' size={20} color='#004d40' />}
                opacity={0.5}
                dropdownIcon={
                  <AntDesign name='caretdown' size={14} color='#004d40' />
                }
              />
            )}

            {deliveryMethod && (
              <SendScreenOptionsCard
                title='Sending reason'
                subtitle='Reason'
                selectedOption={reason}
                styles='mt-2'
                handlePress={openReasons}
                dropdownIcon={
                  <AntDesign name='caretdown' size={14} color='#004d40' />
                }
                icon={<FontAwesome name='bolt' size={20} color='#004d40' />}
              />
            )}
          </View>
        </View>
      </ScrollView>
      {reason && (
        <View className='absolute bottom-5 w-full px-4 pb-4'>
          <CustomButton title='NEXT' handlePress={handleNext} />
        </View>
      )}

      {modalVisible && (
        <ReasonsModal
          modalVisible={modalVisible}
          closeModal={closeReasons}
          selectReason={selectReason}
        />
      )}
      {/* {showCountries && (
        <ChangeSendCountry
          country={country}
          setCountry={setCountry}
          setModalVisible={setShowCountries}
          updateUser={updateUserCurrencyInfo}
          setIsUpdating={setIsUpdating}
        />
      )} */}
    </SafeAreaView>
  );
};

export default Send;

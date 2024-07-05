import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryFlag from 'react-native-country-flag';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';
import SendScreenOptionsCard from '../../components/SendScreenOptionsCard';
import ReasonsModal from '../extrascreens/reasonsModal';
import { applyProfitMargin, transferProfit } from '../../lib/profitCalculator';
import ChangeSendCountry from '../../components/ChangeSendCountry';
import { getRate } from '../../lib/appwrite';
import useFetchRate from '../../lib/fetchRate';
import { updateUserCurrencyInfo } from '../../lib/appwrite';
import LoadingOverlay from '../../components/LoadingOverlay';

const Send = () => {
  const {
    user,
    transferData,
    setTransferData,
    rates,
    setRates,
    profitMargin,
    refreshUser,
  } = useGlobalContext();
  const navigation = useNavigation();
  const { data: rateData } = useFetchRate(() =>
    getRate(user?.currencyCode, user?.destinationCountryCurrencyCode, 1)
  );

  const parsedRate = JSON.parse(rateData);
  const actualRate = parsedRate?.rate;
  const { offeredRate, profit } = applyProfitMargin(actualRate, profitMargin);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  const [country, setCountry] = useState({
    name: '',
    countryCode: '',
    currencyCode: '',
    currencyName: '',
    currencySymbol: '',
    flag: '',
  });

  useEffect(() => {
    setTransferData((prev) => ({
      ...prev,
      transferCurrencyCode: country.currencyCode,
      destinationCountryCode: country.countryCode,
    }));
  }, [country, setTransferData]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const {
    deliveryMethod,
    transferFee,
    recipientFirstName,
    recipientLastName,
    totalToPay,
    reason,
    destination,
  } = transferData;

  const fullName = !recipientFirstName
    ? null
    : `${recipientFirstName.trim()} ${recipientLastName.trim()}`;

  const [transferAmt, setTransferAmt] = useState(
    transferData.transferAmount || '0.00'
  );
  const [amtReceivable, setAmtReceivable] = useState(
    transferData.receivableAmount || '0.00'
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleTransferAmtChange = (amt) => {
    amt = amt.replace(/[^0-9.,]/g, ''); // Allow numbers, periods, and commas
    setTransferAmt(amt);
    const normalizedAmt = amt.replace(',', '.'); // Replace comma with period
    if (!isNaN(parseFloat(normalizedAmt))) {
      const receivable = (
        parseFloat(normalizedAmt) * rates.offeredExchangeRate
      ).toFixed(2);
      setAmtReceivable(receivable);
      setTransferData((prev) => ({
        ...prev,
        transferAmount: amt,
        receivableAmount: receivable,
      }));
    } else {
      setAmtReceivable('0.00');
    }
  };

  const handleAmtReceivableChange = (amt) => {
    amt = amt.replace(/[^0-9.,]/g, ''); // Allow numbers, periods, and commas
    setAmtReceivable(amt);
    const normalizedAmt = amt.replace(',', '.'); // Replace comma with period
    if (!isNaN(parseFloat(normalizedAmt))) {
      const toSend = (
        parseFloat(normalizedAmt) / rates.offeredExchangeRate
      ).toFixed(2);
      setTransferAmt(toSend);
      setTransferData((prev) => ({
        ...prev,
        transferAmount: toSend,
        receivableAmount: amt,
      }));
    } else {
      setTransferAmt('0.00');
    }
  };

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
    setTransferData({
      ...transferData,
      transferAmount: transferAmt,
      receivableAmount: amtReceivable,
      totalToPay: totalToPay,
    });
    router.push('/extrascreens/transferoverview');
  };

  if (isUpdating) {
    return <LoadingOverlay message='Applying changes...' />;
  }
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
                  <Image
                    source={{ uri: user?.flag }}
                    resizeMode='contain'
                    style={{ width: 30, height: 30 }}
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
                  onPress={() => setShowCountries(true)}
                >
                  <Image
                    source={{ uri: user?.destinationCountryFlag }}
                    resizeMode='contain'
                    style={{ width: 25, height: 25 }}
                  />
                  {/* <CountryFlag
                    isoCode={user?.destinationCountryCode}
                    size={40}
                    className='w-[40px] h-[25px]'
                  /> */}

                  <View className='justify-center'>
                    <View className='flex flex-row justify-between'>
                      <Text className='text-primary font-psemibold px-4'>
                        {user?.destinationCountryCurrencyCode}
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
      {showCountries && (
        <ChangeSendCountry
          country={country}
          setCountry={setCountry}
          setModalVisible={setShowCountries}
          updateUser={updateUserCurrencyInfo}
          setIsUpdating={setIsUpdating}
        />
      )}
    </SafeAreaView>
  );
};

export default Send;

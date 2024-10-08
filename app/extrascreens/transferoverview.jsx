import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import InfoCard from '../../components/InfoCard';
import { createTransfer } from '../../lib/appwrite';
import CustomButton from '../../components/CustomButton';

const TransferOverView = () => {
  // const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, userIsVerified, transferData, setTransferData, rates } =
    useGlobalContext();
  const {
    recipientFirstName,
    recipientMiddleName,
    recipientLastName,
    recipientId,
    recipientPhone,
    receivableAmount,
    deliveryMethod,
    totalToPay,
    transferFee,
    transferAmount,
    transferCurrencyCode,
    reason,
  } = transferData;

  // console.log(transferData);

  const sendMoney = async () => {
    router.push('/extrascreens/transferprogress');
  };

  return (
    <ScrollView className='bg-primary-50 h-full'>
      <View className='px-4 mt-4'>
        <Text className='text-xl font-pbold text-primary'>
          Transfer Overview
        </Text>
      </View>
      <View className='items-center'>
        <View className='w-[90%]'>
          <View className=''>
            <View className='bg-white rounded-xl mt-5 px-4 py-4'>
              <InfoCard
                title={`Transfer to ${recipientFirstName}`}
                info={`${recipientFirstName.trim()} will receive ${transferCurrencyCode} ${receivableAmount} in less than a minute`}
                styles='px-4'
              />
            </View>
            <View className='flex-row justify-between px-1 mt-4'>
              <Text className='text-primary font-psemibold'>
                Transfer Details
              </Text>
              <TouchableOpacity>
                <Text className='text-primary font-psemibold'>Edit</Text>
              </TouchableOpacity>
            </View>
            <View className='bg-white rounded-xl mt-2 px-4 py-4'>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>
                  Delivery Method
                </Text>
                <Text className='text-primary font-pregular'>
                  {deliveryMethod}
                </Text>
              </View>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>
                  Transfer Amount
                </Text>
                <Text className='text-primary font-pregular'>
                  EUR {transferAmount}
                </Text>
              </View>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>
                  Receivable Amount
                </Text>
                <Text className='text-primary font-pregular'>
                  {transferCurrencyCode} {receivableAmount}
                </Text>
              </View>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>
                  Exchange Rate
                </Text>
                <Text className='text-primary font-pregular'>
                  {user?.currencyCode} 1 = {transferCurrencyCode}{' '}
                  {rates.offeredExchangeRate}
                </Text>
              </View>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>
                  Transfer Fees
                </Text>
                <Text className='text-primary font-pregular'>
                  {user?.currencyCode} {transferFee}
                </Text>
              </View>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>ETA</Text>
                <Text className='text-primary font-pregular'>
                  Less than a minute
                </Text>
              </View>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>Total Due</Text>
                <Text className='text-primary font-pregular'>
                  {user?.currencyCode} {totalToPay}
                </Text>
              </View>
            </View>

            <View className='flex-row justify-between px-1 mt-4'>
              <Text className='text-primary font-psemibold'>
                Recipient Details
              </Text>
              <TouchableOpacity>
                <Text className='text-primary font-psemibold'>Edit</Text>
              </TouchableOpacity>
            </View>
            <View className='bg-white rounded-xl mt-2 px-4 py-4'>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>Name</Text>
                <Text className='text-primary font-pregular'>
                  {recipientFirstName} {recipientMiddleName} {recipientLastName}
                </Text>
              </View>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>
                  Account Number
                </Text>
                <Text className='text-primary font-pregular'>
                  {recipientPhone}
                </Text>
              </View>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>Location</Text>
                <Text className='text-primary font-pregular'>
                  {user?.destinationCountry}
                </Text>
              </View>
              <View className='flex-row justify-between mb-3'>
                <Text className='text-primary font-psemibold'>Reason</Text>
                <Text className='text-primary font-pregular'>{reason}</Text>
              </View>
            </View>
          </View>
          <View className='mt-5'>
            {userIsVerified && (
              <CustomButton title='SEND MONEY' handlePress={sendMoney} />
            )}

            {!userIsVerified && (
              <CustomButton
                title='VERIFY YOUR IDENTITY'
                handlePress={() => router.replace('/extrascreens/verification')}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TransferOverView;

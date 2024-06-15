import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../context/GlobalProvider';
import InfoCard from './InfoCard';
import CustomButton from './CustomButton';

const TransferOverView = () => {
  const { user, transferData, setTransferData } = useGlobalContext();
  const {
    recipientFirstName,
    recipientMiddleName,
    recipientLastName,
    recipientPhone,
    receivableAmount,
    deliveryMethod,
    totalToPay,
    transferFee,
    transferAmount,
  } = transferData;
  // console.log(transferData);
  return (
    <View className='w-[90%]'>
      <View className=''>
        <Text className='text-xl font-pbold text-primary'>
          Transfer Overview
        </Text>
        <View className='bg-white rounded-xl mt-5 px-4 py-5'>
          <InfoCard
            title={`Transfer to ${recipientFirstName}`}
            info={`${recipientFirstName.trim()} will receive GHS ${receivableAmount} in less than a minute`}
          />
        </View>
        <View className='flex-row justify-between px-1 mt-4'>
          <Text className='text-primary font-psemibold'>Transfer Details</Text>
          <TouchableOpacity>
            <Text className='text-primary font-psemibold'>Edit</Text>
          </TouchableOpacity>
        </View>
        <View className='bg-white rounded-xl mt-2 px-4 py-4'>
          <View className='flex-row justify-between mb-3'>
            <Text className='text-primary font-psemibold'>Delivery Method</Text>
            <Text className='text-primary font-pregular'>{deliveryMethod}</Text>
          </View>
          <View className='flex-row justify-between mb-3'>
            <Text className='text-primary font-psemibold'>Transfer Amount</Text>
            <Text className='text-primary font-pregular'>
              EUR {transferAmount}
            </Text>
          </View>
          <View className='flex-row justify-between mb-3'>
            <Text className='text-primary font-psemibold'>
              Receivable Amount
            </Text>
            <Text className='text-primary font-pregular'>
              GHS {receivableAmount}
            </Text>
          </View>
          <View className='flex-row justify-between mb-3'>
            <Text className='text-primary font-psemibold'>Exchange Rate</Text>
            <Text className='text-primary font-pregular'>
              EUR 1 = GHS 16.42
            </Text>
          </View>
          <View className='flex-row justify-between mb-3'>
            <Text className='text-primary font-psemibold'>Transfer Fees</Text>
            <Text className='text-primary font-pregular'>
              EUR {transferFee}
            </Text>
          </View>
          <View className='flex-row justify-between mb-3'>
            <Text className='text-primary font-psemibold'>ETA</Text>
            <Text className='text-primary font-pregular'>
              Less than a minute
            </Text>
          </View>
        </View>

        <View className='flex-row justify-between px-1 mt-4'>
          <Text className='text-primary font-psemibold'>Recipient Details</Text>
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
              Mobile Money Account Number
            </Text>
            <Text className='text-primary font-pregular'>{recipientPhone}</Text>
          </View>
          <View className='flex-row justify-between mb-3'>
            <Text className='text-primary font-psemibold'>Location</Text>
            <Text className='text-primary font-pregular'></Text>
          </View>
          <View className='flex-row justify-between mb-3'>
            <Text className='text-primary font-psemibold'>Reason</Text>
            <Text className='text-primary font-pregular'></Text>
          </View>
        </View>
      </View>
      <View className='mt-5'>
        <CustomButton
          title={user.isVerified ? 'SEND MONEY' : 'VERIFY YOUR IDENTITY'}
        />
      </View>
    </View>
  );
};

export default TransferOverView;

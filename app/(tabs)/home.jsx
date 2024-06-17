import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExchangeRateCard from '../../components/ExchangeRateCard';
import CustomCard from '../../components/CustomCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getUserLatestTransfers } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import formatDate from '../../lib/formatDate';
import LoadingOverlay from '../../components/LoadingOverlay';

const Home = () => {
  const { user } = useGlobalContext();
  const [transfersList, setTransfersList] = useState([]);

  const { data: transfers, isLoading } = useAppwrite(() =>
    getUserLatestTransfers(user.$id)
  );

  useEffect(() => {
    if (transfers) {
      setTransfersList(transfers);
    }
  }, [transfers]);

  return (
    <ScrollView className='h-full bg-primary-50'>
      <SafeAreaView className='items-center mb-10'>
        <View className='mt-8'>
          <Text className='text-primary font-psemibold text-xl'>
            Welcome back, {user.firstName}
          </Text>
        </View>
        <View className='justify-center text-center w-[95%] mt-5'>
          <ExchangeRateCard
            title='Current Rate'
            hostCountryId='de'
            recipientCountryId='gh'
          />
        </View>
        <View className='mt-4 flex flex-row border-b-2 border-primary'>
          <Text className='font-pmedium text-sm text-primary mb-1'>
            Recent Transfers
          </Text>
        </View>
        <View className='w-[95%] mt-2'>
          {isLoading && <LoadingOverlay message='Loading...' />}
          {transfersList.length > 0 ? (
            transfersList.map((transfer) => (
              <CustomCard
                key={transfer.$id}
                firstName={transfer.recipient.firstName}
                lastName={transfer.recipient.lastName}
                isTransferHistory
                amount={transfer.receivableAmount}
                status='delivered'
                date={formatDate(transfer.$createdAt)}
              />
            ))
          ) : (
            <CustomCard firstName='No recent' lastName='transfers' empty />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

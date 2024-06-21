import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { createTransfer } from '../../lib/appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import formatDate from '../../lib/formatDate';

import TransferProgressTabs from '../../components/TransferProgressTabs';

const TransferProgress = () => {
  const { user, transferData, setTransferData } = useGlobalContext();
  const [transferInitiated, setTransferInitiated] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [status, setStatus] = useState('');
  const [completedTransfer, setCompletedTransfer] = useState({});

  const sendMoney = async () => {
    // setInProgress(false);
    try {
      transfer = await createTransfer({
        ...transferData,
        inProgress: false,
        status: 'Success',
        transferInitiated: true,
        user: user.$id,
      });
      setStatus('Success');
      setCompletedTransfer({
        transfer,
      });
      // router.push('/extrascreens/transferprogress');
    } catch (error) {
      Alert.alert('Error', 'Funds could not be sent.');
      setStatus('Failed');
      console.log(error);
    } finally {
      setInProgress(false);
    }
  };

  console.log(completedTransfer);

  useEffect(() => {
    setTransferInitiated(true);

    setTransferData((prev) => ({
      ...prev,
      transferInitiated: true,
    }));
  }, []);

  useEffect(() => {
    setInProgress(true);
    const timer = setTimeout(() => {
      sendMoney();
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <SafeAreaView className='bg-primary-50 h-full'>
      <ScrollView contentContainerStyle={styles.container}>
        <Text className='text-primary text-lg font-psemibold'>
          Transfer Progress
        </Text>
        <TransferProgressTabs
          title='Transfer Initiated'
          date='28th October, 2021'
        />
        {transferInitiated && inProgress && (
          <TransferProgressTabs title='Processing' loading={inProgress} />
        )}
        {status === 'Failed' && (
          <TransferProgressTabs title='Processing Failed' />
        )}
        {status === 'Success' && <TransferProgressTabs title='Processed' />}
        {status === 'Success' && (
          <TransferProgressTabs
            title='Completed'
            subtitle={`${transfer.recipient.firstName} now has GHC ${transfer.receivableAmount}`}
            date={formatDate(transfer.$createdAt)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransferProgress;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
  },
});

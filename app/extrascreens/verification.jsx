import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';

const Verification = () => {
  const { userIsVerified, setUserIsVerified } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserIsVerified(true);
      router.replace('/extrascreens/transferoverview');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <View className='justify-center items-center'>
      <View className='w-[95%] bg-white rounded-xl px-4 py-5 mt-10'>
        <Text className='text-xl text-primary font-psemibold text-justify'>
          This is just to simulate a verification process. In production, the
          user will have to provide an address information and a government
          issued ID to complete verification.
        </Text>

        <View className='mt-20'>
          {!userIsVerified && <ActivityIndicator size='large' color='red' />}

          <Text className='text-lg text-primary font-psemibold text-center my-10'>
            Verifying, please wait
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Verification;

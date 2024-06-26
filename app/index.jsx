import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
import Logo from '../components/Logo';
import LoadingOverlay from '../components/LoadingOverlay';
import VerifyPhone from './extrascreens/verifyPhone';

export default function App() {
  const { user, isLoading, isLoggedIn } = useGlobalContext();

  if (isLoading) {
    return <LoadingOverlay message='Loading...' />;
  }

  // if (!user?.numberIsVerified) {
  //   return <Redirect href='/extrascreens/verifyPhone' />;
  // }
  if (!isLoading && isLoggedIn) return <Redirect href='/home' />;

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Logo
            styles='bg-white border-white'
            logoTextColor='text-white'
            color='#004d40'
            text='Zap Remit'
          />
          <Text className='text-xl font-plight text-white mt-7 text-center'>
            Your Money, Zapped Instantly
          </Text>
          <CustomButton
            title='LOGIN'
            containerStyles='w-full mt-10'
            handlePress={() => router.push('/login')}
          />
          <CustomButton
            title='SIGN UP'
            containerStyles='w-full mt-4'
            handlePress={() => router.push('/signup1')}
          />
          <Text className='text-white font-pregular text-sm mt-7'>
            or continue with
          </Text>
          <View className='flex-row gap-3 mt-3'>
            <TouchableOpacity
              activeOpacity={0.3}
              className='w-[50px] h-[50px] border border-white p-3 rounded-lg justify-center'
            >
              <AntDesign name='apple1' size={24} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.3}
              className='w-[50px] h-[50px] border border-white p-3 rounded-lg justify-center'
            >
              <AntDesign name='google' size={24} color='white' />
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style='light' />
      </ScrollView>
    </SafeAreaView>
  );
}

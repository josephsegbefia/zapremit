import { useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Logo from '../../components/Logo';
import { useGlobalContext } from '../../context/GlobalProvider';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomButton from '../../components/CustomButton';
import { verifyOTP } from '../../lib/appwrite';
import LoadingOverlay from '../../components/LoadingOverlay';
import CustomCard from '../../components/CustomCard';
import { sendOTP } from '../../lib/appwrite';
import ChangeNumber from './changenumber';

const OTPScreen = () => {
  const { user } = useGlobalContext();
  const [verificationCode, setVerificationCode] = useState('');
  const [time, setTime] = useState(10 * 60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [didEncounterError, setDidEncounterError] = useState(false);
  const [changenumber, setChangeNumber] = useState(false);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [time]);

  // Format the time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  const handleVerification = async () => {
    if (!verificationCode) {
      Alert.alert('Error', 'Please provide the code sent you');
    }
    setIsVerifying(true);
    try {
      const response = await verifyOTP(
        user.completePhone,
        verificationCode,
        user.$id
      );
      // console.log('FROM OTP SCREEN===>', response.numberIsVerified);
      if (!response.numberIsVerified) {
        // setDidEncounterError(true);
        return;
      }
      router.replace('/extrascreens/userextradetails');
    } catch (error) {
      setDidEncounterError(true);
      // Alert.alert('Error', 'Code could not be verified');
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerifying) {
    return <LoadingOverlay message='Verifying OTP...' />;
  }

  if (didEncounterError) {
    return (
      <View className='h-full bg-primary-50 items-center justify-center'>
        <View className='w-95%'>
          <Text className='text-primary-red text-center font-psemibold my-6'>
            OTP is wrong. Try Again
          </Text>
          <View className=''>
            <CustomButton
              title='TRY AGAIN'
              handlePress={async () => {
                if (time === 0) {
                  await sendOTP(user.completePhone);
                }
                setDidEncounterError(false);
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  if (changenumber) {
    return (
      <View className=' w-full'>
        <ChangeNumber />
      </View>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-primary-50 h-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : ''}
        className='h-[100%] w-[100%] '
      >
        <View className='flex-1 items-center'>
          <Logo
            styles='bg-primary-50 border-primary'
            logoTextColor='text-primary'
            color='#004d40'
            text='Zap Remit'
          />
          <Text className='text-lg text-primary font-psemibold my-3'>
            Verify your phone number
          </Text>
          <Text className='text-xs text-primary'>
            An sms has been to sent to your number with the verification code
          </Text>
          <Text className='text-primary font-psemibold'>
            Code expires in {formatTime(time)}
          </Text>
          <View className='w-[100%] px-[22px]'>
            <OTPInputView
              style={{ width: '100%', height: 100, paddingHorizontal: 32 }}
              pinCount={6}
              autoFocusOnLoad
              codeInputFieldStyle={{
                width: 30,
                height: 45,
                color: '#004d40',
                borderWidth: 0,
                fontSize: 25,
                borderBottomWidth: 2,
                borderBottomColor: '#004d40',
              }}
              codeInputHighlightStyle={{
                borderColor: '#80cbc4',
              }}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}`);
                setVerificationCode(code);
              }}
            />
            <CustomButton
              title='VERIFY'
              handlePress={() =>
                handleVerification(
                  user.completePhone,
                  verificationCode,
                  user.$id
                )
              }
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => setChangeNumber(true)}>
                <Text>Wrong Phone Number ?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}></TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;

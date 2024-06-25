import { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../../components/Logo';
import { useGlobalContext } from '../../context/GlobalProvider';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomButton from '../../components/CustomButton';
import { verifyOTP } from '../../lib/appwrite';

const OTPScreen = () => {
  const { user } = useGlobalContext();
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async (number, code, userId) => {
    setIsVerifying(true);
    try {
      const response = await verifyOTP(number, code, userId);
      console.log(response);
    } catch (error) {
      Alert.alert('Error', 'Code could not be verified');
    }
  };
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
              <Text>Wrong Phone Number ?</Text>
              <TouchableOpacity onPress={() => {}}></TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;

import { useContext } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { SignupContext } from '../../context/signup-context';

const confirmOTP = () => {
  const { signupData, setSignupData } = useContext(SignupContext);
  console.log(signupData);
  return (
    <View className='h-full bg-black w-full items-center'>
      <OTPInputView
        style={{ width: '80%', height: 600, color: '#004d40' }}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
    </View>
  );
};

export default confirmOTP;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    color: '#004d40',
  },

  borderStyleHighLighted: {
    borderColor: '#004d40',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#004d40',
  },
});

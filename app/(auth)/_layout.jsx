import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SignupProvider } from '../../context/signup-context';

const AuthLayout = () => {
  return (
    <>
      <SignupProvider>
        <Stack>
          <Stack.Screen
            name='login'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name='signup1' options={{ headerShown: false }} />
          <Stack.Screen name='signup2' options={{ headerShown: false }} />
          <Stack.Screen name='signup3' options={{ headerShown: false }} />
          <Stack.Screen name='confirmOTP' options={{ headerShown: false }} />
        </Stack>
      </SignupProvider>
    </>
  );
};

export default AuthLayout;

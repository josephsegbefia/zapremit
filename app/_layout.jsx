import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack, SplashScreen, router } from 'expo-router';
import { useFonts } from 'expo-font';
import GlobalProvider from '../context/GlobalProvider';
import CountryPickerProvider from '../context/country-picker-context';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <CountryPickerProvider>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen
            name='extrascreens/recipienttransfers'
            options={{
              title: 'Recipient Transfers',
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerTintColor: '#004d40',
              headerBackTitleStyle: {
                color: '#004d40',
              },
            }}
          />
          <Stack.Screen
            name='extrascreens/addnewrecipient'
            options={{
              title: 'Add new recipient',
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerTintColor: '#004d40',
              headerBackTitleStyle: {
                // color: 'red',
              },
            }}
          />
          <Stack.Screen
            name='extrascreens/editrecipient'
            options={{
              title: 'Edit recipient data',
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerTintColor: '#004d40',
              headerBackTitleStyle: {
                // color: 'red',
              },
            }}
          />
          <Stack.Screen
            name='extrascreens/deliveryoptions'
            options={{
              presentation: 'modal',
              title: 'Select Delivery Option',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close' size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='extrascreens/mobilemoney'
            options={{
              presentation: 'modal',
              title: 'Select a mobile money provider',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close' size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='extrascreens/cashpickup'
            options={{
              presentation: 'modal',
              title: 'Select pickup option',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close' size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='extrascreens/banktransfer'
            options={{
              presentation: 'modal',
              title: 'Select a transfer option',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close' size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='extrascreens/selectrecipient'
            options={{
              presentation: 'modal',
              title: 'Select Recipient',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },

              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => router.replace('/send')}>
                  <Ionicons name='close' size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='extrascreens/transferoverview'
            options={{
              presentation: 'fullScreenModal',
              title: 'Transfer Overview',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },

              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => router.replace('/send')}>
                  <Ionicons name='close' size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='extrascreens/verification'
            options={{
              presentation: 'fullScreenModal',
              title: 'Verify',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              // headerRight: ({ tintColor }) => (
              //   <TouchableOpacity onPress={() => router.back()}>
              //     <Ionicons name='close' size={24} color={tintColor} />
              //   </TouchableOpacity>
              // ),
            }}
          />
          <Stack.Screen
            name='account/profile'
            options={{
              presentation: 'fullScreenModal',
              title: 'Profile',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close' size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='account/about'
            options={{
              presentation: 'fullScreenModal',
              title: 'About Zap Remit',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close' size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name='extrascreens/transferprogress'
            options={{
              presentation: 'fullScreenModal',
              title: 'Transfer Progress',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              // headerRight: ({ tintColor }) => (
              //   <TouchableOpacity onPress={() => router.back()}>
              //     <Ionicons name='close' size={24} color={tintColor} />
              //   </TouchableOpacity>
              // ),
            }}
          />
          <Stack.Screen
            name='extrascreens/otpscreen'
            options={{
              presentation: 'fullScreenModal',
              title: 'Verify your number',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              // headerRight: ({ tintColor }) => (
              //   <TouchableOpacity onPress={() => router.back()}>
              //     <Ionicons name='close' size={24} color={tintColor} />
              //   </TouchableOpacity>
              // ),
            }}
          />
          <Stack.Screen
            name='extrascreens/userextradetails'
            options={{
              presentation: 'fullScreenModal',
              title: 'User info',
              headerTintColor: '#004d40',
              headerStyle: {
                backgroundColor: '#e0f2f1',
                fontWeight: 'bold',
              },
              headerRight: ({ tintColor }) => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close' size={24} color={tintColor} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </CountryPickerProvider>
    </GlobalProvider>
  );
};

export default RootLayout;

import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function CustomButton({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          // borderColor: 'red',
          // borderWidth: 1,
          backgroundColor: 'teal',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}

const AntDButton = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-2'>
      <AntDesign name={icon} size={24} color={color} />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Ionicons name={icon} size={24} color={color} />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

const SendButton = ({ icon, color, name, focused }) => {
  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 15 }}
    >
      <FontAwesome name={icon} size={40} color='white' />

      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#004d40',
          tabBarInactiveBackgroundColor: 'white',
          tabBarStyle: {
            // position: 'absolute',
            // bottom: 25,
            // left: 20,
            // right: 20,
            // elevation: 0,
            backgroundColor: 'white',
            // borderWidth: 1,
            // borderColor: 'teal',
            // borderRadius: 15,
            marginBottom: 0,
            paddingVertical: Platform.OS === 'ios' ? 24 : 0,
            height: 70,
            ...styles.shadow,
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',

            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name='Home'
                icon='home'
                focused={focused}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name='transfers'
          options={{
            title: 'Transfers',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon='list'
                name='Transfers'
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='send'
          options={{
            title: 'Send',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <SendButton
                icon='bolt'
                // name='Send'
                focused={focused}
                color={color}
              />
            ),
            tabBarButton: (props) => <CustomButton {...props} />,
          }}
        />
        <Tabs.Screen
          name='recipients'
          options={{
            title: 'Recipients',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <AntDButton
                icon='contacts'
                name='Recipients'
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='settings'
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <AntDButton
                icon='setting'
                name='Settings'
                focused={focused}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

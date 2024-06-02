import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Logo = ({ styles, logoTextColor, color, text }) => {
  return (
    <View className='items-center'>
      <View
        className={`w-[120px] h-[120px] border-2 rounded-full items-center justify-center ${styles}`}
      >
        <FontAwesome name='bolt' size={80} color={color} />
      </View>
      <View className='w-[80%] items-center'>
        <Text className={`${logoTextColor} text-3xl mt-7 font-psemibold`}>
          {text}
        </Text>

        {/* <Text style={styles.sloganText}>
          Send money to your loved ones in Africa with a zap!
        </Text> */}
      </View>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    // backgroundColor: 'white',
  },
  idContainer: {
    width: '80%',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 10,
    marginTop: 20,
    textAlign: 'center',
  },
});

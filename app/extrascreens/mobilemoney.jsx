import { View, Text } from 'react-native';
import React from 'react';

const MobileMoney = () => {
  const mobileMoneyProviders = [
    {
      company: 'Vodafone GH',
      service: 'Vodafone Cash',
      limit: '15K GHS',
    },
    {
      company: 'AirtelTigo',
      service: 'AirtelTigo Cash Cash',
      limit: '15K GHS',
    },
    {
      company: 'MTN',
      service: 'MTN MoMo',
      limit: '15K GHS',
    },
  ];
  return (
    <View>
      <Text>Mobile Money</Text>
    </View>
  );
};

export default MobileMoney;

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { countriesData } from '../constants/countries';
import { SafeAreaView } from 'react-native-safe-area-context';
import { memo } from 'react';

const { width, height } = Dimensions.get('window');

const CountryCodePicker = ({ phone, code, setPhone, setCountry }) => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const data = countriesData.map((country) => {
      return {
        code: country.alpha2Code,
        name: country.name,
        callingCode: country.callingCode,
        flag: country.flag,
      };
    });

    setAreas(data);
    if (data.length > 0) {
      let defaultData = data.filter((a) => a.code === 'GH');
      if (defaultData.length > 0) {
        setSelectedArea(defaultData[0]);
        setPhone(phone, defaultData[0].callingCode);
      }
    }
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        onPress={() => {
          setSelectedArea(item);
          setModalVisible(false);
          setPhone(phone, item.callingCode);
        }}
      >
        <Text style={{ color: '#004d40', fontSize: 14, fontWeight: '600' }}>
          {item.name} ({item.callingCode})
        </Text>
      </TouchableOpacity>
    ),
    [phone]
  );

  const keyExtractor = useCallback((item) => item.code, []);

  const renderCountryCodesModal = useMemo(() => {
    return (
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: '#e0f2f1',
              marginTop: 200,
              paddingBottom: 100,
            }}
          >
            <FlatList
              data={areas}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <>
                  <TouchableOpacity
                    className='items-end mx-5 my-2'
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name='close' size={24} color='#004d40' />
                  </TouchableOpacity>
                </>
              )}
              stickyHeaderIndices={[0]}
              ListHeaderComponentStyle={styles.header}
            />
          </View>
        </View>
      </Modal>
    );
  }, [modalVisible, areas, renderItem, keyExtractor]);

  const handlePhoneChange = (phoneNumber) => {
    setPhone(phoneNumber, selectedArea?.callingCode);
    setCountry(selectedArea.name);
  };

  return (
    <View style={{ width: '100%' }}>
      <Text className='text-base text-primary font-pmedium mb-2'>Phone</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View className='border border-primary-200 w-[27%] h-12 px-4 bg-primary-50 rounded-xl focus:border-primary items-center'>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <TextInput
              className='flex-1 text-primary font-semibold text-base'
              value={
                !code
                  ? `${selectedArea?.code} ${selectedArea?.callingCode}`
                  : code
              }
              placeholder='+233'
              placeholderTextColor='#CDCDE0'
              editable={false}
              onPressIn={() => setModalVisible(true)}
            />
          </TouchableOpacity>
        </View>
        <View className='border border-primary-200 w-[71%] h-12 px-4 bg-primary-50 rounded-xl focus:border-primary'>
          <TextInput
            className='flex-1 text-primary font-semibold text-base'
            value={phone}
            placeholder='207849440'
            placeholderTextColor='#CDCDE0'
            onChangeText={handlePhoneChange}
            keyboardType='number-pad'
          />
        </View>
      </View>
      {renderCountryCodesModal}
    </View>
  );
};

export default memo(CountryCodePicker);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e0f2f1',
  },
});

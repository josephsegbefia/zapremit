import { useState, useEffect, useCallback, memo, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';

import { useCountryPickerContext } from '../context/country-picker-context';
import { Ionicons } from '@expo/vector-icons';
import { countriesData } from '../constants/countries';

const { width, height } = Dimensions.get('window');

const CountryCodePicker = ({ setCountry }) => {
  const { countryData, setCountryData } = useCountryPickerContext();
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');

  useEffect(() => {
    const data = countriesData.map((country) => ({
      code: country.alpha2Code,
      name: country.name,
      callingCode: country.callingCode,
      flag: country.flag,
    }));

    setAreas(data);

    if (data.length > 0) {
      let defaultData = data.find((a) => a.code === 'GH');
      if (defaultData) {
        setSelectedArea(defaultData);
        // setCode(defaultData.code);
        setPhone(phone, defaultData.callingCode);
      }
    }
  }, []);

  useEffect(() => {
    setCountryData((prev) => ({
      ...prev,
      callingCode: callingCode,
      code: code,
      name: name,
      flag: flag,
      phone: phone,
    }));
  }, [name, code, callingCode, flag, phone]);

  const handleSelectCountry = (item) => {
    setCode(item.code);
    setCallingCode(item.callingCode);
    setFlag(item.flag);
    setName(item.name);
    setCountry(item.name);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        className='flex-row px-5 py-2'
        onPress={() => {
          setSelectedArea(item);
          setModalVisible(false);
          handleSelectCountry(item);
        }}
      >
        <Text className='text-[#004d40] text-base font-semibold'>
          {item.name} ({item.callingCode})
        </Text>
      </TouchableOpacity>
    ),
    // [phone, setPhone, setCountry]
    []
  );

  const keyExtractor = useCallback((item) => item.code, []);

  const renderCountryCodesModal = useCallback(
    () => (
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View className='flex-1 items-center justify-center'>
          <View className='h-full w-full bg-[#e0f2f1] mt-48 pb-24'>
            <FlatList
              data={areas}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <TouchableOpacity
                  className='items-end mx-5 my-2'
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name='close' size={24} color='#004d40' />
                </TouchableOpacity>
              )}
              stickyHeaderIndices={[0]}
            />
          </View>
        </View>
      </Modal>
    ),
    [modalVisible, areas, renderItem, keyExtractor]
  );

  // const handlePhoneChange = (phoneNumber) => {
  //   setPhone(phoneNumber, selectedArea?.callingCode);
  // };

  const handlePhoneChange = (e) => {
    setPhone(e);
  };

  console.log(countryData);
  return (
    <View className='w-full'>
      <Text className='text-base text-primary font-pmedium mb-2'>Phone</Text>
      <View className='flex-row gap-2'>
        <View className='border border-primary-200 w-[27%] h-12 px-4 bg-primary-50 rounded-xl focus:border-primary items-center'>
          <TouchableOpacity
          // onPress={() => setModalVisible(true)}
          >
            <TextInput
              className='flex-1 text-primary font-semibold text-base'
              value={
                `${code} ${callingCode}`
                // !code
                //   ? `${selectedArea?.code} ${selectedArea?.callingCode}`
                //   : ''
              }
              placeholder='+233'
              placeholderTextColor='#CDCDE0'
              editable={false}
              onPressOut={() => setModalVisible(true)}
              // onPressIn={() => setModalVisible(true)}
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
      {renderCountryCodesModal()}
    </View>
  );
};

export default memo(CountryCodePicker);

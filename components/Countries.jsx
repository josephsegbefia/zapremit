import { useState, useEffect, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';

import { useCountryPickerContext } from '../context/country-picker-context';
import { Ionicons } from '@expo/vector-icons';
import { countriesData } from '../constants/countries';
import FormField from './FormField';

const Countries = ({ setCountry, country }) => {
  const { countryData, setCountryData } = useCountryPickerContext();
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currencyName, setCurrencyName] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const data = countriesData.map((country) => ({
      name: country.name,
      currencyName: country.currencyName,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
      flag: country.flag,
    }));

    setLands(data);

    if (data.length > 0) {
      let defaultLand = data.find((country) => country.name === 'Germany');
      if (defaultLand) {
        setSelectedLand(defaultLand);
      }
    }
  }, []);

  const handleCountrySelect = (item) => {
    setCountry((prev) => ({
      ...prev,
      name: item.name,
      currencyCode: item.currencyCode,
      currencyName: item.currencyName,
      currencySymbol: item.currencySymbol,
      flag: item.flag,
    }));
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        className='flex-row px-5 py-2'
        onPress={() => {
          setSelectedLand(item);
          setModalVisible(false);
          handleCountrySelect(item);
        }}
      >
        <Text className='text-primary text-base font-semibold'>
          {item.name} ({item.currencyCode})
        </Text>
      </TouchableOpacity>
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.name, []);

  const filteredLands = lands.filter((land) =>
    land.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCountryNamesModal = useCallback(
    () => (
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View className='flex-1 items-center justify-center'>
          <View className='h-full w-full bg-primary-50 mt-48 pb-24'>
            <View className='mx-3 my-2 flex-row justify-between  items-center'>
              <View className='w-[90%]'>
                <FormField
                  value={searchQuery}
                  placeholder='Search for a country'
                  handleChangeText={(text) => setSearchQuery(text)}
                />
              </View>

              {/* <TextInput
                className='flex-1 bg-white border border-gray-300 rounded-lg p-2'
                placeholder='Search for a country'
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              /> */}
              <View className='mt-4'>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name='close' size={24} color='#004d40' />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={filteredLands}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    ),
    [modalVisible, filteredLands, searchQuery, renderItem, keyExtractor]
  );

  return (
    <View className='w-full'>
      <Text className='text-base text-primary font-pmedium mb-2'>
        Where would you be sending money to?
      </Text>

      <View className='border border-primary-200 h-12 px-4 bg-primary-50 rounded-xl focus:border-primary'>
        <TextInput
          className='flex-1 text-primary font-semibold text-base'
          value={country?.name && country.name}
          placeholder='Select the country to send funds to'
          placeholderTextColor='#CDCDE0'
          editable={false}
          onPressOut={() => setModalVisible(true)}
        />
      </View>

      {renderCountryNamesModal()}
    </View>
  );
};

export default memo(Countries);

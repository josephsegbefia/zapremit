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
import FormField from './FormField';
import { useCountryPickerContext } from '../context/country-picker-context';
import { Ionicons } from '@expo/vector-icons';
import { countriesData } from '../constants/countries';

const { width, height } = Dimensions.get('window');

const CountryCodePicker = ({ setCountry, country, isEditing }) => {
  const { countryData, setCountryData } = useCountryPickerContext();
  const [areas, setAreas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');
  const [completePhone, setCompletePhone] = useState('');

  useEffect(() => {
    const data = countriesData.map((country) => ({
      code: country.alpha2Code,
      name: country.name,
      callingCode: country.callingCode,
      flag: country.flag,
      currencyName: country.currencyName,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
    }));

    setAreas(data);

    if (data.length > 0) {
      let defaultData = data.find((a) => a.code === 'GH');
      if (defaultData) {
        setSelectedArea(defaultData);
      }
    }
  }, []);

  useEffect(() => {
    setCountryData((prev) => ({
      ...prev,
      // to solve the where the user doesnt change the default country.
      // When the user doesnt change the default country the country it means hes selecting ghana, this code is to make sure
      // Ghana is passed on to other parts of the app that need this data.

      callingCode: !country?.callingCode ? '+233' : country.callingCode,
      code: !country?.code ? 'GH' : country.code,
      name: !country?.name ? 'Ghana' : country.name,
      flag: !country?.flag ? 'https://flagcdn.com/w320/gh.png' : country.flag,
      phone: phone,
      currencySymbol: !country?.currencySymbol ? '₵' : currencySymbol,
      currencyCode: !country?.currencyCode ? 'GHS' : country.currencyCode,
      currencyName: !country?.currencyName
        ? 'Ghanaian cedi'
        : country.currencyName,
      completePhone: !country?.completePhone
        ? '+233' + phone
        : `${country?.callingCode}${country?.phone}`,
    }));
  }, [name, code, callingCode, flag, phone]);

  const handleSelectCountry = (item) => {
    setCountry((prev) => ({
      name: item.name,
      code: item.code,
      callingCode: item.callingCode,
      currencyCode: item.currencyCode,
      currencyName: item.currencyName,
      currencySymbol: item.currencySymbol,
      flag: item.flag,
      phone: phone,
    }));
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

    []
  );

  const filteredAreas = areas.filter((area) =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const keyExtractor = useCallback((item) => item.code, []);

  const renderCountryCodesModal = useCallback(
    () => (
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View className='flex-1 items-center justify-center'>
          <View className='h-full w-full bg-[#e0f2f1] mt-48 pb-24'>
            <View className='mx-3 my-2 flex-row justify-between  items-center'>
              <View className='w-[90%]'>
                <FormField
                  value={searchQuery}
                  placeholder='Search for a country'
                  handleChangeText={(text) => setSearchQuery(text)}
                />
              </View>

              <View className='mt-4'>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name='close' size={24} color='#004d40' />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={filteredAreas}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    ),
    [modalVisible, areas, filteredAreas, searchQuery, renderItem, keyExtractor]
  );

  const handlePhoneChange = (e) => {
    if (isEditing) {
      setCountry((prev) => ({
        ...prev,
        phone: e,
      }));
      return;
    }
    setPhone(e);
  };

  return (
    <View className='w-full'>
      <Text className='text-base text-primary font-pmedium mb-2'>Phone</Text>
      <View className='flex-row gap-2'>
        <View className='border border-primary-200 w-[27%] h-12 px-4 bg-primary-50 rounded-xl focus:border-primary items-center'>
          <TouchableOpacity
          // onPress={() => setModalVisible(true)}
          >
            <TextInput
              className='flex-1 text-primary font-semibold text-sm'
              value={
                !isEditing
                  ? !country?.code
                    ? `${selectedArea?.code} ${selectedArea?.callingCode}`
                    : `${country?.code} ${country?.callingCode}`
                  : `${country.code} ${country.callingCode}`
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
            className='flex-1 text-primary font-semibold text-sm'
            value={isEditing ? `${country?.phone}` : phone}
            // value={`${country?.phone}`}
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

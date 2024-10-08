import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import FormField from './FormField';
import { useGlobalContext } from '../context/GlobalProvider';
import { countriesData } from '../constants/countries';
import { Ionicons } from '@expo/vector-icons';

const ChangeSendCountry = ({
  country,
  setCountry,
  setModalVisible,
  updateUser,
  setIsUpdating,
  setReload,
}) => {
  const { user, refreshUser } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const data = countriesData.map((country) => ({
      name: country.name,
      countryCode: country.alpha2Code,
      callingCode: country.callingCode,
      currencyName: country.currencyName,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
      flag: country.flag,
    }));
    setLands(data);
  }, []);

  const handleCountrySelect = useCallback(
    async (item) => {
      setCountry((prev) => ({
        ...prev,
        name: item.name,
        countryCode: item.countryCode,
        currencyCode: item.currencyCode,
        currencySymbol: item.currencySymbol,
        currencyName: item.currencyName,
        callingCode: item.callingCode,
        flag: item.flag,
      }));

      const data = {
        destinationCountry: item.name,
        destinationCountryCurrencyCode: item.currencyCode,
        destinationCountryCurrencyName: item.currencyName,
        destinationCountryCode: item.countryCode,
        destinationCountryFlag: item.flag,
        destinationCountryCurrencySymbol: item.currencySymbol,
        destinationCountryCallingCode: item.callingCode,
      };

      console.log('DATA===>', data);

      try {
        setIsUpdating(true);
        const response = await updateUser(data, user.$id);
        console.log('RESPONSE====>', response);
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        setIsUpdating(false);
        setModalVisible(false);
      }
    },
    [setCountry, setIsUpdating, setModalVisible, updateUser]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        className='flex-row px-5 py-2'
        onPress={() => handleCountrySelect(item)}
      >
        <View className='flex-row justify-evenly gap-3'>
          <View className='justify-center'>
            <Image
              source={{ uri: item.flag }}
              resizeMode='contain'
              style={{ width: 30, height: 15 }}
            />
          </View>
          <Text className='text-primary text-base font-semibold'>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [handleCountrySelect]
  );

  const keyExtractor = useCallback((item) => item.name, []);

  const filteredLands = lands.filter((land) =>
    land.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View className='flex-1 items-center justify-center'>
        <View className='h-full w-full bg-primary-50 mt-48 pb-24'>
          <View className='mx-3 my-2 flex-row justify-between items-center'>
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
            data={filteredLands}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChangeSendCountry;

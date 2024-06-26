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
import { Ionicons } from '../constants/countries';
import { countriesData } from '../constants/countries';

const Countries = ({ setCountry }) => {
  const { countryData, setCountryData } = useCountryPickerContext();
  const [name, setName] = useState('');
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);

  useEffect(() => {
    const data = countriesData.map((country) => ({
      name: country.name,
      currencyName: country.currencyName,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
    }));

    setLands(data);

    if (data.length > 0) {
      let defaultLand = data.find((country) => country.name === 'Germany');
      if (defaultLand) {
        setSelectedLand(defaultLand);
      }
    }
  }, []);
  return (
    <View>
      <Text>Countries</Text>
    </View>
  );
};

export default Countries;

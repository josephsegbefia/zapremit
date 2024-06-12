import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from 'react-native';
import FormField from '../components/FormField';
import { AntDesign } from '@expo/vector-icons';
import { countriesData } from '../constants/countries';
import { SafeAreaView } from 'react-native-safe-area-context';
import { memo } from 'react';

const { width, height } = Dimensions.get('window');

const CountryCodePicker = ({ ccode, phone, handleChangeText }) => {
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
        }}
      >
        {/* <Image
          source={{ uri: item.flag }}
          style={{ height: 20, width: 20, marginRight: 5 }}
        /> */}
        <Text style={{ color: '#004d40', fontSize: 14, fontWeight: '600' }}>
          {item.name} ({item.callingCode})
        </Text>
      </TouchableOpacity>
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.code, []);

  const renderCountryCodesModal = useMemo(() => {
    return (
      <SafeAreaView>
        <Modal animationType='slide' transparent={true} visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
                  // borderRadius: 10,
                  // borderColor: '#004d40',
                  // borderWidth: 2,
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
                    <View className='items-center'>
                      <View className='border-2 border-primary-200 w-[90%] h-8 px-4 bg-primary-50 rounded-sm focus:border-primary my-10 items-center flex-row'>
                        <TextInput />
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    );
  }, [modalVisible, areas, renderItem, keyExtractor]);

  return (
    <View style={{ width: '100%' }}>
      <Text style={{ fontSize: 16, color: '#004d40', marginBottom: 8 }}>
        Phone
      </Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: '#004d40',
            width: '30%',
            height: 48,
            paddingHorizontal: 10,
            backgroundColor: '#e0f2f1',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
          // onPress={() => setModalVisible(true)}
          >
            {/* <AntDesign name='caretdown' size={12} color='#004d40' /> */}

            <TextInput
              className='flex-1 text-primary font-semibold text-base'
              value={`${selectedArea?.code} ${selectedArea?.callingCode}`}
              placeholder='+233'
              placeholderTextColor='#CDCDE0'
              onChangeText={handleChangeText}
              onPressIn={() => setModalVisible(true)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 2,
            borderColor: '#004d40',
            width: '65%',
            height: 48,
            paddingHorizontal: 10,
            backgroundColor: '#e0f2f1',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{
              flex: 1,
              marginTop: 2,
              color: '#ffffff',
              fontWeight: '400',
              fontSize: 16,
            }}
            value={phone}
            placeholder='207849440'
            placeholderTextColor='#CDCDE0'
            onChangeText={handleChangeText}
            keyboardType='number-pad'
          />
        </View>
      </View>
      {renderCountryCodesModal}
    </View>
  );
};

export default memo(CountryCodePicker);

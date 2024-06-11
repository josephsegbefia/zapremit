import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const CustomCountryPhone = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await AsyncStorage.removeItem('areas');
        const storedAreas = await AsyncStorage.getItem('areas');
        if (storedAreas) {
          const parsedAreas = JSON.parse(storedAreas);
          setAreas(parsedAreas);
          let defaultData = parsedAreas.filter((a) => a.code === 'GH');
          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        } else {
          const response = await axios.get(
            'http://api.countrylayer.com/v2/all',
            {
              params: {
                access_key: '6c495a943827cb7f7a04e5d916611753', // Replace with your actual API key
              },
            }
          );
          const data = response.data;
          let areaData = data.map((item) => {
            return {
              code: item.alpha2Code,
              item: item.name,
              callingCode: item.callingCodes[0],
              flag: item.flag,
            };
          });
          setAreas(areaData);
          await AsyncStorage.setItem('areas', JSON.stringify(areaData));
          if (areaData.length > 0) {
            let defaultData = areaData.filter((a) => a.code === 'DE');
            if (defaultData.length > 0) {
              setSelectedArea(defaultData[0]);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderAreaCodesModal = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row' }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}
        >
          <Image
            source={{ uri: item.flag }}
            style={{ height: 30, width: 30, marginRight: 10 }}
          />
          <Text style={{ fontSize: 14, color: '#004d40' }}>{item.item}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <View
              style={{
                height: 400,
                width: width * 0.8,
                backgroundColor: '#e0f2f1',
                borderRadius: 12,
              }}
            >
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                style={{ padding: 20 }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <ScrollView>
        <View>
          <Text
            style={{
              color: '#004d40',
              fontSize: 24,
              fontWeight: 'bold',
              marginVertical: 16,
            }}
          >
            Phone
          </Text>
          <Text style={{ color: '#004d40', fontSize: 14, fontWeight: '600' }}>
            Phone Number
          </Text>
          <Text style={{ fontSize: 14 }}>Add a new number</Text>

          <View style={{ width: '100%', paddingVertical: 16 }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: '#e0f2f1',
                  flexDirection: 'row',
                  borderBottomWidth: 2,
                  borderBottomColor: '#004d40',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 8,
                }}
                onPress={() => setModalVisible(true)}
              >
                <View style={{ justifyContent: 'center' }}>
                  <AntDesign name='down' size={15} color='black' />
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 8 }}>
                  <Image
                    source={{ uri: selectedArea?.flag }}
                    resizeMode='contain'
                    style={{ width: 30, height: 30 }}
                  />
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 8 }}>
                  <Text
                    style={{
                      color: '#004d40',
                      fontSize: 14,
                      fontWeight: '600',
                    }}
                  >
                    {selectedArea?.callingCode}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Phone Number input */}
              <TextInput
                style={{
                  flex: 1,
                  borderBottomWidth: 2,
                  borderBottomColor: '#004d40',
                  height: 50,
                  fontSize: 18,
                  color: '#004d40',
                }}
                placeholder='Enter phone number'
                placeholderTextColor='#009688'
                selectionColor='#004d40'
                keyboardType='number-pad'
              />
            </View>
            <TouchableOpacity
              onPress={() => console.log('pressed')}
              style={{
                backgroundColor: '#004d40',
                paddingVertical: 16,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 16,
              }}
            >
              <Text style={{ color: '#fff' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        {renderAreaCodesModal()}
      </ScrollView>
    </View>
  );
};

export default CustomCountryPhone;

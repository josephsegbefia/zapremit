import { useEffect, useState } from 'react';
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
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CustomCountryPhone = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  //  fetch codes from rescountries api

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA====>', data[0]);
        let areaData = data.map((item) => {
          return {
            code: item.alpha2Code,
            item: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://countryflagsapi.com/png/${item.name}`,
          };
        });
        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter((a) => a.code === 'DE');
          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Text className='text-sm text-primary'>{item.item}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className='flex-1 items-center justify-center'>
            <View
              style={{
                height: 400,
                width: width * 0.8,
                color: '#004d40',
                backgroundColor: '#e0f2f1',
                borderRadius: 12,
              }}
            >
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  return (
    <View className='px-8'>
      <ScrollView>
        <View>
          <Text className='text-primary text-xl font-pbold my-8'>Phone</Text>
          <Text className='text-primary text-sm font-psemibold'>
            Phone Number
          </Text>
          <Text className='font-sm font-pregular'>Add a new number</Text>

          <View className='w-[100%] px-[22px py-[66px]'>
            <View className='flex flex-row'>
              <TouchableOpacity
                className='w-[100px] h-[50px] bg-primary-50 flex flex-row border-b-2 mx-5 border-primary text-sm'
                onPress={() => setModalVisible(true)}
              >
                <View className='justify-center'>
                  <Image name='down' size={15} color='black' />
                </View>
                <View className='justify-center ml-5'>
                  <Image
                    source={{ uri: selectedArea?.flag }}
                    resizeMode='contain'
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>
                <View className='justify-center ml-5'>
                  <Text className='text-primary text-sm font-psemibold'>
                    {selectedArea?.callingCode}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Phone Number input */}
              <TextInput
                className='flex-1  border-b-2 h-[50px] text-xl text-primary'
                placeholder='Enter phone number'
                placeholderTextColor='#009688'
                selectionColor='#004d40'
                keyboardType='number-pad'
              />
            </View>
            <TouchableOpacity
              onPress={() => console.log('pressed')}
              className='bg-primary py-5 items-center my-5 justify-center'
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        {renderAreaCodesModal()}
      </ScrollView>
    </View>
  );
};

export default CustomCountryPhone;

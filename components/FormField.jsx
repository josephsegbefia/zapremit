import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../constants';

const FormField = ({
  title,
  value,
  placeholder,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-primary font-pmedium'>{title}</Text>
      <View className='border border-primary-200 w-full h-12 px-4 bg-primary-50 rounded-xl focus:border-primary items-center flex-row'>
        <TextInput
          keyboardType={keyboardType}
          className='flex-1 text-primary font-semibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={
            (title === 'Password' || title === 'Confirm Password') &&
            !showPassword
          }
        />
        {(title === 'Password' || title === 'Confirm Password') && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
        {placeholder?.includes('Search') && (
          <Ionicons name='search' size={24} color='#004d40' />
        )}
      </View>
    </View>
  );
};

export default FormField;

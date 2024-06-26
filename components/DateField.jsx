import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const DateField = ({
  title,
  otherStyles,
  placeholder,
  dob,
  setDob,
  setError,
}) => {
  // const [dob, setDob] = useState('');
  // const [error, setError] = useState('');

  const handleDateChange = (text) => {
    let input = text.replace(/[^\d]/g, '');

    // Automatically add slashes
    if (input.length > 2 && input.length <= 4) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    } else if (input.length > 4) {
      input =
        input.slice(0, 2) + '/' + input.slice(2, 4) + '/' + input.slice(4, 8);
    }

    setDob(input);

    if (input.length === 10) {
      validateDate(input);
    } else {
      setError('');
    }
  };

  const validateDate = (dateString) => {
    const [day, month, year] = dateString
      .split('/')
      .map((num) => parseInt(num, 10));

    if (
      day > 31 ||
      day <= 0 ||
      month > 12 ||
      month <= 0 ||
      year.toString().length !== 4
    ) {
      setError('Invalid date or format.');
      return;
    }

    if (month === 2 && day > 29) {
      setError('Invalid date or format.');
      return;
    }
    if (month === 2 && day === 29) {
      if (year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0)) {
        setError('Invalid date or format.');
        return;
      }
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      setError('Invalid date or format.');
      return;
    }

    const currentDate = new Date();
    const inputDate = new Date(`${year}-${month}-${day}`);
    if (inputDate > currentDate) {
      setError('Date cannot be in the future.');
      return;
    }

    setError('');
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-primary font-pmedium'>{title}</Text>
      <View className='border border-primary-200 w-full h-12 px-4 bg-primary-50 rounded-xl focus:border-primary items-center flex-row'>
        <TextInput
          keyboardType='numeric'
          className='flex-1 text-primary font-semibold text-base'
          value={dob}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleDateChange}
        />
      </View>
    </View>
  );
};

export default DateField;

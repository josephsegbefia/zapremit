import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.3}
      className={`bg-primary border-white border rounded-xl  min-h-[65px] justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
    >
      <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

import {TouchableOpacity, Text, Image, View} from 'react-native';

import type {ImageSourcePropType} from 'react-native';

interface SocialLoginButtonProps {
  image: ImageSourcePropType;
  text: string;
  textColor: string;
  bgColor: string;
  onPress: () => void;
}

const SocialLoginButton = ({
  image,
  text,
  textColor,
  bgColor,
  onPress,
}: SocialLoginButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 250,
          backgroundColor: bgColor,
          paddingHorizontal: 22,
          paddingVertical: 10,
          borderRadius: 999,
        }}>
        <Image
          source={image}
          style={{width: 30, height: 30}}
          resizeMode="contain"
        />
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontWeight: '600',
            color: textColor,
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;

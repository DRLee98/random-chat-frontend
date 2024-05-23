import styled from 'styled-components/native';

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
    <Container bgColor={bgColor} onPress={onPress}>
      <Image source={image} resizeMode="cover" />
      <Text textColor={textColor}>{text}</Text>
    </Container>
  );
};

const Container = styled.TouchableOpacity<
  Pick<SocialLoginButtonProps, 'bgColor'>
>`
  flex-direction: row;
  align-items: center;

  width: 250px;
  padding: 10px 22px;

  background-color: ${({bgColor}) => bgColor};
  border-radius: 999px;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const Text = styled.Text<Pick<SocialLoginButtonProps, 'textColor'>>`
  flex: 1;
  text-align: center;
  font-weight: 600;
  color: ${({textColor}) => textColor};
`;

export default SocialLoginButton;

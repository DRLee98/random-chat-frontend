import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import styled from 'styled-components/native';

import {areColorsSimilar, shuffleList} from '@app/utils/functions';
import {profileColors} from '@app/utils/constants';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';

interface ProfileImgProps {
  id: string;
  url?: string | null;
  size?: number;
  push?: boolean;
}

const ProfileImg = ({id, url, size = 60, push = false}: ProfileImgProps) => {
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const onPress = () => {
    if (!push) return;
    navigation.navigate(MainNavigatorScreens.User, {userId: id});
  };

  const getColor = (num: number) => {
    const list = shuffleList(profileColors, num);

    return list[+id % list.length];
  };

  const bgColor = useMemo(
    () => (url ? '' : getColor(+id % 10)),
    [profileColors, id],
  );
  const textColor = useMemo(() => {
    if (url) return '';
    let num = 8;
    let color = getColor(+id % num);
    while (true) {
      const similarColor = areColorsSimilar(color, bgColor);
      if (similarColor) {
        num++;
        color = getColor(+id % num);
      } else {
        break;
      }
    }
    return color;
  }, [profileColors, id]);

  if (!push)
    return (
      <Image url={url} size={size} bgColor={bgColor} textColor={textColor} />
    );
  return (
    <Container onPress={onPress}>
      <Image url={url} size={size} bgColor={bgColor} textColor={textColor} />
    </Container>
  );
};

interface ImageProps {
  url?: string | null;
  size: number;
  bgColor: string;
  textColor: string;
}

const Image = ({url, size, bgColor, textColor}: ImageProps) => {
  return url ? (
    <Img source={{uri: url}} size={size} />
  ) : (
    <ColorBox size={size} color={bgColor}>
      <Text size={size} color={textColor}>
        ?
      </Text>
    </ColorBox>
  );
};

interface DefaultProfileProps extends Required<Pick<ProfileImgProps, 'size'>> {
  color?: string;
}

const Container = styled.TouchableOpacity``;

const ColorBox = styled.View<DefaultProfileProps>`
  align-items: center;
  justify-content: center;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2.4}px;
  background-color: ${({color, theme}) => color ?? theme.bgColor};
`;

const Text = styled.Text<DefaultProfileProps>`
  font-size: ${({size}) => size / 1.5}px;
  font-weight: 600;
  color: ${({color, theme}) => color ?? theme.fontColor};
`;

const Img = styled.Image<Required<Pick<ProfileImgProps, 'size'>>>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2.4}px;
`;

export default ProfileImg;

import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import useMe from '@app/graphql/hooks/user/useMe';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import {shuffleList} from '@app/utils/common';
import {areColorsSimilar} from '@app/utils/color';
import {profileColors} from '@app/utils/constants';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';

interface ProfileImgProps {
  id?: string;
  url?: string | null;
  size?: number;
  push?: boolean;
}

const ProfileImg = ({id, url, size = 60, push = false}: ProfileImgProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const {me} = useMe();

  const onPress = () => {
    if (!id || !push) return;
    if (me?.id === id) return navigation.navigate(MainNavigatorScreens.Me);
    navigation.navigate(MainNavigatorScreens.User, {userId: id});
  };

  const getColor = (shuffleNumId: number, shuffleNum: number) => {
    const list = shuffleList(profileColors, shuffleNum);

    return list[+shuffleNumId % list.length];
  };

  const bgColor = useMemo(() => {
    if (url) return '';
    if (!id) return theme.gray600.default;
    return getColor(+id, +id % 10);
  }, [profileColors, id]);

  const textColor = useMemo(() => {
    if (url) return '';
    if (!id) return theme.fontColor;
    let num = 8;
    let color = getColor(+id, +id % num);
    while (true) {
      const similarColor = areColorsSimilar(color, bgColor);
      if (similarColor) {
        num++;
        color = getColor(+id, +id % num);
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
    <Img source={{uri: url}} size={size} resizeMode="cover" />
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
  background-color: ${({theme}) => theme.gray500.default};
`;

export default ProfileImg;

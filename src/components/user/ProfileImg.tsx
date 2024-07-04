import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useMe from '@app/graphql/hooks/user/useMe';

import styled from 'styled-components/native';
import PicturePreviewModal from '../common/PicturePreivewModal';

import {MainNavigatorScreens} from '@app/navigators';

import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';

interface ProfileImgProps {
  id?: string;
  url?: string | null;
  size?: number;
  push?: boolean;
  bgColor?: string | null;
  textColor?: string | null;
}

const ProfileImg = ({
  id,
  url,
  size = 60,
  push = false,
  bgColor,
  textColor,
}: ProfileImgProps) => {
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const {me} = useMe();

  const [previewModalShow, setPreviewModalShow] = useState(false);

  const onPress = () => {
    if (!id) return;
    if (!push) {
      if (url) setPreviewModalShow(true);
      return;
    }
    if (me?.id === id) return navigation.navigate(MainNavigatorScreens.Me);
    navigation.navigate(MainNavigatorScreens.User, {userId: id});
  };

  if (!push && !url)
    return (
      <>
        <Image url={url} size={size} bgColor={bgColor} textColor={textColor} />
      </>
    );
  return (
    <>
      <Container onPress={onPress}>
        <Image url={url} size={size} bgColor={bgColor} textColor={textColor} />
      </Container>
      {url && (
        <PicturePreviewModal
          urls={[url]}
          previewIndex={previewModalShow ? 0 : undefined}
          onClose={() => setPreviewModalShow(false)}
        />
      )}
    </>
  );
};

interface ImageProps extends Omit<ProfileImgProps, 'id' | 'push'> {
  size: number;
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
  color?: string | null;
}

const Container = styled.TouchableOpacity``;

const ColorBox = styled.View<DefaultProfileProps>`
  align-items: center;
  justify-content: center;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2.4}px;
  background-color: ${({color, theme}) => color || theme.bgColor};
`;

const Text = styled.Text<DefaultProfileProps>`
  font-size: ${({size}) => size / 1.5}px;
  font-weight: 600;
  color: ${({color, theme}) => color || theme.fontColor};
`;

const Img = styled.Image<Required<Pick<ProfileImgProps, 'size'>>>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2.4}px;
  background-color: ${({theme}) => theme.gray500.default};
`;

export default ProfileImg;

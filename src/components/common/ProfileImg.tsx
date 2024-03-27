import {useMemo} from 'react';

import styled from 'styled-components/native';

import {shuffleList} from '@app/utils/functions';
import {profileColors} from '@app/utils/constants';

interface ProfileImgProps {
  id: string;
  url?: string | null;
  size?: number;
}

const ProfileImg = ({id, url, size = 60}: ProfileImgProps) => {
  const getColor = (num: number) => {
    const list = shuffleList(profileColors, num);

    return list[+id % list.length];
  };

  const bgColor = useMemo(() => getColor(+id % 10), [profileColors, id]);
  const textColor = useMemo(() => {
    let num = 8;
    let color = getColor(+id % num);
    while (true) {
      if (color === bgColor) {
        num++;
        color = getColor(+id % num);
      } else {
        break;
      }
    }
    return color;
  }, [profileColors, id]);

  if (!url) {
    return (
      <ColorBox size={size} color={bgColor}>
        <Text size={size} color={textColor}>
          ?
        </Text>
      </ColorBox>
    );
  }

  return <Image source={{uri: url}} size={size} />;
};

interface DefaultProfileProps extends Required<Pick<ProfileImgProps, 'size'>> {
  color?: string;
}

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

const Image = styled.Image<Required<Pick<ProfileImgProps, 'size'>>>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2.4}px;
`;

export default ProfileImg;

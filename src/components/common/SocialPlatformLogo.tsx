import {SocialPlatform} from '@app/graphql/__generated__/graphql';
import styled from 'styled-components/native';

import naverLogo from '@app/assets/images/naver_logo.png';
import kakaoLogo from '@app/assets/images/kakao_logo.png';

interface SocialPlatformLogoProps {
  socialPlatform: SocialPlatform;
  size?: number;
}

const SocialPlatformLogo = ({
  socialPlatform,
  size = 20,
}: SocialPlatformLogoProps) => {
  const getSource = () => {
    switch (socialPlatform) {
      case SocialPlatform.Naver:
        return naverLogo;
      case SocialPlatform.Kakao:
        return kakaoLogo;
    }
  };

  return <Image size={size} source={getSource()} resizeMode="cover" />;
};

const Image = styled.Image<Required<Pick<SocialPlatformLogoProps, 'size'>>>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 10}px;
`;

export default SocialPlatformLogo;

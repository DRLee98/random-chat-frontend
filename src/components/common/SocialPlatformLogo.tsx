import useThemeMode from '@app/hooks/useThemeMode';

import styled from 'styled-components/native';

import naverLogo from '@app/assets/images/naver_logo.png';
import kakaoLogo from '@app/assets/images/kakao_logo.png';
import appleBlackLogo from '@app/assets/images/apple_black.png';
import appleWhiteLogo from '@app/assets/images/apple_white.png';

import {SocialPlatform} from '@app/graphql/__generated__/graphql';

interface SocialPlatformLogoProps {
  socialPlatform: SocialPlatform;
  size?: number;
}

const SocialPlatformLogo = ({
  socialPlatform,
  size = 20,
}: SocialPlatformLogoProps) => {
  const theme = useThemeMode();

  const getSource = () => {
    switch (socialPlatform) {
      case SocialPlatform.Naver:
        return naverLogo;
      case SocialPlatform.Kakao:
        return kakaoLogo;
      case SocialPlatform.Apple:
        return theme === 'dark' ? appleWhiteLogo : appleBlackLogo;
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

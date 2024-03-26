import styled from 'styled-components/native';

interface ProfileImgProps {
  url?: string | null;
  size?: number;
}

const ProfileImg = ({url, size = 60}: ProfileImgProps) => {
  if (!url) {
    return <DefaultImage size={size} />;
  }

  return <Image source={{uri: url}} size={size} />;
};

const DefaultImage = styled.View<Required<Pick<ProfileImgProps, 'size'>>>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2}px;
  background-color: skyblue;
`;

const Image = styled.Image<Required<Pick<ProfileImgProps, 'size'>>>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  border-radius: ${({size}) => size / 2}px;
`;

export default ProfileImg;

import {Image, View} from 'react-native';

interface ProfileImgProps {
  url?: string | null;
  size?: number;
}

const ProfileImg = ({url, size = 60}: ProfileImgProps) => {
  if (!url) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'skyblue',
        }}
      />
    );
  }

  return (
    <Image
      source={{uri: url}}
      style={{width: size, height: size, borderRadius: size / 2}}
    />
  );
};

export default ProfileImg;

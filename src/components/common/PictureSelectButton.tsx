import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import BottomSheet from './BottomSheet';
import Icon from 'react-native-vector-icons/Ionicons';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {makeFile} from '@app/utils/file';

import type {Asset} from 'react-native-image-picker';
import type {ReactNativeFileType} from '@app/utils/file';

interface PictureSelectButtonProps {
  children?: React.ReactNode;
  selectionLimit?: number;
  onChange: (file: ReactNativeFileType[]) => void;
}

const PictureSelectButton = ({
  children,
  selectionLimit,
  onChange,
}: PictureSelectButtonProps) => {
  const theme = useTheme();

  const assetToReactNativeFile = (asset: Asset): ReactNativeFileType | null => {
    if (!asset.uri || !asset.fileName || !asset.type) return null;
    return makeFile({
      uri: asset.uri,
      name: asset.fileName,
      type: asset.type,
    });
  };

  const assetToReactNativeFiles = (assets: Asset[]): ReactNativeFileType[] => {
    return assets
      .map(assetToReactNativeFile)
      .filter(Boolean) as ReactNativeFileType[];
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: selectionLimit ?? 1,
    });
    if (result.didCancel || !result.assets) {
      return null;
    }
    onChange(assetToReactNativeFiles(result.assets));
  };

  const takeImage = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (result.didCancel || !result.assets) {
      return null;
    }
    onChange(assetToReactNativeFiles(result.assets));
  };

  return (
    <BottomSheet
      buttons={[
        {text: '사진선택', onPress: pickImage},
        {text: '사진촬영', onPress: takeImage},
      ]}>
      {children ?? (
        <IconBox>
          <Icon name="camera" size={20} color={theme.gray100.default} />
        </IconBox>
      )}
    </BottomSheet>
  );
};

const IconBox = styled.View`
  width: 30px;
  height: 30px;

  align-items: center;
  justify-content: center;

  background-color: ${({theme}) => theme.bgColor};
  border: 1px solid ${({theme}) => theme.gray200.default};
  border-radius: 999px;
`;

export default PictureSelectButton;

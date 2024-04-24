import {useState} from 'react';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import {ActionSheetIOS, Modal, Platform} from 'react-native';
import Divider from '@app/components/common/Divider';
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

  const [visible, setVisible] = useState(false);

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
    if (visible) setVisible(false);
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
    if (visible) setVisible(false);
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (result.didCancel || !result.assets) {
      return null;
    }
    onChange(assetToReactNativeFiles(result.assets));
  };

  const press = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {options: ['취소', '사진선택', '사진촬영'], cancelButtonIndex: 0},
        index => {
          if (index === 1) {
            pickImage();
          }
          if (index === 2) {
            takeImage();
          }
        },
      );
    } else {
      setVisible(true);
    }
  };

  return (
    <Container>
      <Button onPress={press}>
        {children ?? (
          <IconBox>
            <Icon name="camera" size={20} color={theme.gray100.default} />
          </IconBox>
        )}
      </Button>
      {Platform.OS !== 'ios' && (
        <Modal visible={visible} transparent={true}>
          <Overlay onPress={() => setVisible(false)}>
            <ModalContainer>
              <ModalButton onPress={pickImage}>
                <ModalButtonText>사진선택</ModalButtonText>
              </ModalButton>
              <Divider />
              <ModalButton onPress={takeImage}>
                <ModalButtonText>사진촬영</ModalButtonText>
              </ModalButton>
            </ModalContainer>
          </Overlay>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.View``;

const Button = styled.TouchableOpacity``;

const IconBox = styled.View`
  width: 30px;
  height: 30px;

  align-items: center;
  justify-content: center;

  background-color: ${({theme}) => theme.bgColor};
  border: 1px solid ${({theme}) => theme.gray200.default};
  border-radius: 999px;
`;

const Overlay = styled.TouchableOpacity`
  flex: 1;
  align-items: 'center';
  justify-content: 'center';
  background-color: 'rgba(0,0,0,0.3)';
`;

const ModalContainer = styled.View`
  width: 50%;
  background-color: ${({theme}) => theme.bgColor};
  border-radius: 15px;
`;

const ModalButton = styled.TouchableOpacity`
  width: 100%;
  padding: 20px 0px;
`;

const ModalButtonText = styled.Text`
  text-align: center;
  color: rgb(10, 132, 255);
`;

export default PictureSelectButton;

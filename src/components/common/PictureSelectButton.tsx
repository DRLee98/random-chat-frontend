import {useState} from 'react';

import styled from 'styled-components/native';

import {ActionSheetIOS, Modal, Platform} from 'react-native';
import Divider from './Divider';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {makeFile} from '@app/utils/file';

import type {Asset} from 'react-native-image-picker';
import type {ReactNativeFileType} from '@app/utils/file';

interface PictureSelectButtonProps {
  children: React.ReactNode;
  onChange: (file: ReactNativeFileType) => void;
}

const PictureSelectButton = ({
  children,
  onChange,
}: PictureSelectButtonProps) => {
  const [visible, setVisible] = useState(false);

  const assetToReactNativeFile = (asset: Asset) => {
    if (!asset.uri || !asset.fileName || !asset.type) return null;
    return makeFile({
      uri: asset.uri,
      name: asset.fileName,
      type: asset.type,
    });
  };

  const pickImage = async () => {
    if (visible) setVisible(false);
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.didCancel || !result.assets) {
      return null;
    }
    onChange(assetToReactNativeFile(result.assets[0]));
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
    onChange(assetToReactNativeFile(result.assets[0]));
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
    <>
      {Platform.OS !== 'ios' && (
        <Modal visible={visible} transparent={true}>
          <Overlay onPress={() => setVisible(false)}>
            <Container>
              <ModalButton onPress={pickImage}>
                <ModalButtonText>사진선택</ModalButtonText>
              </ModalButton>
              <Divider />
              <ModalButton onPress={takeImage}>
                <ModalButtonText>사진촬영</ModalButtonText>
              </ModalButton>
            </Container>
          </Overlay>
        </Modal>
      )}
      <Button onPress={press}>{children}</Button>
    </>
  );
};

const Overlay = styled.TouchableOpacity`
  flex: 1;
  align-items: 'center';
  justify-content: 'center';
  background-color: 'rgba(0,0,0,0.3)';
`;

const Container = styled.View`
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

const Button = styled.TouchableOpacity``;

export default PictureSelectButton;

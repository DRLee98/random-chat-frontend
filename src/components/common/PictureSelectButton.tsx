import {useState} from 'react';

import styled from 'styled-components/native';

import {ActionSheetIOS, Modal, Platform, TouchableOpacity} from 'react-native';
import Divider from './Divider';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import type {Asset} from 'react-native-image-picker';

interface PictureSelectButtonProps {
  children: React.ReactNode;
  onChange: (asset: Asset) => void;
}

const PictureSelectButton = ({
  children,
  onChange,
}: PictureSelectButtonProps) => {
  const [visible, setVisible] = useState(false);

  const pickImage = async () => {
    if (visible) setVisible(false);
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.didCancel || !result.assets) {
      return null;
    }
    onChange(result.assets[0]);
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
    onChange(result.assets[0]);
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
              <Button onPress={pickImage}>
                <ButtonText>사진선택</ButtonText>
              </Button>
              <Divider />
              <Button onPress={takeImage}>
                <ButtonText>사진촬영</ButtonText>
              </Button>
            </Container>
          </Overlay>
        </Modal>
      )}
      <TouchableOpacity onPress={press}>{children}</TouchableOpacity>
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

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 20px 0px;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: rgb(10, 132, 255);
`;

export default PictureSelectButton;

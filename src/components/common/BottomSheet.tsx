import {Fragment, useState} from 'react';

import styled from 'styled-components/native';

import {ActionSheetIOS, Modal, Platform} from 'react-native';
import Divider from '@app/components/common/Divider';

export interface BottomSheetButton {
  text: string;
  onPress: () => void;
}

interface BottomSheetProps {
  children: React.ReactNode;
  buttons: BottomSheetButton[];
}

const BottomSheet = ({children, buttons}: BottomSheetProps) => {
  const [visible, setVisible] = useState(false);

  const onPressFn = (fn: () => void) => () => {
    setVisible(false);
    fn();
  };

  const press = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['취소', ...buttons.map(btn => btn.text)],
          cancelButtonIndex: 0,
        },
        index => {
          if (index > 0) {
            onPressFn(buttons[index - 1].onPress)();
          }
        },
      );
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <Button onPress={press}>{children}</Button>
      {Platform.OS !== 'ios' && (
        <Modal visible={visible} transparent={true}>
          <Overlay onPress={() => setVisible(false)}>
            <ModalContainer>
              {buttons.map((button, index) => (
                <Fragment key={`bottom-sheet-button-${index}`}>
                  {index > 0 && <Divider />}
                  <ModalButton onPress={onPressFn(button.onPress)}>
                    <ModalButtonText>{button.text}</ModalButtonText>
                  </ModalButton>
                </Fragment>
              ))}
            </ModalContainer>
          </Overlay>
        </Modal>
      )}
    </>
  );
};

const Button = styled.TouchableOpacity``;

const Overlay = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
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

export default BottomSheet;

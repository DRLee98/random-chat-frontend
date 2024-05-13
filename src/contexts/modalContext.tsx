import {createContext, useContext, useState} from 'react';

import styled from 'styled-components/native';
import {Modal, ModalBaseProps} from 'react-native';
import BreakText from '@app/components/common/BreakText';

interface ModalButton {
  onPress?: () => void;
  text: string;
  bgColor?: string;
  textColor?: string;
}

export interface ModalProps
  extends Omit<ModalBaseProps, 'visible' | 'transparent'> {
  title?: string;
  message?: string;
  children?: React.ReactNode;
  buttons?: ModalButton[];
}

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext<
  React.Dispatch<React.SetStateAction<ModalProps | undefined>> | undefined
>(undefined);

const ModalProvider = ({children}: ModalProviderProps) => {
  const [modal, setModal] = useState<ModalProps | undefined>(undefined);

  const closeModal = () => {
    setModal(undefined);
  };

  return (
    <ModalContext.Provider value={setModal}>
      <Modal
        visible={Boolean(modal)}
        transparent
        animationType={modal?.animationType}
        onRequestClose={modal?.onRequestClose}
        onShow={modal?.onShow}>
        <Overlay activeOpacity={0} onPress={closeModal}>
          {modal && (
            <Container>
              <ContentBox>
                {modal.title && <Title>{modal.title}</Title>}
                {modal.message && <Message text={modal.message} />}
                {modal.children}
              </ContentBox>
              <ButtonBox>
                {modal.buttons?.map((button, index) => (
                  <Button
                    key={`modal-button-${index}`}
                    bgColor={button.bgColor}
                    onPress={() => {
                      button.onPress?.();
                      closeModal();
                    }}>
                    <ButtonText textColor={button.textColor}>
                      {button.text}
                    </ButtonText>
                  </Button>
                ))}
              </ButtonBox>
            </Container>
          )}
        </Overlay>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const setModal = useContext(ModalContext);

  if (!setModal) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return (props: ModalProps) => {
    setModal(props);
  };
};

const Overlay = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.View`
  width: 70%;
  background-color: ${({theme}) => theme.bgColor};
  border-radius: 10px;

  overflow: hidden;
`;

const ContentBox = styled.View`
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-height: 120px;

  padding: 25px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColor};
`;

const Message = styled(BreakText)`
  font-size: 14px;
  color: ${({theme}) => theme.fontColor};
`;

const ButtonBox = styled.View`
  flex-direction: row;
  gap: 10px;
  padding: 15px;
  padding-top: 0px;
`;

const Button = styled.TouchableOpacity<Pick<ModalButton, 'bgColor'>>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  background-color: ${({bgColor, theme}) => bgColor || theme.gray600.default};
  border-radius: 10px;
`;

const ButtonText = styled.Text<Pick<ModalButton, 'textColor'>>`
  font-size: 14px;
  font-weight: 600;
  color: ${({textColor, theme}) => textColor || theme.fontColor};
`;

export default ModalProvider;

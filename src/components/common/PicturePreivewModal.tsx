import styled from 'styled-components/native';

interface PicturePreviewModalProps {
  uri?: string;
  onClose: () => void;
}

const PicturePreviewModal = ({uri, onClose}: PicturePreviewModalProps) => {
  return (
    <Modal transparent animationType="slide" visible={Boolean(uri)}>
      <ModalOverlay activeOpacity={1} onPress={onClose}>
        <Picture source={{uri}} resizeMode="contain" />
      </ModalOverlay>
    </Modal>
  );
};

const Modal = styled.Modal`
  background-color: ${({theme}) => theme.gray700.default};
`;

const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.4);
`;

const Picture = styled.Image`
  flex: 1;
  width: 80%;
`;

export default PicturePreviewModal;

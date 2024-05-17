import {useState} from 'react';

import styled from 'styled-components/native';

import BaseIcon from 'react-native-vector-icons/Ionicons';
import PictureSelectButton from '@app/components/common/PictureSelectButton';
import PicturePreviewModal from './PicturePreivewModal';

import type {ReactNativeFileType} from '@app/utils/file';

interface PictureListProps {
  pictures: ReactNativeFileType[];
  limitCount?: number;
  edit?: boolean;
  onChaneg?: (value: ReactNativeFileType[]) => void;
}

const PictureList = ({
  pictures,
  limitCount = 5,
  edit,
  onChaneg,
}: PictureListProps) => {
  const urls = pictures.map(p => p.uri);

  const [previewUriIndex, setPreviewUriIndex] = useState<number>();

  const onSelectedPictures = (images: ReactNativeFileType[]) => {
    onChaneg?.([...pictures, ...images]);
  };

  const onRemovePicture = (index: number) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    onChaneg?.(newPictures);
  };

  return (
    <>
      <List horizontal>
        {edit && (
          <PictureSelectButton
            selectionLimit={limitCount - (pictures.length ?? 0)}
            onChange={onSelectedPictures}>
            <CameraButton>
              <Icon name="camera" size={30} />
              <PictureCount>
                {pictures.length ?? 0}/{limitCount}
              </PictureCount>
            </CameraButton>
          </PictureSelectButton>
        )}
        {pictures.map((image, index) => (
          <PictureBox
            key={`image-${index}`}
            activeOpacity={1}
            onPress={() => setPreviewUriIndex(index)}>
            <Picture source={{uri: image.uri}}>
              {edit && (
                <PictureDeleteButton onPress={() => onRemovePicture(index)}>
                  <Icon name="close" size={15} />
                </PictureDeleteButton>
              )}
            </Picture>
          </PictureBox>
        ))}
      </List>
      <PicturePreviewModal
        urls={urls}
        previewIndex={previewUriIndex}
        onClose={() => setPreviewUriIndex(undefined)}
      />
    </>
  );
};

interface UrlPictureListProps {
  pictures: string[];
}

export const UrlPictureList = ({pictures}: UrlPictureListProps) => {
  const [previewUriIndex, setPreviewUriIndex] = useState<number>();

  return (
    <>
      <List horizontal>
        {pictures.map((url, index) => (
          <PictureBox
            key={`image-${index}`}
            activeOpacity={1}
            onPress={() => setPreviewUriIndex(index)}>
            <Picture source={{uri: url}} />
          </PictureBox>
        ))}
      </List>
      <PicturePreviewModal
        urls={pictures}
        previewIndex={previewUriIndex}
        onClose={() => setPreviewUriIndex(undefined)}
      />
    </>
  );
};
const List = styled.ScrollView``;

const PictureBox = styled.TouchableOpacity``;

const Picture = styled.ImageBackground`
  position: relative;

  margin-left: 10px;

  width: 80px;
  aspect-ratio: 1;
  border-radius: 10px;

  overflow: hidden;
`;

const PictureDeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 5px;

  background-color: ${({theme}) => theme.gray700.default};
  border-radius: 5px;
`;

const CameraButton = styled.View`
  align-items: center;
  justify-content: center;

  width: 80px;
  aspect-ratio: 1;

  background-color: ${({theme}) => theme.gray700.default};
  border: 1px solid ${({theme}) => theme.gray200.default};
  border-radius: 10px;
`;

const Icon = styled(BaseIcon)`
  color: ${({theme}) => theme.gray100.default};
`;

const PictureCount = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme}) => theme.gray100.default};
`;

export default PictureList;

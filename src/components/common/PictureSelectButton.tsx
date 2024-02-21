import {useState} from 'react';

import {
  ActionSheetIOS,
  Modal,
  Platform,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

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
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>사진선택</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.button} onPress={takeImage}>
                <Text style={styles.buttonText}>사진촬영</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
      <TouchableOpacity onPress={press}>{children}</TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  button: {
    width: '100%',
    paddingVertical: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(10, 132, 255)',
  },
  divider: {
    borderBottomColor: 'rgb(174,174,178)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default PictureSelectButton;

import {
  Alert,
  AlertButton,
  Linking,
  NativeModules,
  Platform,
} from 'react-native';

interface AlertFnProps {
  title: string;
  message?: string;
  confirmText?: string;
  confirmStyle?: AlertButton['style'];
  onConfirm: () => void;
}

export const AlertFn = ({
  title,
  message,
  confirmText,
  confirmStyle,
  onConfirm,
}: AlertFnProps) => {
  Alert.alert(title, message, [
    {text: '취소', style: 'cancel'},
    {
      text: confirmText ?? '확인',
      style: confirmStyle ?? 'default',
      onPress: onConfirm,
    },
  ]);
};

export function openAppSettings() {
  if (Platform.OS === 'ios') Linking.openSettings();
  if (Platform.OS === 'android') {
    Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS');
  }
}

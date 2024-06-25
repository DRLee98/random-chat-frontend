import messaging from '@react-native-firebase/messaging';

export function requestUserPermission() {
  return messaging().requestPermission();
}

export async function messagingEnabled() {
  const authStatus = await messaging().hasPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
}

export async function getFcmToken() {
  try {
    const enabled = await messagingEnabled();
    if (!enabled) return undefined;
    return messaging().getToken();
  } catch (error) {
    return undefined;
  }
}

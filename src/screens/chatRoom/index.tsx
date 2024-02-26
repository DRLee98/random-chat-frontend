import {Text, View} from 'react-native';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';

export interface ChatRoomScreenParams {
  roomId: string;
}

interface ChatRoomScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.ChatRoom
  > {}

const ChatRoomScreen = ({route}: ChatRoomScreenProps) => {
  return (
    <View>
      <Text>Chat Room {route.params.roomId}</Text>
    </View>
  );
};

export default ChatRoomScreen;

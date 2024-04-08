import {useLayoutEffect, useState} from 'react';
import {useUpdateMyRooms} from '@app/graphql/hooks/room/useMyRooms';
import {useUpdateRoomDetail} from '@app/graphql/hooks/room/useRoomDetail';
import useUpdateRoom from '@app/graphql/hooks/room/useUpdateRoom';
import {useTheme} from 'styled-components/native';

import styled from 'styled-components/native';

import UnderlineInput from '@app/components/common/UnderlineInput';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';

export interface ChatRoomEditScreenParams {
  roomId: string;
  userRoomId: string;
  userRoomName: string;
}

interface ChatRoomEditScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.ChatRoomEdit
  > {}

const ChatRoomEditScreen = ({route, navigation}: ChatRoomEditScreenProps) => {
  const {roomId, userRoomId, userRoomName} = route.params;

  const theme = useTheme();

  const [value, setValue] = useState(userRoomName);

  const [updateRoom] = useUpdateRoom();
  const {updateMyRoom} = useUpdateMyRooms();
  const {updateRoomDetail} = useUpdateRoomDetail({roomId});

  const onEditRoomName = async () => {
    if (value === userRoomName) return;
    const {data} = await updateRoom({
      variables: {
        input: {
          userRoomId,
          name: value,
        },
      },
    });
    if (data?.updateRoom.ok) {
      updateRoomDetail({name: value});
      updateMyRoom(userRoomId, {name: value});
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={onEditRoomName}
          disabled={value === userRoomName || value === ''}>
          <ButtonText
            style={{
              color:
                value === userRoomName || value === ''
                  ? theme.gray100.default
                  : theme.fontColor,
            }}>
            저장
          </ButtonText>
        </Button>
      ),
    });
  }, [value]);

  return (
    <Container>
      <UnderlineInput
        value={value}
        onChange={e => setValue(e.nativeEvent.text)}
        returnKeyType="done"
        maxLength={50}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;

  padding: 20px;

  background-color: ${({theme}) => theme.bgColor};
`;

const Button = styled.TouchableOpacity``;

const ButtonText = styled.Text``;

export default ChatRoomEditScreen;
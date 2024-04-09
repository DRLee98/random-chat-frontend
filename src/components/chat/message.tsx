import styled from 'styled-components/native';
import ProfileImg from '@app/components/common/ProfileImg';

import {getTimestamp} from '@app/utils/functions';

import type {BundledMessage} from '@app/screens/chatRoom';

interface MessageProps extends BundledMessage {
  myMessage: boolean;
}

const Message = ({
  myMessage,
  contents,
  createdAt,
  user,
  systemMessage,
}: MessageProps) => {
  if (systemMessage)
    return (
      <SystemMessageBox>
        {contents.map((item, i) => (
          <SystemMessage key={`system-message-${i}`}>
            {item.contents}
          </SystemMessage>
        ))}
      </SystemMessageBox>
    );
  return (
    <Row myMessage={myMessage}>
      {!myMessage && (
        <ProfileImg size={32} id={user.id} url={user.profileUrl} push={true} />
      )}
      <TextList>
        {contents.map((item, i, list) => (
          <Row key={`contents-${i}`} myMessage={myMessage}>
            <TextBubble myMessage={myMessage}>
              <Text>{item.contents}</Text>
            </TextBubble>
            <Column>
              {item.unReadCount > 0 && (
                <UnReadCount myMessage={myMessage}>
                  {item.unReadCount}
                </UnReadCount>
              )}
              {i === list.length - 1 && <Time>{getTimestamp(createdAt)}</Time>}
            </Column>
          </Row>
        ))}
      </TextList>
    </Row>
  );
};

const Row = styled.View<Pick<MessageProps, 'myMessage'>>`
  flex-direction: ${({myMessage}) => (myMessage ? 'row-reverse' : 'row')};
  gap: 5px;

  padding-top: 5px;
`;

const Column = styled.View`
  margin-bottom: 2px;
  align-self: flex-end;
`;

const TextList = styled.View`
  max-width: 60%;
`;

const TextBubble = styled.View<Pick<MessageProps, 'myMessage'>>`
  padding: 12px;

  background-color: ${({myMessage, theme}) =>
    myMessage ? theme.orange.default : theme.gray500.default};
  border-radius: 16px;
`;

const Text = styled.Text`
  color: ${({theme}) => theme.fontColor};
`;

const UnReadCount = styled.Text<Pick<MessageProps, 'myMessage'>>`
  align-self: ${({myMessage}) => (myMessage ? 'flex-end' : 'flex-start')};
  color: ${({theme}) => theme.orange.default};
  font-size: 12px;
  font-weight: 600;
`;

const Time = styled.Text`
  color: ${({theme}) => theme.gray100.default};
  font-size: 11px;
`;

const SystemMessageBox = styled.View`
  padding-top: 25px;

  align-items: center;
`;

const SystemMessage = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.gray100.default};
`;

export default Message;

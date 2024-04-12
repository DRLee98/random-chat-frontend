import styled from 'styled-components/native';
import ProfileImg from '@app/components/common/ProfileImg';
import Timestamp from '@app/components/common/Timestamp';

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
              <Text myMessage={myMessage}>{item.contents}</Text>
            </TextBubble>
            <Column>
              {item.unReadCount > 0 && (
                <UnReadCount myMessage={myMessage}>
                  {item.unReadCount}
                </UnReadCount>
              )}
              {i === list.length - 1 && (
                <Timestamp date={createdAt} type="time" />
              )}
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
    myMessage ? theme.primary.default : theme.gray500.default};
  border-radius: 16px;
`;

const Text = styled.Text<Pick<MessageProps, 'myMessage'>>`
  color: ${({myMessage, theme}) =>
    myMessage ? theme.bgColor : theme.fontColor};
`;

const UnReadCount = styled.Text<Pick<MessageProps, 'myMessage'>>`
  align-self: ${({myMessage}) => (myMessage ? 'flex-end' : 'flex-start')};
  color: ${({theme}) => theme.primary.default};
  font-size: 12px;
  font-weight: 600;
`;

const SystemMessageBox = styled.View`
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 5px 0;

  align-items: center;

  background-color: ${({theme}) => theme.gray700.default};
  opacity: 0.8;
`;

const SystemMessage = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.gray100.default};
`;

export default Message;

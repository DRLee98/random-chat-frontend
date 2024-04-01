import styled from 'styled-components/native';

import type {ViewMessagesQuery} from '@app/graphql/__generated__/graphql';

interface MessageProps
  extends Required<ViewMessagesQuery['viewMessages']['messages'][0]> {
  unReadCount: number;
}

const Message = ({unReadCount}: MessageProps) => {
  return <Container></Container>;
};

const Container = styled.View``;

export default Message;

import {useState} from 'react';
import useCommentCount, {
  useUpdateCommentCount,
} from '@app/graphql/hooks/comment/useCommentCount';
import useCreateComment from '@app/graphql/hooks/comment/useCreateComment';
import useViewComments, {
  useUpdateViewComments,
} from '@app/graphql/hooks/comment/useViewComments';

import styled from 'styled-components/native';
import UnderlineInput from '../common/input/UnderlineInput';
import Btn from '../common/Button';
import ProfileImg from '../user/ProfileImg';
import Timestamp from '../common/Timestamp';

import type {FlatListProps} from 'react-native';
import type {CommentBaseFragment} from '@app/graphql/__generated__/graphql';

interface CommentListProps {
  children: React.ReactNode;
  postId: string;
}

const CommentList = ({children, postId}: CommentListProps) => {
  const {count} = useCommentCount({postId});
  const {comments, fetchMore} = useViewComments({postId});

  const {updateIncreaseCommentCount} = useUpdateCommentCount({postId});
  const {appendViewComment} = useUpdateViewComments({postId});

  const [createComment, {loading}] = useCreateComment();

  const [value, setValue] = useState('');

  const onCreaeteComment = async () => {
    if (value === '') return;
    const {data} = await createComment({
      variables: {
        input: {
          postId,
          text: value,
        },
      },
    });

    if (!data || !data.createComment.ok || !data.createComment.comment) return;
    updateIncreaseCommentCount(1);
    appendViewComment(data.createComment.comment);
    setValue('');
  };

  return (
    <Container
      data={comments}
      ListHeaderComponent={
        <>
          {children}
          <Header>
            <CommentCount>댓글 {count}개</CommentCount>
            <InputBox>
              <Input
                value={value}
                onChangeText={setValue}
                placeholder="댓글을 입력해 주세요."
                returnKeyType="done"
                returnKeyLabel="작성"
                onSubmitEditing={onCreaeteComment}
              />
              <Button onPress={onCreaeteComment} disabled={loading}>
                {/* <Loading /> */}
                <ButtonText>작성</ButtonText>
              </Button>
            </InputBox>
          </Header>
        </>
      }
      renderItem={({item}) => (
        <ListItem>
          <ProfileImg
            id={item.user.id}
            url={item.user.profileUrl}
            size={40}
            push
          />
          <ContentBox>
            <NicknameBox>
              <Nickname>{item.user.nickname}</Nickname>
              <Timestamp date={item.updatedAt} type="date" />
            </NicknameBox>
            <Text>{item.text}</Text>
          </ContentBox>
        </ListItem>
      )}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.id}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.7}
    />
  );
};

const Container = styled.FlatList<FlatListProps<CommentBaseFragment>>`
  flex: 1;

  padding: 0 20px;
  padding-top: 20px;

  background-color: ${({theme}) => theme.bgColor};
`;

const Header = styled.View`
  flex: 1;
`;

const CommentCount = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme}) => theme.gray100.default};
`;

const InputBox = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  margin-top: 5px;
  margin-bottom: 20px;
`;

const Input = styled(UnderlineInput)`
  flex: 1;
`;

const Button = styled(Btn)`
  height: 100%;
  padding: 0 15px;

  border-radius: 5px;
`;

const ButtonText = styled.Text`
  font-weight: 600;
  color: ${({theme}) => theme.bgColor};
`;

const ListItem = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const ContentBox = styled.View`
  padding-top: 4px;
`;

const NicknameBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;

  margin-bottom: 2px;
`;

const Nickname = styled.Text`
  font-size: 12px;
  font-weight: bold;

  color: ${({theme}) => theme.fontColor};
`;

const Text = styled.Text`
  width: 80%;

  color: ${({theme}) => theme.fontColor};
`;

const Separator = styled.View`
  height: 15px;
`;

const Loading = styled.ActivityIndicator``;

export default CommentList;

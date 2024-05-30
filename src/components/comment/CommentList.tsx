import {useState} from 'react';
import useCommentCount, {
  useUpdateCommentCount,
} from '@app/graphql/hooks/comment/useCommentCount';
import useCreateComment from '@app/graphql/hooks/comment/useCreateComment';
import useViewComments, {
  useUpdateViewComments,
} from '@app/graphql/hooks/comment/useViewComments';
import useNewCommentListener from '@app/graphql/hooks/comment/useNewCommentListener';
import {useModal} from '@app/contexts/modalContext';

import styled from 'styled-components/native';

import Btn from '../common/Button';
import BorderInput from '../common/input/BorderInput';
import ProfileImg from '../user/ProfileImg';
import Timestamp from '../common/Timestamp';
import Loader from '../common/Loader';

import {COMMENT_BASE} from '@app/graphql/fragments/comment';

import type {FlatListProps} from 'react-native';
import type {CommentBaseFragment} from '@app/graphql/__generated__/graphql';
import type {FragmentType} from '@app/graphql/__generated__';

interface CommentListProps {
  children: React.ReactNode;
  postId: string;
}

const CommentList = ({children, postId}: CommentListProps) => {
  const showModal = useModal();

  const {count} = useCommentCount({postId});
  const {comments, fetchMore} = useViewComments({postId});

  const {updateIncreaseCommentCount} = useUpdateCommentCount({postId});
  const {appendViewComment} = useUpdateViewComments({postId});

  const [createComment, {loading}] = useCreateComment();

  const [value, setValue] = useState('');

  const appendComment = (comment?: FragmentType<typeof COMMENT_BASE>) => {
    if (!comment) return;

    updateIncreaseCommentCount(1);
    appendViewComment(comment);
  };

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

    if (data?.createComment.comment) {
      appendComment(data.createComment.comment);
      setValue('');
    }
    if (data?.createComment.error) {
      showModal({
        title: '댓글 작성에 실패했어요',
        message: data.createComment.error,
        buttons: [{text: '확인'}],
      });
    }
  };

  useNewCommentListener({
    variables: {input: {postId}},
    onData: ({data}) => appendComment(data.data?.newComment),
  });

  return (
    <Container>
      <List
        data={comments}
        ListHeaderComponent={
          <>
            {children}
            <Header>
              <CommentCount>댓글 {count}개</CommentCount>
            </Header>
          </>
        }
        renderItem={({item}) => (
          <ListItem>
            <ProfileImg
              id={item.user.id}
              url={item.user.profileUrl}
              bgColor={item.user.profileBgColor}
              textColor={item.user.profileTextColor}
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
        ListFooterComponent={Footer}
        keyExtractor={item => item.id}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.7}
      />
      <InputBox>
        <BorderInput
          value={value}
          onChangeText={setValue}
          placeholder="댓글을 입력해 주세요."
          returnKeyType="done"
          returnKeyLabel="작성"
          onSubmitEditing={onCreaeteComment}
          right={
            <Button onPress={onCreaeteComment} disabled={loading}>
              {loading ? <Loader /> : <ButtonText>작성</ButtonText>}
            </Button>
          }
        />
      </InputBox>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  padding-bottom: 20px;
  background-color: ${({theme}) => theme.bgColor};
`;

const List = styled.FlatList<FlatListProps<CommentBaseFragment>>`
  padding: 20px;
`;

const Header = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

const Footer = styled.View`
  height: 40px;
`;

const CommentCount = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme}) => theme.gray100.default};
`;

const InputBox = styled.View`
  height: 50px;

  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  padding: 0 10px;
  padding-top: 10px;
  /* border-top-width: 1px;
  border-top-color: ${({theme}) => theme.gray500.default}; */
`;

const Button = styled(Btn)`
  height: 40px;
  aspect-ratio: 1;

  border-radius: 999px;
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

export default CommentList;

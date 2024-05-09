import {useEffect} from 'react';
import useOpinionDetail from '@app/graphql/hooks/opinion/useOpinionDetail';
import useDeleteOpinion from '@app/graphql/hooks/opinion/useDeleteOpinion';
import {useUpdateMyOpinions} from '@app/graphql/hooks/opinion/useMyOpinions';

import styled from 'styled-components/native';

import Divider from '@app/components/common/Divider';
import PictureList from '@app/components/common/PictureList';
import CommentList from '@app/components/comment/CommentList';

import {convertOpinionCategory, convertOpinionStatus} from '@app/utils/enum';
import {getDateTimeString} from '@app/utils/date';
import {AlertFn} from '@app/utils/app';

import {SettingsNavigatorScreens} from '@app/navigators/settings';
import {OpinionStatus} from '@app/graphql/__generated__/graphql';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';

export interface OpinionDetailScreenParams {
  id: string;
}

interface OpinionDetailScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.OpinionDetail
  > {}

const OpinionDetailScreen = ({navigation, route}: OpinionDetailScreenProps) => {
  const id = route.params.id;

  const {opinion} = useOpinionDetail({id});
  const {removeMyOpinion} = useUpdateMyOpinions();

  const [deleteOpinion] = useDeleteOpinion();

  const deleteOpinionFn = async () => {
    const {data} = await deleteOpinion({variables: {input: {id}}});

    if (data?.deleteOpinion.ok) {
      removeMyOpinion(id);
      navigation.pop();
    }
  };

  const onDeletePress = () => {
    AlertFn({
      title: '의견 삭제',
      message: `${opinion?.title} 의견을 삭제 하시겠습니까?`,
      onConfirm: deleteOpinionFn,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonBox>
          {/* {opinion?.status === OpinionStatus.Waiting && (
            <Button>
              <ButtonText>수정</ButtonText>
            </Button>
          )} */}
          {opinion?.status !== OpinionStatus.Read && (
            <Button onPress={onDeletePress}>
              <ButtonText>삭제</ButtonText>
            </Button>
          )}
        </ButtonBox>
      ),
    });
  }, [opinion]);

  if (!opinion) return null;
  return (
    <CommentList postId={opinion.id}>
      <Container>
        <Title>{opinion?.title}</Title>
        <InfoBox>
          <CategoryBox>
            <Category>
              {opinion && convertOpinionCategory(opinion.category)}
            </Category>
          </CategoryBox>
          <Date>{getDateTimeString(opinion?.createdAt)}</Date>
          <Status>{opinion && convertOpinionStatus(opinion.status)}</Status>
        </InfoBox>
        <Divider />
        <Content>{opinion?.content}</Content>
      </Container>
    </CommentList>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColor};
`;

const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;

  margin-top: 10px;
  margin-bottom: 20px;
`;

const CategoryBox = styled.View`
  padding: 3px 8px;

  border-radius: 10px;
  background-color: ${({theme}) => theme.primary.default};
`;

const Category = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme}) => theme.gray700.default};
`;

const Date = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.gray100.default};
`;

const Status = styled.Text`
  flex: 1;

  font-size: 14px;
  font-weight: 600;
  text-align: right;
  color: ${({theme}) => theme.fontColor};
`;

const Content = styled.Text`
  margin: 20px 0;

  font-size: 14px;
  color: ${({theme}) => theme.fontColor};
`;

const ButtonBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Button = styled.TouchableOpacity``;

const ButtonText = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.fontColor};
`;

export default OpinionDetailScreen;

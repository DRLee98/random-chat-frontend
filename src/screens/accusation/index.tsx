import useCreateAccusation from '@app/graphql/hooks/accusation/useCreateAccusation';
import useForm from '@app/hooks/useForm';
import {useModal} from '@app/contexts/modalContext';

import styled from 'styled-components/native';

import BorderInput from '@app/components/common/input/BorderInput';
import Btn from '@app/components/common/Button';
import PictureList from '@app/components/common/PictureList';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';
import type {CreateAccusationInput} from '@app/graphql/__generated__/graphql';
import type {ReactNativeFileType} from '@app/utils/file';

interface FormValues
  extends Omit<CreateAccusationInput, 'images' | 'targetUserId'> {
  images?: ReactNativeFileType[];
}

export interface AccusationScreenParams {
  userId: string;
}

interface AccusationScreenProps
  extends StackScreenProps<
    MainNavigatorParamList,
    MainNavigatorScreens.Accusation
  > {}

const AccusationScreen = ({route, navigation}: AccusationScreenProps) => {
  const showModal = useModal();

  const [createAccusation, {loading}] = useCreateAccusation();

  const {getProps, setFieldValue, values} = useForm<FormValues>({
    initialValues: {
      content: '',
    },
  });

  const onChangeImages = (images: ReactNativeFileType[]) => {
    setFieldValue('images', images);
  };

  const onCreateAccusation = async () => {
    if (!values.content) return;
    if (loading) return;

    const input: FormValues = {
      ...values,
    };

    const {data} = await createAccusation({
      variables: {
        input: {
          ...input,
          targetUserId: route.params.userId,
        },
      },
    });

    if (data?.createAccusation.ok) {
      showModal({
        title: '신고가 접수되었습니다.',
        message: '신고 사유를 확인 후 조치하겠습니다.',
        buttons: [{text: '확인', onPress: () => navigation.goBack()}],
      });
    }
    if (data?.createAccusation.error) {
      showModal({
        title: '신고 작성에 실패했어요',
        message: data.createAccusation.error,
        buttons: [{text: '확인'}],
      });
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <InputBox>
          <Input
            multiline
            placeholder="신고 사유를 작성해 주세요."
            textAlignVertical="top"
            radius={12}
            {...getProps('content')}
          />
          <PictureList
            edit
            pictures={values.images ?? []}
            onChaneg={onChangeImages}
          />
          <HeightBox />
        </InputBox>
        <ButtonBox>
          <Button
            onPress={onCreateAccusation}
            disabled={!values.content || loading}>
            <ButtonText>{loading ? '작성 중...' : '작성하기'}</ButtonText>
          </Button>
        </ButtonBox>
      </Container>
    </SafeAreaView>
  );
};

const SafeAreaView = styled.SafeAreaView`
  flex: 1;

  background-color: ${({theme}) => theme.bgColor};
`;

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const InputBox = styled.ScrollView`
  flex: 1;

  padding: 10px 20px;
`;

const Input = styled(BorderInput)`
  flex: 1;
  height: auto;
  min-height: 200px;
  max-height: 100%;
  padding: 15px 3px;
  margin: 10px 0;
`;

const HeightBox = styled.View`
  height: 20px;
`;

const ButtonBox = styled.View`
  padding: 10px 20px;

  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.gray500.default};
`;

const Button = styled(Btn)`
  height: 60px;

  border-radius: 5px;
`;

const ButtonText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${({theme}) => theme.bgColor};
`;

export default AccusationScreen;

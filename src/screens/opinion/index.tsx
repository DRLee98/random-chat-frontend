import useCreateOpinion from '@app/graphql/hooks/opinion/useCreateOpinion';
import useForm from '@app/hooks/useForm';

import styled from 'styled-components/native';

import BorderInput from '@app/components/common/input/BorderInput';
import Btn from '@app/components/common/Button';
import RadioList from '@app/components/common/RadioList';
import PictureList from '@app/components/common/PictureList';

import {OpinionCategory} from '@app/graphql/__generated__/graphql';
import {SettingsNavigatorScreens} from '@app/navigators/settings';

import type {StackScreenProps} from '@react-navigation/stack';
import type {SettingsNavigatorParamList} from '@app/navigators/settings';
import type {RadioData} from '@app/components/common/RadioList';
import type {CreateOpinionInput} from '@app/graphql/__generated__/graphql';
import type {ReactNativeFileType} from '@app/utils/file';

interface FormValues extends Omit<CreateOpinionInput, 'images'> {
  images?: ReactNativeFileType[];
}

interface OpinionScreenProps
  extends StackScreenProps<
    SettingsNavigatorParamList,
    SettingsNavigatorScreens.Opinion
  > {}

const OpinionScreen = ({navigation}: OpinionScreenProps) => {
  const [createOpinion] = useCreateOpinion();

  const opinionCategory: RadioData[] = [
    {label: '개선', value: OpinionCategory.Imporve},
    {label: '문의', value: OpinionCategory.Inquiry},
    {label: '버그', value: OpinionCategory.Bug},
    {label: '기타', value: OpinionCategory.Etc},
  ];

  const {getProps, setFieldValue, values} = useForm<FormValues>({
    initialValues: {
      category: OpinionCategory.Imporve,
      title: '',
      content: '',
    },
  });

  const onChangeCategory = (v: string) => {
    setFieldValue('category', v as OpinionCategory);
  };

  const onChangeImages = (images: ReactNativeFileType[]) => {
    setFieldValue('images', images);
  };

  const onCreateOpinion = async () => {
    if (!values.title || !values.content) return;

    const input: FormValues = {
      ...values,
    };

    const {data} = await createOpinion({
      variables: {
        input,
      },
    });

    if (data?.createOpinion.ok) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <InputBox>
          <RadioList
            data={opinionCategory}
            value={values.category}
            onChange={onChangeCategory}
          />
          <HeightBox />
          <BorderInput
            placeholder="제목을 입력해 주세요."
            radius={12}
            {...getProps('title')}
          />
          <Input
            multiline
            placeholder="소중한 의견을 작성해 주세요."
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
            onPress={onCreateOpinion}
            disabled={!values.title || !values.content}>
            <ButtonText>작성하기</ButtonText>
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
  padding: 20px 0;

  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${({theme}) => theme.bgColor};
`;

export default OpinionScreen;

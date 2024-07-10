import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'styled-components/native';
import useMe from '@app/graphql/hooks/user/useMe';
import useToggleBlock from '@app/hooks/useToggleBlock';

import BottomSheet from '../common/BottomSheet';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {MainNavigatorScreens} from '@app/navigators';

import type {BottomSheetButton} from '../common/BottomSheet';
import type {NavigationProp} from '@react-navigation/native';
import type {MainNavigatorParamList} from '@app/navigators';

interface ProfileBottomSheetProps {
  userId: string;
}

const ProfileBottomSheet = ({userId}: ProfileBottomSheetProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const {me} = useMe();
  const toggleBlock = useToggleBlock();

  const [buttons, setButtons] = useState<BottomSheetButton[]>([]);

  const toggleBlockFn = () => {
    toggleBlock(userId);
  };

  const goAccusationScreen = () => {
    navigation.navigate(MainNavigatorScreens.Accusation, {userId});
  };

  useEffect(() => {
    setButtons([
      {
        text: `차단${me?.blockUserIds.includes(userId) ? ' 해제' : ''}하기`,
        onPress: toggleBlockFn,
      },
      {
        text: `신고하기`,
        onPress: goAccusationScreen,
      },
    ]);
  }, [me]);

  return (
    <BottomSheet buttons={buttons}>
      <Icon name="ellipsis-h" size={20} color={theme.fontColor} />
    </BottomSheet>
  );
};

export default ProfileBottomSheet;

import useMe from '@app/graphql/hooks/user/useMe';
import useUserProfile from '@app/graphql/hooks/user/useUserProfile';

import {Text, View} from 'react-native';
import ProfileImg from '@app/components/common/ProfileImg';
import ToggleUserBlockButton from '@app/components/user/ToggleUserBlockButton';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';

export interface UserScreenScreenParams {
  userId: string;
}

interface UserScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.User> {}

const UserScreen = ({route}: UserScreenProps) => {
  const {me} = useMe();
  const {data} = useUserProfile({
    id: route.params.userId,
  });

  if (!data?.userProfile.user) return null;
  return (
    <View style={{paddingVertical: 20, alignItems: 'center'}}>
      <ProfileImg
        id={data.userProfile.user.id}
        size={120}
        url={data?.userProfile.user.profileUrl}
      />
      <View style={{height: 20}} />
      <View style={{flexDirection: 'row', gap: 10}}>
        <Text>{data?.userProfile.user?.nickname ?? '-'}</Text>
      </View>
      <View style={{height: 10}} />
      <Text>{data?.userProfile.user?.bio ?? '-'}</Text>
      <View style={{height: 10}} />
      {me && data?.userProfile.user && (
        <ToggleUserBlockButton
          me={me}
          userId={data.userProfile.user.id}
          nickname={data.userProfile.user.nickname}
        />
      )}
    </View>
  );
};

export default UserScreen;

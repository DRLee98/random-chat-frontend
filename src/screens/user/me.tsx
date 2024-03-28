import useMeDetail from '@app/graphql/hooks/user/useMeDetail';

import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ProfileImg from '@app/components/common/ProfileImg';

import {MainNavigatorScreens} from '@app/navigators';

import type {StackScreenProps} from '@react-navigation/stack';
import type {MainNavigatorParamList} from '@app/navigators';

interface MeScreenProps
  extends StackScreenProps<MainNavigatorParamList, MainNavigatorScreens.Me> {}

const MeScreen = ({navigation}: MeScreenProps) => {
  const {me} = useMeDetail();

  const goUserProfile = (userId: string) => {
    navigation.navigate(MainNavigatorScreens.User, {userId});
  };

  if (!me) return null;
  return (
    <View style={{paddingVertical: 20, alignItems: 'center'}}>
      <ProfileImg id={me.id} size={120} url={me.profileUrl} />
      <View style={{height: 20}} />
      <View style={{flexDirection: 'row', gap: 10}}>
        <Text>{me?.nickname ?? '-'}</Text>
        <Text>{me?.socialPlatform ?? '-'}</Text>
      </View>
      <View style={{height: 10}} />
      <Text>{me?.bio ?? '-'}</Text>
      <View style={{height: 10}} />
      <Text>초대 {me?.allowMessage ? '허용' : '거부'}</Text>
      <View style={{height: 40}} />
      <Text>차단한 유저들</Text>
      <View style={{height: 10}} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', gap: 15, paddingHorizontal: 10}}>
          {me?.blockUsers.map(user => (
            <TouchableOpacity
              key={`block_user_${user.id}`}
              onPress={() => goUserProfile(user.id)}
              style={{
                alignItems: 'center',
                gap: 10,
                borderColor: '#121212',
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}>
              <ProfileImg id={user.id} size={60} url={user.profileUrl} />
              <Text>{user.nickname}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MeScreen;

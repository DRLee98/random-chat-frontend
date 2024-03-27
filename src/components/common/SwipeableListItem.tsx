import {Swipeable} from 'react-native-gesture-handler';

interface SwipeableListItemProps {
  children: React.ReactNode;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}

const SwipeableListItem = ({
  children,
  leftActions,
  rightActions,
}: SwipeableListItemProps) => {
  return (
    <Swipeable
      renderLeftActions={() => leftActions}
      renderRightActions={() => rightActions}>
      {children}
    </Swipeable>
  );
};

export default SwipeableListItem;

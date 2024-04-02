import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

const Divider = () => {
  return <DividerElement />;
};

const DividerElement = styled.View`
  border-bottom-color: ${({theme}) => theme.gray300.default};
  border-bottom-width: ${StyleSheet.hairlineWidth};
`;

export default Divider;

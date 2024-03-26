import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

const Divider = () => {
  return <DividerElement />;
};

const DividerElement = styled.View`
  border-bottom-color: rgb(174, 174, 178);
  border-bottom-width: ${StyleSheet.hairlineWidth};
`;

export default Divider;

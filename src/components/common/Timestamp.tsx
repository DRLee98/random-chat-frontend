import {useEffect, useState} from 'react';

import styled from 'styled-components/native';

import {getDatestamp, getTimestamp} from '@app/utils/date';

interface TimestampProps {
  date: string;
  type: 'date' | 'time';
}

const Timestamp = ({date, type}: TimestampProps) => {
  const [timeStr, setTimeStr] = useState('');

  const updateTimeStr = () => {
    switch (type) {
      case 'date':
        setTimeStr(getDatestamp(date));
        break;
      default:
        setTimeStr(getTimestamp(date));
        break;
    }
  };

  useEffect(() => {
    updateTimeStr();
    const timer = setInterval(updateTimeStr, 60000);
    return () => clearInterval(timer);
  }, []);
  return <Text>{timeStr}</Text>;
};

const Text = styled.Text`
  color: ${({theme}) => theme.gray100.default};
  font-size: 11px;
`;

export default Timestamp;

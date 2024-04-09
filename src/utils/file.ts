import {ReactNativeFile} from 'apollo-upload-client';

export interface ReactNativeFileType {
  uri: string;
  name: string;
  type: string;
}

export const makeFile = (data: ReactNativeFileType) => {
  return new ReactNativeFile(data);
};

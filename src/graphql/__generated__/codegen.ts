import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // schema: 'http://192.168.21.66:3000/graphql',
  schema: 'https://15.165.18.241.nip.io/graphql',
  documents: ['src/graphql/**/*.ts', '!src/graphql/__generated__/*.ts'],
  generates: {
    'src/graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: {unmaskFunctionName: 'getFragmentData'},
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;

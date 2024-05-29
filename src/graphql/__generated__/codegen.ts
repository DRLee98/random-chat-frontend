import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // schema: 'http://localhost:3000/graphql',
  schema: 'http://15.165.18.241/graphql',
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

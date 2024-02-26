import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: ['src/graphql/**/*.ts', '!src/graphql/types/*.ts'],
  generates: {
    'src/graphql/types/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;

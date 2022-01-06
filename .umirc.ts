import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  extraBabelPresets: [
    {
      plugins: [
        [
          'import',
          {
            libraryName: '@antv/x6-react-components',
            libraryDirectory: 'es', // es or lib
            style: true,
            transformToDefaultImport: true,
          },
        ],
      ],
    },
  ],
});

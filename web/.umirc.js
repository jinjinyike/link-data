
// ref: https://umijs.org/config/
import {resolve} from 'path'

export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'app1',
      dll: true,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/api": {
      "target": "http://127.0.0.1:9000",
      "changeOrigin": true
    }
  },
  alias: {
    // "components": resolve(__dirname,"./src/components"),
    "utils": resolve(__dirname,"./src/utils"),
  }
}

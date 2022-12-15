/* eslint-disable @typescript-eslint/no-var-requires */
const CracoLessPlugin = require('craco-less')
const { CracoAliasPlugin } = require('react-app-alias')
const path = require('path')

module.exports = {
  // style: {
  //   sass: {
  //     loaderOptions: {
  //       additionalData: (content, loaderContext) => {
  //         // More information about available properties https://webpack.js.org/api/loaders/
  //         const { resourcePath, rootContext } = loaderContext
  //         const relativePath = path.relative(rootContext, resourcePath)

  //         if (/\.scss$/.test(relativePath)) {
  //           return '@import "@/styles/var.scss";'
  //         } else {
  //           return ''
  //         }
  //       },
  //     }
  //   },
  // },

  // style: {
  //   postcss: {
  //     mode: 'extends',
  //     loaderOptions: {
  //       postcssOptions: {
  //         ident: 'postcss',
  //         plugins: [
  //           [
  //             'postcss-px-to-viewport',
  //             {
  //               unitToConvert: 'px', // 要转化的单位
  //               viewportWidth: 375, // UI设计稿的宽度
  //               unitPrecision: 6, // 转换后的精度，即小数点位数
  //               propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
  //               viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
  //               fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
  //               selectorBlackList: ['ignoreConvert'], // 指定不转换为视窗单位的类名，
  //               minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  //               mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  //               replace: true, // 是否转换后直接更换属性值
  //               exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
  //               landscape: false // 是否处理横屏情况
  //             },
  //           ],
  //         ],
  //       },
  //     },
  //   },
  // },

  plugins: [
    // {
    //   plugin: CracoLessPlugin,
    //   options: {
    //     lessLoaderOptions: {
    //       lessOptions: {
    //         // modifyVars: {
    //         //   // 覆盖 antd 的变量
    //         //   '@primary-color': '#11A560',
    //         //   '@success-color': '#11A560'
    //         // },
    //         javascriptEnabled: true,
    //       },
    //     },
    //   },
    // },
    {
      // 该插件会自动从 tsconfig.paths.json 读取路径别名
      plugin: CracoAliasPlugin,
      options: {}
    },
  ],

  webpack: {
    configure: (webpackConfig, { env: webpackEnv, paths }) => {
      webpackConfig.module.rules[1].oneOf = [
        ...[
          // 在该处添加新的rule
          {
            test: /\.svg$/,
            include: [path.resolve(__dirname, 'src/assets/imgs/icons')], // 本地icon文件路径
            use: [
              {
                loader: 'svg-sprite-loader',
                options: {}
              },
              {
                loader: 'svgo-loader',
                options: {
                  plugins: [
                    {
                      name: 'removeAttrs',
                      params: {
                        attrs: '(fill|stroke)',
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
        ...webpackConfig.module.rules[1].oneOf
      ]
      return webpackConfig
    }

  }
}
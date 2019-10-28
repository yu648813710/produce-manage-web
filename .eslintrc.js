module.exports = {
  // 默认情况下ESlint会在所有父级的目录寻找配置文件，一直到跟目录。但是ESlint发现配置文件中root=true后会停止寻找，所有文件都用一个
  root: true,
  // 使用 env 关键字指定你想启用的环境
  env: {
    node: true
  },
  // 使用的插件
  extends: ["plugin:vue/essential", "@vue/standard"],
  // 配置规则
  rules: {
    "generator-star-spacing": 0,
    "no-tabs": "off",
    "space-before-function-paren": "off",
    "no-control-regex": "off",
    "no-empty-character-class": "off",
    "no-invalid-regexp": "off",
    "no-regex-spaces": "off",
    "no-template-curly-in-string": "off",
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false
      }
    ],
    complexity: [
      // 圈复杂度最大为30
      "error",
      {
        max: 30
      }
    ],
    "max-lines": [
      "error",
      {
        // 单文件最大行数为 600
        max: 600,
        skipComments: false
      }
    ],
    // radix: 'off', // parseInt 不是必须传入第二个参数
    "max-statements-per-line": [
      // 一行只能有一条语句
      "error",
      {
        max: 1
      }
    ]
  },
  // eslint的解析器 默认是Espree
  parserOptions: {
    parser: "babel-eslint"
  }
};

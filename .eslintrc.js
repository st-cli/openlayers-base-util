/*
 * @Description:eslint config
 * @Autor: houyueke
 * @Date: 2022-04-01 10:38:46
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-21 17:26:01
 */
module.exports = {
  root: true,
  env: {
    node: true,
    amd: true,
    browser: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

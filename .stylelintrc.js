/*
 * @Description: stylelint
 * @Autor: houyueke
 * @Date: 2022-04-11 15:41:38
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-11 16:15:09
 */
module.exports = {
  root: true,
  extends: 'stylelint-config-standard',
  customSyntax: 'postcss-html',
  rules: {
    indentation: [
      2,
      {
        baseIndentLevel: 1
      }
    ],
    'declaration-block-semicolon-newline-after': 'always'
  },
  ignoreFiles: [
    'node_modules/**/*',
    'public/**/*',
    'dist/**/*',
    '**/*.js',
    '**/*.jsx'
  ]
}

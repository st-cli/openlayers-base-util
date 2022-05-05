/*
 * @Description: commitlint.config
 * @Autor: houyueke
 * @Date: 2022-04-08 16:41:23
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-11 15:22:09
 */
module.exports = {
  extends: ['cz'], //自定义规范
  rules: {
    // <type>枚举
    'type-enum': [
      2,
      'always',
      [
        'init', // 初始提交
        'feat', // 增加新功能
        'fix', // 修复bug
        'style', // 样式修改不影响逻辑
        'merge', // 合并分支
        'docs', // 修改文档
        'refactor', // 代码重构
        'test', // 测试
        'chore', // 杂项修改
        'revert', // 版本回退
        'delete' //删除文件
      ]
    ],
    // <type> 不能为空
    'type-empty': [2, 'never'],
    // <type> 格式 小写
    'type-case': [2, 'always', 'lower-case'],
    // <subject> 不能为空
    'subject-empty': [2, 'never'],
    // <subject> 以.为结束标志
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'never', []]
  }
}

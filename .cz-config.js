/*
 * @Description:cz-config
 * @Autor: houyueke
 * @Date: 2022-04-08 17:26:33
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-08 17:49:18
 */
module.exports = {
  types: [
    { value: 'init', name: 'init:     初始提交' },
    { value: 'feat', name: 'feat:     增加新功能' },
    { value: 'fix', name: 'fix:      修复bug' },
    { value: 'style', name: 'style:    样式修改不影响逻辑' },
    { value: 'merge', name: 'merge:    分支合并' },
    { value: 'docs', name: 'docs:     修改文档' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    { value: 'test', name: 'test:     测试相关' },
    { value: 'chore', name: 'chore:    杂项修改' },
    { value: 'revert', name: 'revert:   版本回退' },
    { value: 'delete', name: 'revert:   删除文件' }
  ],
  scopes: [],
  messages: {
    type: '选择更改类型:\n',
    subject: '简短描述:\n',
    confirmCommit: '确认提交?'
  },
  allowCustomScopes: true,
  subjectLimit: 100,
  skipQuestions: ['scope', 'customScope', 'breaking', 'footer', 'body'],
  allowBreakingChanges: ['feat', 'fix']
}

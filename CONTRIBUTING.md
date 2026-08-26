# 贡献指南

感谢你参与「名师问问」。项目优先接收可核验、可维护、能改善真实备课质量的贡献。

## 可以贡献什么

- 修正名师主张、代表课例、适用学段或适用课型。
- 补充具有公开来源的名师索引或深度卡片。
- 补充课程标准映射、教学案例和评价任务。
- 改进 DOCX 生成器、跨平台兼容性和自动检查。
- 修正文档、安装说明、隐私与无障碍问题。

## 资料贡献要求

1. 提供可公开访问的来源链接、出版物信息或完整出处。
2. 区分直接引语、观点概括和基于方法论的迁移设计。
3. 不提交未经授权的整本书、整篇付费文章、完整课程录像转录或其他受版权保护的大段内容。
4. 不提交学生姓名、联系方式、成绩明细、照片等个人信息。
5. 不用单一课例推断一个人的全部教学主张。

## 本地开发

```bash
git clone https://github.com/liqinling1994-cloud/master-teacher.git
cd master-teacher
npm test
npm ci --prefix skills/master-teacher/tools
```

生成 DOCX 冒烟样例：

```bash
node skills/master-teacher/tools/docx-generator.js tests/fixtures/sample-plan.json tests/output/sample.docx
```

## 修改 Skill

- 保持 `skills/master-teacher/SKILL.md` 精炼，条件性细节放进 `references/`。
- 新增名师时，先更新对应 `references/index/`，资料足够时再增加深度卡片。
- 新增课程标准资料时，使用 `references/_curriculum_schema.md`。
- 修改版本号时，同步更新 `SKILL.md`、`config.json`、工具包、根目录 `package.json`、`manifest.json` 和 `CHANGELOG.md`。
- 不提交 `node_modules`、`config.local.json`、生成的 DOCX 或本地绝对路径。

## Pull Request 检查清单

- [ ] 修改范围单一，标题清楚。
- [ ] 已说明资料来源和核验方式。
- [ ] 已运行 `npm test`。
- [ ] 涉及 DOCX 时已完成样例生成。
- [ ] 已更新相关索引、manifest 和更新日志。
- [ ] 未包含个人信息、访问令牌、依赖目录或大段受版权保护内容。

维护者可以要求补充来源、缩小修改范围或调整表述。重大结构变更请先创建 Issue 说明问题、目标和迁移影响。

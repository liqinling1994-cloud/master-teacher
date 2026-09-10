# 名师问问 · Master Teacher

> 面向教师的开源教学设计 Skill：匹配公开可考的名师方法论，融合课程标准，生成可解释、可调整、可直接落地的教学方案。

[![版本](https://img.shields.io/github/v/release/liqinling1994-cloud/master-teacher?display_name=tag&sort=semver)](https://github.com/liqinling1994-cloud/master-teacher/releases)
[![自动检查](https://github.com/liqinling1994-cloud/master-teacher/actions/workflows/validate.yml/badge.svg)](https://github.com/liqinling1994-cloud/master-teacher/actions/workflows/validate.yml)
[![Stars](https://img.shields.io/github/stars/liqinling1994-cloud/master-teacher?style=flat)](https://github.com/liqinling1994-cloud/master-teacher/stargazers)
[![许可证](https://img.shields.io/badge/license-MIT-2F6B4F)](LICENSE)

[English](README_EN.md) · [更新日志](CHANGELOG.md) · [贡献指南](CONTRIBUTING.md) · [问题反馈](https://github.com/liqinling1994-cloud/master-teacher/issues)

```bash
npx skills add liqinling1994-cloud/master-teacher --skill master-teacher
```

安装后可以直接说：

```text
用名师问问设计五年级《落花生》公开课，40分钟，学生表达能力中等。
```

系统会解析教学需求，匹配适合的方法论，关联课程标准，组织课堂任务与评价证据，并根据需要交付 Markdown 或 Word 文档。

## 项目亮点

| 能力 | 说明 |
|---|---|
| 一句话启动 | 从自然语言中提取学科、年级、课题、课型、学情与时长 |
| 方法论匹配 | 按课型、学段、风格和资料深度匹配教学方法 |
| 课程标准融合 | 把核心素养、内容要求、学业质量与课堂任务连接起来 |
| 来源分级 | 区分深度卡片、标准索引、公开资料补充与通用策略 |
| 动态名师检索 | 指定未收录名师时，经确认检索公开资料生成临时卡片（★ 级）并标注可信度 |
| 六种成果 | 教学设计、公开课全案、说课稿、微课脚本、备课提纲、评课建议 |
| 双格式输出 | 对话内 Markdown 预览，可选生成规范排版的 DOCX |
| 渐进式读取 | 按学科、名师和任务读取所需资料，避免一次加载整个知识库 |
| 隐私友好 | 公开配置不含个人路径；本地教师偏好默认不进入版本库 |

## 当前内容基线

V5.4.0 包含：

- 16 个学科方向，覆盖小初高全学段。
- 15 个学科索引文件：全局总目录、反向检索索引，以及按"学科×学段"重组的学科索引（23 个组合全覆盖）。
- 160 条方法索引，去重后覆盖 160 位教育工作者。
- 26 张深度名师卡片（★★★），主要学科与音乐、美术、体育、心理健康等综合学科每类至少 1 张。
- 15 份课程标准资料：义务教育 9 科（依据 2022 版课程标准）+ 高中 6 科（语数英物化生，依据 2017 年版 2020 年修订课程标准）。
- 1 个完整公开课案例。
- 1 个 DOCX 生成工具。
- 动态名师检索：知识库之外的名师可经用户确认后实时检索公开资料，生成临时卡片。

索引条目用于教学方法匹配。不同人物的资料深度存在差异，系统会在输出中标注可信度级别。

## 工作流程

```text
教师描述需求
  ↓
解析学科、学段、课题、课型、学情、时长
  ↓
读取对应学科索引并匹配 1–2 种方法论
  ↓
读取相关深度卡片与课程标准资料
  ↓
生成目标、任务、提问链、评价证据与板书设计
  ↓
标注来源级别并完成质量复检
  ↓
交付 Markdown；按需生成 DOCX
```

### 匹配维度

| 维度 | 默认权重 | 例子 |
|---|---:|---|
| 课型适配 | 40% | 概念课、阅读课、复习课、实验课、公开课 |
| 学段适配 | 30% | 小学、初中、高中 |
| 教学风格 | 20% | 主题整合、诗意品读、融错、对话、项目式学习 |
| 资料深度 | 10% | 深度卡片、标准索引、公开资料、通用策略 |

## 你可以直接这样用

### 完整教学设计

```text
用名师问问做八年级物理《浮力》新授课教学设计，45分钟，班级差异较大。
```

### 公开课全案

```text
设计五年级语文《落花生》公开课，包含说课稿、板书、评价量表和时间轴。
```

### 快速备课

```text
三年级“分数的初步认识”，想突出学生常见错误，只给我500字备课提纲。
```

### 微课脚本

```text
生成初中英语阅读策略微课脚本，6分钟，包含画面提示和练习题。
```

### 评课建议

```text
根据下面的课堂实录给评课建议，说明亮点、问题、改进动作和理论依据。
```

### 指定方法论

```text
参考华应龙的融错教育设计这节数学课。请区分公开主张、合理迁移和通用策略，不要虚构原话。
```

## 六种输出类型

| 类型 | 建议篇幅 | 主要内容 |
|---|---:|---|
| 完整教学设计 | 2000–3000 字 | 目标、重难点、教学过程、评价、板书、反思 |
| 公开课全案 | 4000–5000 字 | 教学设计、说课稿、板书、量表、时间轴 |
| 说课稿 | 1500–2000 字 | 教材、学情、教法、过程、板书、反思 |
| 微课脚本 | 800–1200 字 | 开场、讲解、演示、练习、总结 |
| 快速备课提纲 | 500–800 字 | 目标、重点、流程骨架、关键问题 |
| 评课建议 | 1000–1500 字 | 亮点、问题、建议、依据 |

## 安装

### skills CLI

```bash
npx skills add liqinling1994-cloud/master-teacher --skill master-teacher
```

查看可安装 Skill：

```bash
npx skills add liqinling1994-cloud/master-teacher --list
```

### Git 克隆

```bash
git clone https://github.com/liqinling1994-cloud/master-teacher.git
```

Skill 入口位于：

```text
skills/master-teacher/SKILL.md
```

根据所用 Agent，把 `skills/master-teacher` 目录放入对应的 skills 目录：

```text
~/.agents/skills/master-teacher/
~/.codex/skills/master-teacher/
~/.claude/skills/master-teacher/
```

Windows PowerShell 验证：

```powershell
Test-Path "$HOME\.agents\skills\master-teacher\SKILL.md"
```

### Word 生成依赖

Markdown 输出无需额外依赖。生成 DOCX 需要 Node.js 18 或更高版本：

```bash
cd skills/master-teacher/tools
npm ci
```

命令格式：

```bash
node docx-generator.js <教学方案JSON> <输出DOCX路径>
```

仓库提供可运行样例：

```bash
node skills/master-teacher/tools/docx-generator.js tests/fixtures/sample-plan.json tests/output/sample.docx
```

## 仓库结构

```text
master-teacher/
├── README.md
├── README_EN.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── SUPPORT.md
├── manifest.json
├── scripts/validate-repo.mjs
├── tests/fixtures/sample-plan.json
├── .github/
│   ├── workflows/validate.yml
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
└── skills/master-teacher/
    ├── SKILL.md
    ├── config.json
    ├── TEST.md
    ├── agents/openai.yaml
    ├── references/
    │   ├── index/
    │   ├── masters/
    │   ├── curriculum/
    │   ├── examples/
    │   └── fusion_engine.md
    └── tools/
        ├── docx-generator.js
        ├── package.json
        └── package-lock.json
```

## 资料可信度与使用边界

名师问问使用四级标注：

| 标记 | 含义 |
|---|---|
| ★★★ 深度卡片 | 本地保存了较完整的方法主张、策略和课例资料 |
| ★★ 标准索引 | 本地保存了核心主张、适用场景和代表课例 |
| ★ 公开资料 | 需要依据可核验公开资料补充，并在输出中说明 |
| 通用 | 使用通用教学设计原则，不归因给具体人物 |

- 项目与被索引的教育工作者之间不存在官方隶属、代言或授权关系。
- 生成内容属于方法论启发下的综合方案，不代表任何教育工作者本人发言。
- 遇到无法核实的引语、课例或观点，系统应删除具体归因或明确标注推测性质。
- 课程标准资料用于备课辅助，正式引用时请核对教育主管部门发布的最新版原文。
- 生成方案需要教师结合教材版本、学生实际、课时条件和学校要求进行专业审阅。
- 不要在配置或公开 Issue 中提交学生姓名、联系方式、成绩明细等个人信息。

## 开发与验证

```bash
npm test
npm ci --prefix skills/master-teacher/tools
node skills/master-teacher/tools/docx-generator.js tests/fixtures/sample-plan.json tests/output/sample.docx
```

每次推送和 Pull Request 都会运行 GitHub Actions，检查版本一致性、必需资源、敏感本地文件、依赖安装和 DOCX 冒烟生成。

新增名师卡片、课程标准资料或示例时，请同步更新 `manifest.json`、相关索引和测试基线。具体流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 路线图

- 补齐 16 学科的课程标准资料。
- 扩展更多可追溯的深度名师卡片。
- 为索引条目增加公开来源字段和更新时间。
- 增加更多学段、学科与输出类型的真实验收案例。
- 提供跨平台的 DOCX 生成与配置迁移脚本。

## 关于秦岭

秦岭持续研究 AI 写作、教育场景与可复用 Agent Skill 工作流，并通过「秦岭笔记」分享实践记录。

- GitHub：[liqinling1994-cloud](https://github.com/liqinling1994-cloud)
- 微信：`lqljym5201314`
- 微信公众号：秦岭笔记

| 赞赏支持 | 微信公众号 |
|---|---|
| <img src="assets/qinling-profile/qinling_reward_qr.jpg" alt="秦岭赞赏码" width="220" /> | <img src="assets/qinling-profile/qinling_wechat_public_account_qr.jpg" alt="秦岭笔记公众号二维码" width="220" /> |
| 感谢支持持续开源与维护 | 扫码关注「秦岭笔记」 |

## 参与贡献

欢迎提交可核验的名师资料、课程标准映射、教学案例、工具修复与文档改进。提交前请阅读 [贡献指南](CONTRIBUTING.md) 和 [行为准则](CODE_OF_CONDUCT.md)。

安全问题请按 [SECURITY.md](SECURITY.md) 私下报告；普通使用问题可提交 [GitHub Issue](https://github.com/liqinling1994-cloud/master-teacher/issues)。

## 许可证

本项目采用 [MIT License](LICENSE)。使用教育工作者姓名、公开主张和课例资料时，仍需遵守适用的著作权、人格权、引用规范和所在地区法律。

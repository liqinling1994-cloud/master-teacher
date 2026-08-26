import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const skillRoot = path.join(root, 'skills', 'master-teacher');
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

const requiredFiles = [
  'README.md',
  'README_EN.md',
  'LICENSE',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  'SUPPORT.md',
  'manifest.json',
  'skills/master-teacher/SKILL.md',
  'skills/master-teacher/config.json',
  'skills/master-teacher/TEST.md',
  'skills/master-teacher/agents/openai.yaml',
  'skills/master-teacher/tools/docx-generator.js',
  'skills/master-teacher/tools/package.json',
];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    fail(`缺少必需文件：${relativePath}`);
  }
}

const manifest = readJson('manifest.json');
const config = readJson('skills/master-teacher/config.json');
const rootPackage = readJson('package.json');
const toolPackage = readJson('skills/master-teacher/tools/package.json');
const skill = read('skills/master-teacher/SKILL.md');

const versionMatch = skill.match(/^\s{2}version:\s*"?([0-9]+\.[0-9]+\.[0-9]+)"?$/m);
const nameMatch = skill.match(/^name:\s*([a-z0-9-]+)$/m);
if (!versionMatch) fail('SKILL.md 缺少合法的语义版本号');
if (nameMatch?.[1] !== 'master-teacher') fail('SKILL.md 的 name 必须为 master-teacher');

const versions = new Set([
  versionMatch?.[1],
  manifest.version,
  config.version,
  rootPackage.version,
  toolPackage.version,
]);
if (versions.size !== 1) {
  fail(`版本不一致：${[...versions].join(', ')}`);
}

const indexDir = path.join(skillRoot, 'references', 'index');
const indexFiles = fs.readdirSync(indexDir).filter((name) => name.endsWith('.md'));
const entries = [];
for (const file of indexFiles) {
  const content = fs.readFileSync(path.join(indexDir, file), 'utf8');
  for (const match of content.matchAll(/^###\s+(.+?)\s+★/gm)) {
    entries.push(match[1].trim());
  }
}

const uniqueEducators = new Set(entries).size;
const mastersDir = path.join(skillRoot, 'references', 'masters');
const deepProfiles = fs.readdirSync(mastersDir, { recursive: true })
  .filter((name) => name.endsWith('.md')).length;
const curriculumDir = path.join(skillRoot, 'references', 'curriculum');
const curriculumGuides = fs.readdirSync(curriculumDir)
  .filter((name) => name.endsWith('.md')).length;

const expected = manifest.resources;
if (indexFiles.length !== expected.index_files) fail(`学科索引文件应为 ${expected.index_files} 个，实际 ${indexFiles.length} 个`);
if (entries.length !== expected.indexed_entries) fail(`索引条目应为 ${expected.indexed_entries} 条，实际 ${entries.length} 条`);
if (uniqueEducators !== expected.unique_educators) fail(`去重人数应为 ${expected.unique_educators} 位，实际 ${uniqueEducators} 位`);
if (deepProfiles !== expected.deep_profiles) fail(`深度卡片应为 ${expected.deep_profiles} 张，实际 ${deepProfiles} 张`);
if (curriculumGuides !== expected.curriculum_guides) fail(`课程标准资料应为 ${expected.curriculum_guides} 份，实际 ${curriculumGuides} 份`);

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

const files = walk(root);
for (const file of files) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  if (path.basename(file) === 'config.local.json') {
    fail(`仓库包含本地教师档案：${relative}`);
  }
  if (/\.(md|json|ya?ml|js|mjs|txt)$/i.test(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (/C:\\Users\\[^\\]+/i.test(content)) {
      fail(`文件包含 Windows 用户绝对路径：${relative}`);
    }
    if (/gh[opusr]_[A-Za-z0-9_]{20,}/.test(content)) {
      fail(`文件疑似包含 GitHub 令牌：${relative}`);
    }
  }
}

if (failures.length > 0) {
  console.error('仓库验证失败：');
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`仓库验证通过：v${manifest.version}，${indexFiles.length} 个索引文件，${entries.length} 条索引，${uniqueEducators} 位教育工作者。`);

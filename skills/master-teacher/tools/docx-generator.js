/**
 * 名师问问 v4.1 — Word 文档生成器
 *
 * 用法：node docx-generator.js <json数据文件路径> <输出docx路径>
 *
 * JSON 数据格式：
 * {
 *   "title": "五年级语文《落花生》教学设计",
 *   "subtitle": "融合窦桂梅主题教学 × 2022版新课标",
 *   "meta": {
 *     "学科": "语文", "年级": "五年级", "课时": "1课时",
 *     "教材": "统编版", "执教": "", "日期": "2026-08-26"
 *   },
 *   "sections": [
 *     { "heading": "一、教学目标", "content": "..." },
 *     { "heading": "二、教学重难点", "content": "..." },
 *     { "heading": "三、教学过程", "subsections": [
 *       { "heading": "环节一：情境导入（5分钟）", "content": "..." },
 *       { "heading": "环节二：初读感知（10分钟）", "content": "..." }
 *     ]},
 *     { "heading": "四、板书设计", "content": "..." },
 *     { "heading": "五、教学反思", "content": "..." }
 *   ]
 * }
 */

const { Document, Packer, Paragraph, TextRun, HeadingLevel,
        AlignmentType, PageNumber, Header, Footer,
        NumberFormat, Tab, TabStopType, TabStopPosition,
        convertInchesToTwip, convertMillimetersToTwip } = require('docx');
const fs = require('fs');
const path = require('path');

// ============ 字号映射（磅值 × 2 = half-points） ============
const FONT_SIZES = {
  '小二': 36,   // 18pt × 2
  '小三': 30,   // 15pt × 2
  '四号': 28,   // 14pt × 2
  '小四': 24,   // 12pt × 2
  '五号': 21,   // 10.5pt × 2
};

// ============ 文本解析：处理标注符号 ============
function parseContent(text) {
  if (!text) return [];

  const lines = text.split('\n');
  const paragraphs = [];

  for (const line of lines) {
    if (line.trim() === '') continue;

    const runs = [];
    // 处理加粗 **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    for (const part of parts) {
      if (part.startsWith('**') && part.endsWith('**')) {
        runs.push(new TextRun({
          text: part.slice(2, -2),
          bold: true,
          font: '宋体',
          size: FONT_SIZES['小四'],
        }));
      } else if (part.trim()) {
        // 处理标注符号（保留为文本）
        const cleaned = part
          .replace(/📐/g, '【课标】')
          .replace(/🎯/g, '【策略】')
          .replace(/💡/g, '【视角】')
          .replace(/🌟/g, '【亮点】')
          .replace(/⚡/g, '【适配】');

        runs.push(new TextRun({
          text: cleaned,
          font: '宋体',
          size: FONT_SIZES['小四'],
        }));
      }
    }

    if (runs.length > 0) {
      paragraphs.push(new Paragraph({
        children: runs,
        spacing: { line: 360 }, // 1.5倍行距
        indent: { firstLine: convertMillimetersToTwip(8) }, // 首行缩进2字符
      }));
    }
  }

  return paragraphs;
}

// ============ 构建文档 ============
function buildDocument(data) {
  const children = [];

  // ---- 标题 ----
  children.push(new Paragraph({
    children: [new TextRun({
      text: data.title,
      bold: true,
      font: '黑体',
      size: FONT_SIZES['小二'],
    })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }));

  // ---- 副标题（如果有） ----
  if (data.subtitle) {
    children.push(new Paragraph({
      children: [new TextRun({
        text: data.subtitle,
        font: '楷体',
        size: FONT_SIZES['五号'],
        color: '666666',
      })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }));
  }

  // ---- 元信息表 ----
  if (data.meta) {
    const metaText = Object.entries(data.meta)
      .filter(([k, v]) => v)
      .map(([k, v]) => `${k}：${v}`)
      .join('    ');

    children.push(new Paragraph({
      children: [new TextRun({
        text: metaText,
        font: '宋体',
        size: FONT_SIZES['五号'],
      })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }));

    // 分隔线
    children.push(new Paragraph({
      children: [new TextRun({
        text: '━'.repeat(50),
        font: '宋体',
        size: FONT_SIZES['五号'],
        color: 'CCCCCC',
      })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }));
  }

  // ---- 各章节 ----
  for (const section of data.sections) {
    // 一级标题
    children.push(new Paragraph({
      children: [new TextRun({
        text: section.heading,
        bold: true,
        font: '黑体',
        size: FONT_SIZES['小三'],
      })],
      spacing: { before: 300, after: 150 },
    }));

    // 章节正文
    if (section.content) {
      children.push(...parseContent(section.content));
    }

    // 二级子节
    if (section.subsections) {
      for (const sub of section.subsections) {
        children.push(new Paragraph({
          children: [new TextRun({
            text: sub.heading,
            bold: true,
            font: '黑体',
            size: FONT_SIZES['四号'],
          })],
          spacing: { before: 200, after: 100 },
        }));

        if (sub.content) {
          children.push(...parseContent(sub.content));
        }
      }
    }
  }

  // ---- 页脚来源标注 ----
  children.push(new Paragraph({
    children: [new TextRun({
      text: '\n\n——由「名师问问 v4.1」辅助生成',
      font: '楷体',
      size: FONT_SIZES['五号'],
      color: '999999',
      italics: true,
    })],
    alignment: AlignmentType.RIGHT,
    spacing: { before: 600 },
  }));

  // ============ 组装文档 ============
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: '宋体',
            size: FONT_SIZES['小四'],
          },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          size: {
            width: convertMillimetersToTwip(210),  // A4
            height: convertMillimetersToTwip(297),
          },
          margin: {
            top: convertMillimetersToTwip(25.4),
            bottom: convertMillimetersToTwip(25.4),
            left: convertMillimetersToTwip(31.7),
            right: convertMillimetersToTwip(31.7),
          },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [new TextRun({
              text: data.meta?.学校 || '',
              font: '宋体',
              size: FONT_SIZES['五号'],
              color: '999999',
            })],
            alignment: AlignmentType.CENTER,
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            children: [
              new TextRun({ text: '第 ', font: '宋体', size: FONT_SIZES['五号'] }),
              new TextRun({ children: [PageNumber.CURRENT], font: '宋体', size: FONT_SIZES['五号'] }),
              new TextRun({ text: ' 页', font: '宋体', size: FONT_SIZES['五号'] }),
            ],
            alignment: AlignmentType.CENTER,
          })],
        }),
      },
      children: children,
    }],
  });

  return doc;
}

// ============ 主函数 ============
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('用法: node docx-generator.js <数据JSON路径> <输出DOCX路径>');
    console.log('示例: node docx-generator.js plan.json 语文_五年级_落花生_教学设计_20260826.docx');
    process.exit(1);
  }

  const [inputPath, outputPath] = args;

  try {
    // 读取 JSON 数据
    const rawData = fs.readFileSync(inputPath, 'utf-8');
    const data = JSON.parse(rawData);

    if (!data.title || !Array.isArray(data.sections) || data.sections.length === 0) {
      throw new Error('数据必须包含 title 和至少一个 sections 条目');
    }

    const outputDir = path.dirname(path.resolve(outputPath));
    fs.mkdirSync(outputDir, { recursive: true });

    // 构建文档
    const doc = buildDocument(data);

    // 生成 buffer 并写入
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Word 文档已生成: ${outputPath}`);
    console.log(`   文件大小: ${(buffer.length / 1024).toFixed(1)} KB`);

  } catch (err) {
    console.error(`❌ 生成失败: ${err.message}`);
    process.exit(1);
  }
}

main();

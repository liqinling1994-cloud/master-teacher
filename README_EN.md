# Master Teacher · 名师问问

Master Teacher is an open-source Agent Skill for lesson planning in Chinese educational contexts. It matches a teaching request with documented pedagogical approaches, connects the plan to curriculum standards, and produces an explainable lesson design in Markdown or DOCX.

```bash
npx skills add liqinling1994-cloud/master-teacher --skill master-teacher
```

## What it includes

- 16 subject areas and 6 subject index files.
- 123 indexed entries covering 113 unique educators.
- 4 in-depth methodology profiles.
- Curriculum guides for Chinese, mathematics, and English.
- 6 deliverable types: lesson plan, open-class package, teaching presentation, micro-lesson script, quick outline, and lesson review.
- A Node.js DOCX generator with reproducible smoke tests.

## Example

```text
Use $master-teacher to design a 40-minute Grade 5 Chinese lesson for “The Peanut.”
Connect the objectives to curriculum standards, explain the selected methodology,
and include formative assessment evidence.
```

## Important boundaries

- The project is not affiliated with or endorsed by the educators listed in its reference indexes.
- Generated plans are methodology-inspired syntheses and do not represent an educator's own words.
- Unverified quotations or claims must not be attributed to a specific person.
- Curriculum references should be checked against the latest official publication before formal citation.
- Teachers remain responsible for adapting generated plans to learners, textbooks, school policy, and local requirements.

## Development

```bash
npm test
npm ci --prefix skills/master-teacher/tools
node skills/master-teacher/tools/docx-generator.js tests/fixtures/sample-plan.json tests/output/sample.docx
```

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and [CHANGELOG.md](CHANGELOG.md) for project policies and release history.

## License

[MIT](LICENSE). Legal requirements related to copyright, attribution, publicity, and educational materials still apply.

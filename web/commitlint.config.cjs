const { TYPES } = require("./.commit-types.cjs");

module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(?<emoji>[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F5D1}]\u{FE0F}?)\s\[(?<type>feat|fix|chore|docs|style|refactor|test|perf|rename|remove)\]\s(?<subject>.+)$/u,
      headerCorrespondence: ["emoji", "type", "subject"],
    },
  },
  rules: {
    "type-enum": [2, "always", TYPES],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
  },
};

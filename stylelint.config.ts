import type { Config } from "stylelint";

const config: Config = {
  extends: ["stylelint-config-recess-order"],

  rules: {
    "string-quotes": "single",
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["extend", "mixin", "include", "content"],
      },
    ],
    "no-descending-specificity": null,
  },

  ignoreFiles: ["dist/**/*", "build/**/*", "node_modules/**/*"],
};

export default config;

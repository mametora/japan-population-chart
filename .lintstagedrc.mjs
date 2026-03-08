import path from "path";

const joinFilenames = (filenames) =>
  filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ");

const buildEslintCommand = (filenames) =>
  `eslint --fix ${joinFilenames(filenames)}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${joinFilenames(filenames)}`;

const config = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, buildPrettierCommand],
};

export default config;

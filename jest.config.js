const base = require("./jest.config.base.js");

module.exports = {
  ...base,
  projects:
    [
      "<rootDir>/packages/domein/jest.config.js",
      "<rootDir>/packages/domein-react/jest.config.js",
    ],
  coverageDirectory: "<rootDir>/coverage/"
};
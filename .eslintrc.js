module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["react-hooks", "prettier"],
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    page: true,
    __IS_SNAPSHOT__: true,
  },
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.config.js",
          "**/*.spec.js",
          "**/*.stories.js",
          "**/*.test.js",
          "bin/**/*.js",
          "config/**/*.js",
        ],
      },
    ],
    "import/prefer-default-export": 0,
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "prettier/prettier": "error",
    "react/jsx-filename-extension": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};

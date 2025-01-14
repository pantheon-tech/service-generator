module.exports = {
  plugins: [
    "@typescript-eslint",
    "jest",
    "promise",
    "unicorn",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.eslint.json"
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "on",
    // Use function hoisting to improve code readability
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    // Doesn't play nice with Typescript or Node 12
    "unicorn/prefer-node-protocol": "off",
    // my stuff
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/camelcase": "off",
    "object-property-newline": [
      "error",
      {
        "allowMultiplePropertiesPerLine": false,
        "allowAllPropertiesOnSameLine": true
      }
    ],
    "@typescript-eslint/no-redundant-type-constituents": "warn",
    "@typescript-eslint/ban-types": [
      "error",
      {
        "types": {
          "{}": false
        },
        "extendDefaults": true
      }
    ]
  },
}

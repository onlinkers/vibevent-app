module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "prettier",
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    plugins: ["react", "react-hooks", "@typescript-eslint"],
    rules: {
        // Disable console logs on production branch
        "no-console": process.env.NODE_ENV === "prod" ? 2 : 1,
        "no-debugger": process.env.NODE_ENV === "prod" ? 2 : 1,
        
        // React rules
        "react-hooks/rules-of-hooks": 2, // Checks rules of Hooks
        "react-hooks/exhaustive-deps": 1, // Checks effect dependencies
        "react/prop-types": 0,
        "react/display-name": 0,
        
        // Non-react rules
        "no-unused-vars": 0,
        "@typescript-eslint/no-unused-vars": 1,
        "comma-dangle": [1, "only-multiline"],
        "indent": [1, 4],
        "no-mixed-spaces-and-tabs": 1,
        "object-curly-spacing": [
            1,
            "always",
            { arraysInObjects: true, objectsInObjects: true },
        ],
        "quotes": [1, "double"],
        "semi": [1, "always"],
        "prefer-const": [1, { destructuring: "any" }],
    },
};

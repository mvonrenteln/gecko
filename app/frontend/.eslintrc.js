module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    'react/jsx-key': 'error',
    'import/no-anonymous-default-export': 'off'
  }
};

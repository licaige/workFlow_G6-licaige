// ambient variable
declare let process: {
  env: {
    NODE_ENV: 'development' | 'production';
  };
};
process = {
  env: {
    NODE_ENV: 'production',
  },
};

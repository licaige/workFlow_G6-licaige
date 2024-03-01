export const reducer = (state, action) => {
  switch(action.type) {
    case 'aa':
      return {
        ...state,
        appInfo: action.aa,
      }
  }
};

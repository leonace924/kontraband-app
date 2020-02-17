const defaultState = {
  user: {},
  errors: {},
  isSignedIn: false,
  error: '',
  loading: false
};

const Auth = (state = defaultState, action) => {
  switch (action.type) {
    case 'POST_DATA':
      return { ...state, loading: true };
    case 'DATA_RECEIVED':
      if (action.json && action.json.errors) {
        return { ...state, errors: action.json.errors, loading: false }
      } else if (action.json) {
        return { ...state, user: action.json, isSignedIn: true, loading: false }
      }
    case 'LOGIN_DATA_RECEIVED':
      if (action.json && action.json.error) {
        return { ...state, error: action.json.error, loading: false }
      } else if (action.json) {
        return { ...state, user: action.json, isSignedIn: true, loading: false }
      }
      case 'SOCIAL_LOGIN_DATA_RECEIVED':
      return { ...state, isSignedIn: true, loading: false }
    case 'USER_LOGIN':
      return { ...state, user: {}, isSignedIn: false, error: '', loading: true }
    case 'USER_SIGN_UP':
      return { ...state, user: {}, isSignedIn: false, errors: {}, loading: true }
    case 'LOGOUT_USER_SUCCESS':
      return { ...state, user: {}, isSignedIn: false, error: '' }
    default:
      return state;
  }
};

export default Auth;
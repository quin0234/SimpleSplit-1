import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, CREATE_USER, SAVE_USER, DISPLAYNAME_CHANGED, BANK_CHANGED, CONTACTEMAIL_CHANGED, SALARY_CHANGED, RESET_PW_EMAIL } from '../actions/types';

const INITIAL_STATE = { email: '', password: '', user: null, error:'', loading: false};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
  switch (action.type) {
      case EMAIL_CHANGED:
          return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
          return {...state, password: action.payload };
      case LOGIN_USER:
          return {...state, loading: true, error: '' }
      case LOGIN_USER_SUCCESS:
          return { ...state, ...INITIAL_STATE, user: action.payload};
      case LOGIN_USER_FAIL:
          return {...state, error: 'Authentication Failed.', password: '', loading: false};
      case CREATE_USER:
          return {...state, loading: true, error: '' }
    case SAVE_USER:
          return {...state, loading: true, error: '' }
    case DISPLAYNAME_CHANGED:
          return {...state, displayName: action.payload };
    case BANK_CHANGED:
          return {...state, bank: action.payload };
    case SALARY_CHANGED:
          return {...state, salary: action.payload };
    case RESET_PW_EMAIL:
        return {...state, loading: true, error: ''}
      default:
          return state;
  }
};
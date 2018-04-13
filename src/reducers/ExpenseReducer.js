import { PICTURE, EXPENSE_TITLE_CHANGED, 
    SAVE_EXPENSE, 
    CLEAR_EXPENSE_FORM, 
    EXPENSE_AMOUNT_CHANGED, 
    EXPENSE_DES_CHANGED } from '../actions/types';

const INITIAL_STATE = { expenseTitle: '',expenseAmount: '',expenseDes: '', picture: '', error:'', loading: false};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
  switch (action.type) {
    case EXPENSE_TITLE_CHANGED:
        return {...state, expenseTitle: action.payload}
    case EXPENSE_AMOUNT_CHANGED:
        return{...state, expenseAmount: action.payload}
    case EXPENSE_DES_CHANGED:
        return{...state, expenseDes: action.payload}
    case PICTURE:
        return {...state, picture: action.payload}
    case SAVE_EXPENSE:
        return {...state, loading: true, error: '' }
    case CLEAR_EXPENSE_FORM:
        return INITIAL_STATE;
      default:
          return state;
  }
};
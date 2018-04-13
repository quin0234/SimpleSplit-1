import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserProfileFormReducer from './UserProfileFormReducer';
import ProfileReducer from './ProfileReducer';
import ExpenseReducer from './ExpenseReducer';
import fetchExpenseReducer from './fetchExpenseReducer';

export default combineReducers({
    auth: AuthReducer,
    userProfileForm: UserProfileFormReducer,
    profile: ProfileReducer,
    expense: ExpenseReducer,
    fetchedExpense: fetchExpenseReducer
});
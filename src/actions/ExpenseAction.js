import {
    PICTURE,
    EXPENSE_TITLE_CHANGED,
    SAVE_EXPENSE,
    CLEAR_EXPENSE_FORM,
    EXPENSE_FETCH_SUCCESS,
    EXPENSE_AMOUNT_CHANGED,
    EXPENSE_DES_CHANGED,
    EXPENSE_CAT_CHANGED
} from './types';
import axios from 'axios';
import * as firebase from 'firebase';
import moment from 'moment'
import { Actions } from 'react-native-router-flux';

export const pictureChanged = (text) => {
    return {
        type: PICTURE,
        payload: text
    };
};

export const expenseTitleChanged = (text) => {
    return {
        type: EXPENSE_TITLE_CHANGED,
        payload: text,
    };
};

export const expenseAmountChanged = (text) => {
    return {
        type: EXPENSE_AMOUNT_CHANGED,
        payload: text,
    }
}

export const expenseDesChanged = (text) => {
    return {
        type: EXPENSE_DES_CHANGED,
        payload: text,
    }
}


export function expenseFetchSuccess(data) {
    return {
        type: EXPENSE_FETCH_SUCCESS,
        data: data
    };
}

export const saveExpense = ({expenseTitle, expenseAmount, expenseDes}) => {
    const  { currentUser } = firebase.auth();
    console.log(currentUser.displayName);
    const createdBy = currentUser.displayName
    const createdOn = moment(new Date()).format("YYYY-MM-DD")
    const expenseStatus = "pending";
    return (dispatch) => {
        dispatch({type: SAVE_EXPENSE})
        console.log(expenseTitle, expenseAmount, expenseDes);
        firebase.database().ref(`/expenses/${currentUser.uid}`)
        .push({expenseTitle, expenseAmount, expenseDes, createdBy, createdOn, expenseStatus})
        .then(() => {
            dispatch({ type: CLEAR_EXPENSE_FORM})
            Actions.main()
        });
    };
};


import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL, 
    LOGIN_USER, 
    CREATE_USER,
    DISPLAYNAME_CHANGED,
    CONTACTEMAIL_CHANGED, 
    BANK_CHANGED, 
    SALARY_CHANGED, 
    SAVE_USER,
    RESET_PW_EMAIL
  } from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text,
    }
};

export const displayNameChanged = (text) => {
    return {
        type: DISPLAYNAME_CHANGED,
        payload: text,
    }
};

export const bankNameChanged = (text) => {
    return {
        type: BANK_CHANGED,
        payload: text,
    }
};

export const connectEmailChanged = (text) => {
    return {
        type: CONTACTEMAIL_CHANGED,
        payload: text,
    }
};

export const salaryChanged = (text) => {
    return {
        type: SALARY_CHANGED,
        payload: text,
    }
};

export const resetPWEmail = ({email}) => {
    return (dispatch) => {
        dispatch({type: RESET_PW_EMAIL});
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email).then(function() {
            console.log('email sent')
          }).catch(function(error) {
            console.log(error.message)
          });
    }
}

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(function(error) {
                console.log(error)
            });
    };
};

export const createUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({ type: CREATE_USER});

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(  user => loginUserSuccessCU(dispatch, user))
        .then(function(){
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                console.log('email sent')
                Actions.saveAccount();
              }).catch(function(error) {
                console.log(error)
              });

        })
            .catch(() => loginUserFail(dispatch))     
    };
};
onLogOut = () => {
    firebase.auth().signOut().then(function() {
        Actions.login()
      }, function(error) {
        console.log("Failed to logout");
      });
}

export const saveUser = ({displayName, bank, salary}) => {
    return (dispatch) => {
        dispatch({ type: SAVE_USER});
        console.log(displayName)
        console.log(bank, salary,)
        const  { currentUser } = firebase.auth();
        const userUID = currentUser.uid
        firebase.database().ref(`/users/${currentUser.uid}/`)
        .push({bank, salary, userUID})
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: displayName,
          }).then(function() {
            onLogOut()
          }).catch(function(error) {
            console.log('Didnt work')
          });
    }
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.main();
};
const loginUserSuccessCU = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    
};


const loginUserFail = (dispatch) => {
    dispatch({type: LOGIN_USER_FAIL})
};
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { PROFILE_UPDATE, PROFILE_SAVED, PROFILE_FETCH_SUCCESS } from './types';

export const ProfileUpdate = ({ prop, value }) => {
    return {
        type: PROFILE_UPDATE,
        payload: { prop, value}
    };
}; 

export const UserProfileSave = ({ firstName, lastName, bank }) => {
    const  { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/profile`)
    .push({firstName, lastName, bank})
    .then(() => {
        dispatch({ type: PROFILE_SAVED})
    })
    } 
};

export const ProfileFetch = () => {
    const  { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/profile`)
        .on('value', snapshot => {
            dispatch({type: PROFILE_FETCH_SUCCESS, payload: snapshot.val()});
        })
    }
};
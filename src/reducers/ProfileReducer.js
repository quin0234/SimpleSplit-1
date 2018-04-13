import {
    PROFILE_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE= {
    displayName:''
};

export default (state = INITIAL_STATE, action ) => {
    switch(action.type) {
       case PROFILE_FETCH_SUCCESS:
        return action.payload;
        default:
        return state;
    }
};
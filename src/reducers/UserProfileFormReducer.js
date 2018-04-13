import {
    PROFILE_UPDATE, 
    PROFILE_SAVED
} from '../actions/types';

const INITIAL_STATE= {
    displaName:''
};

export default (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case PROFILE_UPDATE:
        //action.payload === { prop: 'firstName', value: 'paul'}
        return {...state, [action.payload.prop]: action.payload.value};
        case PROFILE_SAVED:
        return INITIAL_STATE;
        default:
        return state;
    }
};
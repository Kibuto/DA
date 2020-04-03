import * as Types from '../constants/ActionTypes';

export default (state, action) => {
    switch (action.type) {
        case Types.FETCH_CATEGORIES: {
            console.log("Redux categories: ", action.categories);
            return {
                ...state,
                categories: action.categories
            };
        }
       default:
           return state;
    }
}
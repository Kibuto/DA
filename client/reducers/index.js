import * as Types from '../constants/ActionTypes';

export default (state, action) => {
    switch (action.type) {
        case Types.FETCH_CATEGORIES: {
            return {
                ...state,
                categories: action.categories
            };
        }
        case Types.FETCH_PRODUCTS: {
            return {
                ...state,
                products: action.products
            };
        }
       default:
           return state;
    }
}
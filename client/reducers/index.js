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
        /* ======================Will Repair in the future========================= */ 
        case Types.FETCH_PRODUCTSHOME: {
            return {
                ...state,
                categoriesHome: action.categoriesHome
            };
        }

        case Types.CHANGE_TYPESHOME: {
            return {
                ...state,
                typesHome: action.typesList
            }
        }
        /* =============================================== */ 
       default:
           return state;
    }
}
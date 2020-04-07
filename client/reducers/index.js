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

        case Types.FETCH_NOTIFICATIONS: {
            console.log("Action: ", action);
            return {
                ...state,
                amountNotifications: action.amountNotifications,
                listNotifications: action.listNotifications
            }
        }
       default:
           return state;
    }
}
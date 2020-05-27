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

        case Types.FETCH_PRODUCTSLIKE: {
            return {
                ...state,
                categoriesLike: action.categoriesLike
            }
        }
        /* =============================================== */

        case Types.FETCH_NOTIFICATIONS: {
            return {
                ...state,
                amountNotifications: action.amountNotifications,
                listNotifications: action.listNotifications
            }
        }

        case Types.FETCH_CHECKNOTIFICATIONS: {
            return {
                ...state,
                amountNotifications: 0
            }
        }

        case Types.FETCH_LOGIN: {
            return {
                ...state,
                token: action.token
            }
        }

        case Types.FETCH_LOGINERROR: {
            return {
                ...state,
                errorEmailServer: action.email,
                errorPasswordServer: action.password,
                errorMessageServer: action.message
            }
        }

        case Types.FETCH_LOGOUT: {
            return {
                ...state,
                token: '',
                isAdmin: false,
                listOrder: []
            }
        }

        case Types.FETCH_GETORDER: {
            return {
                ...state,
                listOrder: action.listOrder,
                isAdmin: action.isAdmin
            }
        }

        case Types.FETCH_CHECKANDREFUSEORDER: {
            return {
                ...state,
                listOrder: state.listOrder.splice(action.index, 1)
            }
        }

        default:
            return state;
    }
}
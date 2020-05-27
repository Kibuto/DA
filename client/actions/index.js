import * as Types from '../constants/ActionTypes';
import { _handleSaveInStorage } from '../utils/Storage';
import { fetchAPINormal, fetchAPIAuthentication } from '../utils/Request';
export const fetchCategoriesRequest = () => {
    return (dispatch) => {
        return fetchAPINormal('api/categories', 'GET', null)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchCategories(json.message))
                }
            });
    }
}

export const fetchCategories = (categories) => {
    return {
        type: Types.FETCH_CATEGORIES,
        categories
    }
}

export const fetchProductsRequest = (id) => {
    return (dispatch) => {
        return fetchAPINormal('api/products', 'POST', id)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchProducts(json.message))
                }
            });
    }
}

export const fetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}

/* =======================Will Repair in the future======================== */
export const fetchProductsLikeRequest = (id) => {
    return (dispatch) => {
        return fetchAPINormal('api/products', 'POST', id)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchProductsLike(json.message))
                }
            });
    }
}

export const fetchProductsLike = (categoriesLike) => {
    return {
        type: Types.FETCH_PRODUCTSLIKE,
        categoriesLike
    }
}

export const fetchProductsHomeRequest = (id) => {
    return (dispatch) => {
        return fetchAPINormal('api/products', 'POST', id)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchProductsHome(json.message))
                }
            });
    }
}

export const fetchProductsHome = (categoriesHome) => {
    return {
        type: Types.FETCH_PRODUCTSHOME,
        categoriesHome
    }
}

export const changeTypesHome = (typesList) => {
    return {
        type: Types.CHANGE_TYPESHOME,
        typesList
    }
}
/* =============================================== */

export const fetchNotificationsRequest = (bearer) => {
    return (dispatch) => {
        return fetchAPIAuthentication('api/notifications', 'GET', null, bearer)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchNotifications(json.amount, json.data))
                }
                else {
                    console.log('Mission fail fetch notification', json);
                }
            });
    }
}

export const fetchNotifications = (amountNotifications, listNotifications) => {
    return {
        type: Types.FETCH_NOTIFICATIONS,
        amountNotifications,
        listNotifications
    }
}

export const fetchCheckNotificationsRequest = (bearer) => {
    return (dispatch) => {
        return fetchAPIAuthentication('api/checkNotification', 'PUT', null, bearer)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchCheckNotifications());
                }
                else {
                    console.log('Mission fail fetch check notification', json);
                }
            });
    }
}

export const fetchCheckNotifications = () => {
    return {
        type: Types.FETCH_CHECKNOTIFICATIONS
    }
}

export const fetchLoginRequest = (obj, fnc) => {
    return (dispatch) => {
        return fetchAPINormal('api/account/signin', 'POST', obj)
            .then(res => res.json())
            .then(async json => {
                if (json.success) {
                    const bearer = `Bearer ${json.token}`;
                    await _handleSaveInStorage('token', json.token);
                    dispatch(fetchVerifyRequest(json.token, bearer, fnc))
                }
            });
    }
}

export const fetchVerifyRequest = (token, bearer, fnc) => {
    return (dispatch) => {
        return fetchAPIAuthentication('api/verify', 'GET', null, bearer)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchLogin(token));
                    fnc(json.name, token);
                }
            });
    }
}

export const fetchLogin = (token) => {
    return {
        type: Types.FETCH_LOGIN,
        token
    }
}

export const fetchLogout = () => {
    return {
        type: Types.FETCH_LOGOUT
    }
}

export const fetchGetOrderRequest = (bearer) => {
    return (dispatch) => {
        return fetchAPIAuthentication('api/order/getOrder', 'GET', null, bearer)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchGetOrder(json.order, json.isAdmin));
                }
            });
    }
}

export const fetchGetOrder = (listOrder, isAdmin) => {
    return {
        type: Types.FETCH_GETORDER,
        listOrder,
        isAdmin
    }
}

export const fetchCheckOrderRequest = (bearer, id, index) => {
    return (dispatch) => {
        return fetchAPIAuthentication('api/order/checkOrder', 'PUT', id, bearer)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchCheckAndRefuseOrder(index));
                }
            });
    }
}

export const fetchCheckAndRefuseOrder = (index) => {
    return {
        type: Types.FETCH_CHECKANDREFUSEORDER,
        index
    }
}

export const fetchRefuseOrderRequest = (bearer, id, index) => {
    return (dispatch) => {
        return fetchAPIAuthentication('api/order/refuseOrder', 'PUT', id, bearer)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(fetchCheckAndRefuseOrder(index));
                }
            });
    }
}
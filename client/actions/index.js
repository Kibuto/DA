import * as Types from '../constants/ActionTypes';
import { HOST } from '../key';
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
                    console.log("Notification request");
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

export const addToCart = (product) => {
    return {
        type: Types.ADDTOCART,
        product
    }
}
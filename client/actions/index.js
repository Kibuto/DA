import * as Types from '../constants/ActionTypes';
import { fetchAPINormal } from '../utils/Request';
export const fetchCategoriesRequest = () => {
    return (dispatch) => {
        return fetchAPINormal('api/categories', 'GET', null)
            .then(res => res.json())
            .then(json => {
                if(json.success) {
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
                    if(json.success) {
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
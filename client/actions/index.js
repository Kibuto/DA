import * as Types from '../constants/ActionTypes';
import { fetchAPINormal } from '../utils/Request';
export const fetchCategoriesRequest = () => {
    return (dispatch) => {
        return fetchAPINormal('categories', 'GET', null)
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
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
const initialState = {
    token: '',
    listOrder: [],
    isAdmin: false,
    categories: [],
    products: [],
    categoriesLike: [],
    categoriesHome: [],
    typesHome: [
        {
            id: 1,
            title: 'All',
            selected: true,
            category: 'Romance'
        },
        {
            id: 2,
            title: 'Recommended',
            selected: false,
            category: 'Mystery'
        },
        {
            id: 3,
            title: 'Popular books',
            selected: false,
            category: 'History'
        },
        {
            id: 4,
            title: 'Best seller',
            selected: false,
            category: 'Healthy'
        }
    ],
    amountNotifications: 0,
    listNotifications: [],
    errorEmailServer: false,
    errorPasswordServer: false,
    errorMessageServer: ''
};
export const store = createStore(reducer, initialState, applyMiddleware(thunk));
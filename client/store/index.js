import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
const initialState = {
    categories: [],
    products: [],
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
    listNotifications: []
};
export const store = createStore(reducer, initialState, applyMiddleware(thunk));
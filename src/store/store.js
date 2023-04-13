import { configureStore } from "@reduxjs/toolkit";
import textReducer from './search/reducer'
import categoryReducer from './Categories/reducer'
import statusReducer from './StatusDrawer/reducer'
import textStoresReducer from './searchStores/reducer'
import categoriesStoresReducer from './CategoriesStores/reducer'
import textFavoritesReducer from './searchFavorite/reducer'
import categoriesFavoritesReducer from './CategoriesFavorite/reducer'
import StatusFavReducer from './StatusFav/reducer'

export const store = configureStore({
    reducer: {
        text: textReducer,
        categories: categoryReducer,
        status: statusReducer,
        textStores: textStoresReducer,
        categoriesStores: categoriesStoresReducer,
        textFav: textFavoritesReducer,
        categoriesFav: categoriesFavoritesReducer,
        statusFav: StatusFavReducer
    }
})
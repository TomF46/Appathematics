import { configureStore } from '@reduxjs/toolkit'
import game from "./reducers/gameReducer";
import { loadState } from '../services/localStore';

let stateWithStoredItems = loadState();
export default configureStore({
    reducer: {
        game: game
    },
    preloadedState: stateWithStoredItems
})
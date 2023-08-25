import { configureStore } from '@reduxjs/toolkit'
import game from "./reducers/gameReducer";

export default configureStore({
    reducer: {
        game: game
    },
    
})
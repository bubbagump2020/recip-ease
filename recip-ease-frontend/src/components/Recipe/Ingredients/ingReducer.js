import { ingActions } from '../../../redux/constants/index'

const initialState = {
    ingredient: {
        name: null,
        measurement: null
    },
    allIngredients: []
}

export const ingredient = (state = initialState, action) => {
    switch(action.type){
        case ingActions.ING_NAME:
            return{
                ...state,
                ingredient: {
                    ...state.ingredient,
                    name: action.payload
                }
            }
        case ingActions.ING_MEASURE:
            return{
                ...state,
                ingredient: {
                    ...state.ingredient,
                    measurement: action.payload
                }
            }
        case ingActions.ALL_ING:
            return{
                ...state,
                allIngredients: action.payload
            }
        case ingActions.UPDATE_ING:
            return {
                ...state,
                ingredient: action.payload
            }
        default:
            return state
    }
}

import { combineReducers } from 'redux'
import { authentication } from '../../components/Home/authReducer'
import { recipe } from '../../components/Recipe/reciReducer'
import { ingredient } from '../../components/Recipe/Ingredients/ingReducer'

const rootReducer = combineReducers({
    authentication,
    recipe,
    ingredient
})

export default rootReducer
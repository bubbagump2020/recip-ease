import React, { useEffect } from 'react'
import IngredientCard from './IngredientCard'
import { useDispatch, useSelector } from 'react-redux'
import { allIng } from '../../../redux/actions/ingActions'

const IngredientContainer = (props) => {

    const dispatch = useDispatch()
    const { ingredients } = useSelector(state => ({ ingredients: state.ingredient.allIngredients }))    

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await fetch(`/ingredients`)
            const ingData = await response.json()
            const dispatchData = ingData.filter(ingredient => ingredient.recipe_id === props.recipe.id )
            dispatch(allIng(dispatchData))
        }
        fetchIngredients()
    }, [props.recipe, dispatch])

    const listIngredients = () => {
        return ingredients.map(ingredient => {
            return(
                <div key={ingredient.id}>
                    <IngredientCard ing={ingredient} recipe={props.recipe} />
                </div>
            )
        })
    }


    return(
        <div>
            {listIngredients()}
        </div>
    )
}

export default IngredientContainer;
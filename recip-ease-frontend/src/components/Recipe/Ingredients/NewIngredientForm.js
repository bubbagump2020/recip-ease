import React from 'react'
import { ROOT_URL } from '../../Constants/Constants'
import { Box, TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ingName, ingMeasure, allIng, createIng } from '../../../redux/actions/ingActions'

const NewIngredientForm = (props) => {

    const dispatch = useDispatch()
    const { ingredient } = useSelector(state => ({ ingredient: state.ingredient.ingredient }))
    const ingredientRecipeId = props.recipeId

    const handleSubmit = (e) => {
        e.preventDefault()
        const submitFetch = async () => {
            const response = await fetch(`${ROOT_URL}/recipes/${ingredientRecipeId}/ingredients`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-Requested-With': 'XmlHttpRequest',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    recipe_id: ingredientRecipeId,
                    name: ingredient.name,
                    measurement: ingredient.measurement
                })
            })
            const createData = response.json()
            dispatch(createIng(createData))
            const newFetchResponse = await fetch(`${ROOT_URL}/recipes/${ingredientRecipeId}/ingredients`)
            const updatedIngList = await newFetchResponse.json()
            const dispatchUpdatedIngList = updatedIngList.filter(ingredient => ingredient.recipe_id === ingredientRecipeId)
            dispatch(allIng(dispatchUpdatedIngList))
        }
        submitFetch()
    }


    return(
        <Box>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <TextField
                        type="text"
                        margin="normal"
                        label="Ingredient Name"
                        variant="outlined"
                        onChange={e => dispatch(ingName(e.target.value))}
                    />
                </div>
                <div>
                    <TextField
                        type="text"
                        margin="normal"
                        label="measurement"
                        variant="outlined"
                        onChange={e => dispatch(ingMeasure(e.target.value))}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"    
                    color="primary"
                >   Add
                </Button>
            </form>
        </Box>
    )
}

export default NewIngredientForm;
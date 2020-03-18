import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@material-ui/core'
import { currentUserRecipes } from '../../redux/actions/reciActions'

const UpdateRecipeForm = (props) => {

    const dispatch = useDispatch()
    const instructions = props.recipe.instruction
    const [ recipe, setRecipe ] = React.useState({
        id: props.recipe.id,
        instructions: props.recipe.instruction
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedRecipeResponse = await fetch(`/recipes/${recipe.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XmlHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                instruction: recipe.instructions
            })
        })
        const updatedRecipeListResponse = await fetch(`/recipes`)
        const updatedRecipeList = await updatedRecipeListResponse.json()
        dispatch(currentUserRecipes(updatedRecipeList))
    }

    return(
        <form onSubmit={handleSubmit}>
            <TextField
                style={{ width: "100%"}}
                margin="normal"
                defaultValue={`${instructions}`}
                variant="outlined"
                multiline
                rows="10"
                onChange={e => setRecipe({ ...recipe, instructions: e.target.value })}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Update
            </Button>
        </form>
    )
}

export default UpdateRecipeForm
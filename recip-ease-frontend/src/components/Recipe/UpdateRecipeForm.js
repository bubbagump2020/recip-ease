import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, TextField } from '@material-ui/core'
import { currentUserRecipes } from '../../redux/actions/reciActions'
import { ROOT_URL } from '../Constants/Constants'

const UpdateRecipeForm = (props) => {

    const dispatch = useDispatch()
    const { authUser } = useSelector(state =>({ authUser: state.authentication.loggedInUser.token.username }))
    const instructions = props.recipe.instruction
    const [ recipe, setRecipe ] = React.useState({
        id: props.recipe.id,
        instructions: props.recipe.instruction
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedRecipeResponse = await fetch(`${ROOT_URL}/recipes/${recipe.id}`, {
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
        const updatedRecipe = await updatedRecipeResponse.json()
        const updatedRecipeListResponse = await fetch(`${ROOT_URL}/users/${authUser}/recipes`)
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
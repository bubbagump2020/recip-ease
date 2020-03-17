import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, TextField} from '@material-ui/core'
import { ingName, ingMeasure, allIng, updateIng } from '../../../redux/actions/ingActions'
import { ROOT_URL } from '../../Constants/Constants'

const UpdateIngredientForm = (props) => {

    const dispatch = useDispatch()
    const ingredient = props.ingredient.ing
    const [updatedIngredient, setUpdatedIngredient] = React.useState({
        name: ingredient.name,
        measurement: ingredient.measurement,
    })
    const recipe = props.ingredient.recipe

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateResponse = await fetch(`${ROOT_URL}/ingredients/${ingredient.id}`,{
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XmlHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: updatedIngredient.name,
                measurement: updatedIngredient.measurement
            })
        })
        const updateIngredient = await updateResponse.json()
        dispatch(updateIng(updateIngredient))
        const updatedIngListResponse = await fetch(`${ROOT_URL}/recipes/${recipe.recipe_id}/ingredients`)
        const updatedIngList = await updatedIngListResponse.json()
        dispatch(allIng(updatedIngList))
    } 

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    type="text"
                    margin="normal"
                    label="Ingredient Name"
                    variant="outlined"
                    placeholder="Name"
                    defaultValue={`${updatedIngredient.name}`}
                    onChange={e => setUpdatedIngredient({ ...updatedIngredient, name: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    type="text"
                    margin="normal"
                    label="measurement"
                    variant="outlined"
                    placeholder="Measurement"
                    defaultValue={`${updatedIngredient.measurement}`}
                    onChange={e => setUpdatedIngredient({ ...updatedIngredient, measurement: e.target.value})}
                />
            </div>
            <Button
                type="submit"
                variant="contained"    
                color="primary"
            >   Update
            </Button>
        </form>
    )
}

export default UpdateIngredientForm
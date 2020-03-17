import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_URL } from '../Constants/Constants'
import { Box, Container, Typography, AppBar, Toolbar, Button, makeStyles, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { UserHomeButton, RecipeIndexButton, SignOutButton} from '../Buttons/MenuButtons'
import { recipeName, recipeDesc, recipeInst, reciValue } from '../../redux/actions/reciActions'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
    }
}))

const NewRecipeForm = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { authUser } = useSelector(state => ({authUser: state.authentication.loggedInUser }))
    const { recipe } = useSelector(state => ({ recipe: state.recipe.recipe }))

    const handleSubmit = async (e) => {
        const submitResponse = await fetch(`${ROOT_URL}/users/${authUser.token.username}/recipes`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XmlHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: authUser.user_id,
                name: recipe.name,
                description: recipe.description,
                instruction: recipe.instructions,
                category: recipe.value
            })
        })
        const submitData = await submitResponse.json()
        // Form Error Catching Here

    }

    return(
        <Box>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        {`${authUser.token.username}'s New Recipe`}
                    </Typography>
                    <RecipeIndexButton />
                    <UserHomeButton />
                    <SignOutButton />
                </Toolbar>
            </AppBar>
            <Container className={classes.root}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5">
                        New Recipe
                    </Typography>
                    <div><br></br>
                        <FormControl>
                            <FormLabel component="legend">Category</FormLabel>
                            <RadioGroup
                                className={classes.formControl}
                                aria-label="category"
                                name="category1"
                                value={recipe.value}
                                onChange={e => dispatch(reciValue(e.target.value))}
                            >
                                <FormControlLabel
                                    value="beef"
                                    control={<Radio />}
                                    label="Beef"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="pork"
                                    control={<Radio />}
                                    label="Pork"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="poultry"
                                    control={<Radio />}
                                    label="Poultry"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="dessert"
                                    control={<Radio />}
                                    label="Dessert"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="cookie"
                                    control={<Radio />}
                                    label="Cookies"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="pastry"
                                    control={<Radio />}
                                    label="Pastry"
                                    labelPlacement="top"
                                />
                                <FormControlLabel
                                    value="misc"
                                    control={<Radio />}
                                    label="Misc."
                                    labelPlacement="top"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div><br></br>
                    <div>
                        <FormLabel component="legend">Recipe Name</FormLabel>
                        <TextField
                            style={{ width: "35%" }}
                            margin="normal"
                            type="text"
                            variant="outlined"
                            onChange={e => dispatch(recipeName(e.target.value))}
                        />
                    </div><br></br>
                    <div>
                        <FormLabel component="legend">Recipe Description</FormLabel>
                        <TextField
                            style={{ width: "35%" }}
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows="2"
                            onChange={e => dispatch(recipeDesc(e.target.value))}
                        />
                    </div><br></br>
                    <div>
                        <FormLabel component="legend">Cooking Instructions</FormLabel>
                        <TextField
                            style={{ width: "50%"}}
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows="10"
                            onChange={e => dispatch(recipeInst(e.target.value ))}
                        />
                    </div><br></br>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        
                    >   Create Recipe
                    </Button>
                </form>
            </Container>
        </Box>
    )
}

export default NewRecipeForm
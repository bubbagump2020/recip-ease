import React from 'react'
import { ROOT_URL } from '../Constants/Constants'
import RecipeCard from './RecipeCard'
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Container,  
} from '@material-ui/core'
import { UserHomeButton, CreateRecipeButton, SignOutButton} from '../Buttons/MenuButtons'
import { useSelector, useDispatch } from 'react-redux'
import { currentUserRecipes } from '../../redux/actions/reciActions'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    content: {
        display: 'flex',
        flexDirection: 'inherit',
        alignContent: 'center',
        flexWrap: 'wrap',
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    title: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar
}))
const RecipeContainer = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const { authUser } = useSelector(state => ({authUser: state.authentication.loggedInUser }))
    const { userRecipes } = useSelector(state => ({ userRecipes: state.recipe.currentUserRecipes }))

    React.useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch(`${ROOT_URL}/users/${authUser.token.username}/recipes`)
            const recipes = await response.json()
            console.log(recipes)
            const userRecipes = recipes.recipes.filter(recipe => recipe.user_id === authUser.user_id)
            dispatch(currentUserRecipes(userRecipes))
        }
        fetchRecipes()
    }, [authUser.token.username, authUser.user_id, dispatch])

    const showRecipes = () => {
        return userRecipes.map(recipe => {
            return(
                <React.Fragment key={recipe.id}>
                    <RecipeCard attributes={recipe} id={recipe.id} user={authUser.token.username}/>
                </React.Fragment>
            )
        })
    }

    return(
        <div>
            <AppBar className={classes.appBar} position="sticky">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        {authUser.token.username} Recipes
                    </Typography>
                    <UserHomeButton />
                    <CreateRecipeButton />
                    <SignOutButton />
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" className={classes.content}>
                <div className={classes.toolbar} />
                    {showRecipes()}
            </Container>
        </div>
    )
}

export default RecipeContainer
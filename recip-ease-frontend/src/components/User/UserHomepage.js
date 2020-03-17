import React from 'react'
import { useSelector } from 'react-redux'
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    CssBaseline,
} from '@material-ui/core'
import { RecipeIndexButton, CreateRecipeButton, SignOutButton } from '../Buttons/MenuButtons'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    title: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar
}))

const UserHomepage = () => {

    const classes = useStyles()
    const { user } = useSelector(state => ({ user: state.authentication.loggedInUser.token.username }))

    return(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar} >
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Recip-Ease User Home
                    </Typography>
                    <RecipeIndexButton />
                    <CreateRecipeButton />
                    <SignOutButton />
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography>
                    Welcome {user}! Click "Recipes" to see all of your recipes or "Create Recipe" to add a new recipe!
                </Typography>
            </main>
        </div>
    )
}

export default UserHomepage;
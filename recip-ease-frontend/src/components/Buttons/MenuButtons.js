import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { ROOT_URL } from '../Constants/Constants'

export const UserHomeButton = () => {
    return(
        <React.Fragment>
            <Button color="inherit" href={`/users/${user}`}>
                User Home
            </Button>
        </React.Fragment>
    )
}

export const RecipeIndexButton = () => {
    return(
        <React.Fragment>
            <Button color="inherit" href={`/recipes`}>
                Recipes
            </Button>
        </React.Fragment>
    )
}

export const CreateRecipeButton = () => {
    return(
        <React.Fragment>
            <Button color="inherit" href={`/recipes/new`}>
                Create Recipe
            </Button>
        </React.Fragment>
    )

}

export const SignOutButton = () => {
    const [ navigate, setNavigate ] = React.useState(false)

    const logOutClick = async () => {
        sessionStorage.clear('userToken')
        const logOutResponse = await fetch(`/logout`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XmlHttpRequest',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
        })
        const logOut = await logOutResponse.json()
        console.log(logOut)
        setNavigate(true)
    }

    const checkLogOutState = () => {
        if (navigate){
            return <Redirect to="/" push={true} />
        }
    }

    return(
        <Button color="inherit" onClick={logOutClick}>
            Sign Out
            {checkLogOutState()}
        </Button>
    )
}
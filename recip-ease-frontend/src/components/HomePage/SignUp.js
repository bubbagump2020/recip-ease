import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { username, password, confirmPassword, authenticatedUser } from '../../redux/actions/authActions'
import { ROOT_URL } from '../Constants/Constants'
import { Box, Grid, Button, TextField, Typography } from '@material-ui/core'



const SignUp = (props) => {

    const dispatch = useDispatch()
    const { authUser } = useSelector(state => ({ authUser: state.authentication.user }))
    const passNotify = () => {
        toast.error("Passwords don't match", { position: toast.POSITION.TOP_CENTER })
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (authUser.password === authUser.confirm_password){
            const response = await fetch(`${ROOT_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: authUser.username,
                    password: authUser.password
                })
            })
            const data = await response.json()
            if (data.success){
                dispatch(authenticatedUser(data))
                props.props.history.push(`/users/${authUser.username}`)
                toast.success(`${data.success_message}`)
            } else {
                const userNotify = () => {
                    toast.error(`${data.errors}`, { position: toast.POSITION.TOP_CENTER })
                }
                userNotify()
            }
        } else {
            passNotify()
        }
        
    }

    return(
        <Box>
            <Typography variant="h5">
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            type="text"
                            label="Username"
                            variant="filled"
                            onChange={e => dispatch(username(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            type="password"
                            label="Password"
                            variant="filled"
                            onChange={e => dispatch(password(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            margin="normal"
                            type="password"
                            label="Confirm Password"
                            variant="filled"
                            onChange={e => dispatch(confirmPassword(e.target.value))}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >   Sign Up
                    </Button>
                </Grid>
            </form>
        </Box>
    )
}

export default SignUp;
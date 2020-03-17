import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ROOT_URL } from '../Constants/Constants'
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
    TextField,
    Container
} from '@material-ui/core'
import {
    password,
    confirmPassword,
    username,
    authenticatedUser,
    checkLogin
} from '../../redux/actions/authActions'

const useStyles = makeStyles(theme => ({
    root:{
        display: 'flex',
        flexGrow: 1,
    },
    toolBarTitle:{
        
        flexGrow: 1,
    },
}))

const SignIn = (props) => {
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const { authUser } = useSelector(state => ({ authUser: state.authentication.user }))
    const loginProps = props

    var token = document
    console.log(token)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const resultUser = await fetch(`${ROOT_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XmlHttpRequest',
                'X-CSRF-Token': 'my-csrf-token',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: authUser.username,
                password: authUser.password
            }),
        })

        
        
        const loggedInUser = await resultUser.json()
        console.log(loggedInUser)
        if(loggedInUser.success){
            sessionStorage.setItem('userToken', loggedInUser.token.session_id)
            dispatch(authenticatedUser(loggedInUser))
            loginProps.history.push(`/users/${loggedInUser.token.username}`)
            const successToast = () => {
                toast.success("Welcome!")
            }
            successToast()
        } else {
            const failToast = () => {
                toast.error(loggedInUser.errors, { position: toast.POSITION.TOP_CENTER })
            }
            failToast()
        }
    }

    const handlePasswordEntry = (e) => {
        dispatch(password(e.target.value))
        dispatch(confirmPassword(e.target.value))
    }

    return(
        <Box>
            <AppBar color="primary" position="sticky">
                <Toolbar>
                    <Typography variant="h5" className={classes.toolBarTitle}>
                        Recip-Ease Sign In
                    </Typography>
                    <Button href="/" color="inherit">Home</Button>
                </Toolbar>
            </AppBar>
            <Container className={classes.root}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        type="text"
                        label="Username"
                        variant="filled"
                        onChange={e => dispatch(username(e.target.value))}
                    />
                    
                    <TextField
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Password"
                        variant="filled"
                        onChange={handlePasswordEntry}
                    />
                    <Button
                        type="submit"
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >   Sign In
                    </Button>
                </form>
            </Container>
        </Box>
    )
}

export default SignIn;
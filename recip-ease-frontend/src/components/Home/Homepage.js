import React from 'react'
import {
    Box,
    Grid,
    Paper,
    makeStyles,
    Typography,
    AppBar,
    Toolbar,
    Button
} from '@material-ui/core'
import SignUp from './SignUp'
import 'typeface-roboto'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper:{
        padding: theme.spacing(2),
        textAlign: 'center',
        alignItems: 'center',
        color: theme.palette.text.primary,
    },
    toolbarHeader:{
        MarginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}))

const Homepage = (props) => {
    const classes = useStyles()
    
    return(
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Recip-Ease
                    </Typography>
                    <Button color="inherit" href="/sessions/new">Sign In</Button>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.paper}>
                        <Typography variant="body1">
                            Tired of having all of those heavy cookbooks?
                            Worry no more! Welcome to Recip-Ease, an online recipe book
                            where you can store all of you favorite recipes
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <SignUp props={props}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>
                        <Typography variant="caption">
                            Created by Kevin Bagnall
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Homepage;
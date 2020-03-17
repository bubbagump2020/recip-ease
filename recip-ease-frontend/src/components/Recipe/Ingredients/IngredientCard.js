import React from 'react'
import {
    Card,
    makeStyles,
    CardHeader,
    IconButton,
    CardContent,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    Paper,
    ExpansionPanelDetails,
} from '@material-ui/core'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ROOT_URL } from '../../Constants/Constants'
import { useDispatch } from 'react-redux'
import { allIng } from '../../../redux/actions/ingActions'
import UpdateIngredientForm from './UpdateIngredientForm'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap'
    },
    content: {
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 12
    },
    deleteCard: {
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    expansionPanelRoot: {
        width: '100%'
    },
    expansionPanelHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
}))

const IngredientCard = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const ingredient = props.ing
    const recipe = props.recipe

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        const deleteResponse = await fetch(`${ROOT_URL}/ingredients/${ingredient.id}`,{
            method: 'DELETE',
            credentials: 'include'
        })
        const reFetchResponse = await fetch(`${ROOT_URL}/recipes/${recipe.name}/ingredients`)
        const reFetchData = await reFetchResponse.json()
        dispatch(allIng(reFetchData))
    }

    return(
        <Card className={classes.root} variant="outlined">
            <IconButton
                className={classes.deleteCard}
                onClick={handleDeleteClick}
            >
                <CloseOutlinedIcon  />
            </IconButton>
            <CardHeader title={ingredient.name} className={classes.content}/>
            <CardContent className={classes.content}>
                <Typography variant="body1">
                    {ingredient.measurement}
                </Typography>
            </CardContent>
            <div className={classes.expansionPanelRoot}>
            <CardContent>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panela-content"
                        id="panela-content"
                    >
                        <Typography className={classes.expansionPanelHeading}>
                            Update Ingredient
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <UpdateIngredientForm ingredient={props}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </CardContent>
            </div>
        </Card>
    )
}

export default IngredientCard;
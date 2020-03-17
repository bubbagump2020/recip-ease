import React, { useState } from 'react'
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    IconButton,
    CardHeader,
    CardMedia,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import NewIngredientForm from './Ingredients/NewIngredientForm'
import IngredientContainer from './Ingredients/IngredientContainer'
import UpdateRecipeForm from './UpdateRecipeForm'
import { ROOT_URL } from '../Constants/Constants'
import Beef from '../assets/new_beef.jpeg'
import Poultry from '../assets/chiken.jpeg'
import Pork from '../assets/new_pork.jpeg'
import Cake from '../assets/cake_is_not_a_lie.jpeg'
import Pastry from '../assets/tart.jpeg'
import Cookie from '../assets/cookies.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserRecipes, deleteRecipe } from '../../redux/actions/reciActions'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 345,
        minHeight: 345,
        margin: 5
    },
    expansionPanelRoot: {
        width: '100%'
    },
    expansionPanelHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    deleteCard: {
        marginLeft: 'auto'
    },
    ingCont: {
        display: 'flex',
        flexDirection: 'column',
        
        padding: theme.spacing(2),
    }

}))

const RecipeCard = (props) => {
    const classes = useStyles()
    const recipe = props.attributes
    const dispatch = useDispatch()
    const { authUser } = useSelector(state => ({authUser: state.authentication.loggedInUser}))
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleDeleteClick = () => {
        // Have confirmation Window asking user to be sure!
        const asyncDeleteFetch = async () => {
            const deleteResponse = await fetch(`${ROOT_URL}/recipes/${recipe.id}`,{
                method: "delete",
                credentials: "include"
            })
            const deletedRecipe = await deleteResponse.json()
            dispatch(deleteRecipe(deletedRecipe))
            const updatedRecipeListResponse = await fetch(`${ROOT_URL}/users/${authUser.token.username}/recipes`)
            const updatedRecipeList = await updatedRecipeListResponse.json()
            const userRecipes = updatedRecipeList.recipes.filter(recipe => recipe.user_id === authUser.user_id)
            dispatch(currentUserRecipes(userRecipes))
        }
        asyncDeleteFetch()
    }

    const returnDate = (recipeDate) => {
        const reciDate = new Date(recipeDate)
        const reciDay = reciDate.getDate()
        const reciMonth = reciDate.getMonth()
        const reciYear = reciDate.getFullYear()
        const fullDate = `${reciMonth + 1}/${reciDay}/${reciYear}`
        return fullDate
    }

    const showDates = (recipeCreateDate, recipeUpdateDate) => {
        const createDate = returnDate(recipeCreateDate)
        const updateDate = returnDate(recipeUpdateDate)
        if (createDate === updateDate){
            return createDate
        } else {
            return(
                <div>
                    <p>{`Created on ${createDate}`}</p>
                    <p>{`Updated on ${updateDate}`}</p>
                </div>
            )
        }
    }

    const showCardMedia = (imageCategory) => {
        switch(imageCategory){
            case 'beef':
                return(
                    <CardMedia
                        className={classes.media}
                        image={Beef}
                        title={recipe.name}
                    />
                )
            case 'poultry':
                return(
                    <CardMedia
                        className={classes.media}
                        image={Poultry}
                        title={recipe.name}
                    />
                )
            case 'pork':
                return(
                    <CardMedia
                        className={classes.media}
                        image={Pork}
                        title={recipe.name}
                    />
                )
            case 'cake':
                return(
                    <CardMedia
                        className={classes.media}
                        image={Cake}
                        title={recipe.name}
                    />
                )
            case 'pastry':
                return(
                    <CardMedia
                        className={classes.media}
                        image={Pastry}
                        title={recipe.name}
                    />
                )
            case 'cookie':
                return(
                    <CardMedia
                        className={classes.media}
                        image={Cookie}
                        title={recipe.name}
                    />
                )
            default: {
                return(
                    <CardMedia
                        className={classes.media}
                        image={Beef}
                        title={recipe.name}
                    />
                )
            }
        }
    }

    return(
        <Card className={classes.root} variant="outlined">
            <IconButton
                className={classes.deleteCard}
                onClick={handleDeleteClick}
            >
                <CloseOutlinedIcon  className={classes.deleteCard} />
            </IconButton>
            <CardHeader title={recipe.name} subheader={`Created on ${showDates(recipe.created_at, recipe.updated_at)}`}/>
            {showCardMedia(recipe.category)}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {recipe.description}
                </Typography>
            </CardContent>
            <div className={classes.expansionPanelRoot}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography >
                            See More
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanel onClick={handleExpandClick}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1b-content"
                            id="panel1b-header"
                        >
                            <Typography className={classes.expansionPanelHeading}>
                                Ingredients
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.ingCont} style={{ width: '100%'}}>
                            <IngredientContainer recipe={recipe}/>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <Typography>
                                    New Ingredient
                                </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <NewIngredientForm recipeId={recipe.id} recipeName={recipe.name} />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                        >
                            <Typography>
                                Instructions
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {recipe.instruction}
                            </Typography>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                            <UpdateRecipeForm recipe={recipe}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </ExpansionPanel>
            </div>
        </Card>
    )
}

export default RecipeCard;
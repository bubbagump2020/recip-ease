import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PrivateRoute } from './components/HomePage/PrivateRoute'
import Homepage from './components/HomePage/Homepage'
import UserHomepage from './components/User/UserHomepage'
import RecipeContainer from './components/Recipe/RecipeContainer'
import NewRecipeForm from './components/Recipe/NewRecipeForm';
import SignIn from './components/HomePage/SignIn';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Homepage} />
        <Route path="/sessions/new" component={SignIn} />
        <PrivateRoute exact path="/users/:username" component={UserHomepage} />
        <PrivateRoute exact path="/users/:username/recipes" component={RecipeContainer} />
        <PrivateRoute exact path="/users/:username/recipes/new" component={NewRecipeForm} />
      </Router>
      <ToastContainer className="toast-container" toastClassName="dark-toast" />
    </div>
  );
}

export default App;
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        sessionStorage.getItem('userToken')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/sessions/new', state: { from: props.location } }} />
    )} />
)
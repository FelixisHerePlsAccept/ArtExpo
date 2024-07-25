import { Button, Container, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import AuthContext from '../AuthGuard/AuthProvider'

export default function MainLayout() {

    const {currentUser, dispatch} = useContext(AuthContext)
    console.log('currentUser', currentUser)
    const navigate = useNavigate()

    const handleLogOut = () => {
        signOut(auth)
        .then(console.log('You logged out'))
        .catch(err=>Alert(err))
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('userData')
        navigate('/auth/login')
    }

    return (
        <Container maxWidth="lg">
            <Grid container>
                <Grid item xs={12} md={4}>
                    <Typography variant="h4">Welcome</Typography>
                    <NavLink to='/mainpage/home'>Home</NavLink>
                    <Button onClick={handleLogOut}>
                        Log Out
                    </Button>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    )
}

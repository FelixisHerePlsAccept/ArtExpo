import { Box, Button, Container, Grid, IconButton, Menu, MenuItem, Stack, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import AuthContext from '../AuthGuard/AuthProvider'
import CustomThemeContext from '../ThemeContext/ThemeProvider'
import { Bars3Icon } from '@heroicons/react/16/solid'
import MediaQuery from '../MediaContext/MediaProvider'

export default function MainLayout() {

    const {currentUser, dispatch} = useContext(AuthContext)
    const {currentTheme} = useContext(CustomThemeContext)
    const {isDesktop} = useContext(MediaQuery)

    const [dropDown, setDropDown] = useState(false)
    const [anchor, setAnchor] = useState(null)

    const theme = useTheme();

    useEffect(() => console.log(isDesktop ? 'Beeg' : 'Smol'), [isDesktop])

    const navigate = useNavigate()

    const handleLogOut = () => {
        signOut(auth)
        .then(console.log('You logged out'))
        .catch(err=>Alert(err))
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('userData')
        navigate('/auth/login')
    }

    const handleOpenSideNav = (event) => {
        setDropDown(true)
        setAnchor(event.currentTarget)
    }

    const handleClose = () => {
        setDropDown(false)
    }

    console.log(anchor)

    if (isDesktop){
        return (
            <Box sx={{bgcolor: currentTheme !== 'dark'? '#1f1f1f' : 'white', width:'100%', height:'100vh'}}>
                <Container maxWidth="xl">
                    <Grid container>
                        <Grid item xs={12} md={2}>
                            <Box sx={{height:'100vh', overflowY:'hidden', bgcolor: currentTheme !== 'dark'? 'blue' :'red', width:'100%'}}>
                                <Typography variant="h4">Welcome</Typography>
                                <NavLink to='/mainpage/home'>Home</NavLink>
                                <Button onClick={handleLogOut}>
                                    Log Out
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <Box sx={{height:'100vh', overflowY:'hidden', bgcolor: currentTheme !== 'dark'? 'red' : 'blue', width:'100%'}}>
                                <Outlet />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        )    
    }

    return (
        <>
        {dropDown ? (
            <Menu
            anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={handleClose}
            anchorOrigin={{
                vertical:'bottom',
                horizontal:'left'
            }}
            transformOrigin={{
                vertical:'top',
                horizontal:'left'
            }}
            >
                <MenuItem onClick={()=>navigate('/mainpage/home')}>Home</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
        ): null}
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{width:'100%', height:'5vh', bgcolor:'red'}}>
                    <Stack direction='row' sx={{display:'flex', justifyContent:'space-between', alignItems:'center', p:'0 .5rem 0 .5rem'}}>
                        <IconButton onClick={handleOpenSideNav}>
                            <Bars3Icon style={{width:'1.5rem', height:'1.5rem'}} />
                        </IconButton>
                        <Typography>Logo</Typography>
                        <Typography>Profile</Typography>
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{width:'100%', height:'95vh', overflowY:'auto', bgcolor:'green'}}>
                    <Box sx={{p:'2rem'}}>
                        <Outlet />
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </>
    )

}

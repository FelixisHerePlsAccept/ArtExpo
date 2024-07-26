import { Box, Button, Container, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import AuthContext from '../AuthGuard/AuthProvider'
import CustomThemeContext from '../ThemeContext/ThemeProvider'
import { Bars3Icon } from '@heroicons/react/16/solid'
import MediaQuery from '../MediaContext/MediaProvider'
import { UserNav } from '../NavComponent/UserNav'

export default function MainLayout() {

    const {currentUser, dispatch} = useContext(AuthContext)
    const {currentTheme} = useContext(CustomThemeContext)
    const {isDesktop} = useContext(MediaQuery)
    const navRef = useRef()

    const role = currentUser?.role
    console.log('role', role)

    const [dropDown, setDropDown] = useState(false)
    const [anchor, setAnchor] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => console.log(isDesktop ? 'Beeg' : 'Smol'), [isDesktop])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current?.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const navigate = useNavigate()

    const handleLogOut = () => {
        signOut(auth)
        .then(console.log('You logged out'))
        .catch(err=>Alert(err))
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('userData')
        navigate('/auth/login')
    }

    const handleOpenSideNav = () => {
        // setDropDown(true)
        // setAnchor(event.currentTarget)
        setOpen(true)
    }

    const handleClose = () => {
        setDropDown(false)
    }



    const focus = useLocation().pathname

    console.log(anchor)

    if (isDesktop){
        return (
            <Box sx={{bgcolor: currentTheme !== 'dark'? '#1f1f1f' : 'white', width:'100%', height:'100vh'}}>
                <Container maxWidth="xl">
                    <Grid container>
                        <Grid item xs={12} md={2}>
                            <Box sx={{height:'100vh', overflowY:'hidden', bgcolor: currentTheme !== 'dark'? 'blue' :'red', width:'100%'}}>
                                <Box sx={{position:'relative', top: 0, width:'100%',bgcolor:'black', height: '15%'}}>
                                    <Typography sx={{color:'white', textAlign:'center', p:'1rem'}}>Logo</Typography>
                                </Box>
                                <Box sx={{position:'sticky', top: 0, width:'100%', bgcolor: 'white', height:'85%'}}>
                                    <Stack direction='column' spacing={2}>
                                        <UserNav role={currentUser.role} focus={focus} isDesktop={true} />
                                        <Button onClick={handleLogOut}>
                                            Log Out
                                        </Button>
                                    </Stack>
                                </Box>
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
                <Box sx={{width:'100%', height:'95vh', overflowY:'auto', bgcolor:'green', position:'relative'}}>
                    <div ref={navRef}>
                        {open ? 
                            <Box sx={{width: '40%', height: '100%', bgcolor:'yellow', position:'absolute', top:0}}>
                                <Stack direction='column' spacing={2}>
                                    <UserNav role={currentUser.role} focus={focus} isDesktop={false} />
                                    <Button onClick={handleLogOut}>
                                        Log Out
                                    </Button>
                                </Stack>
                            </Box>
                            
                        : null}
                    </div>
                    <Box sx={{p:'2rem'}}>
                        <Outlet />
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </>
    )
}

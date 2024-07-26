import { Box, Container, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import Welcome from '../Welcome'
import './Layout.css'


export default function MainAuthLayout() {

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    if(isDesktop){
        return (
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Box sx={{position:'sticky', top:0, height:'100vh', borderRight:'1px solid gray'}}>
                        <Welcome />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{height:'inherit', display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', width:'100%'}}>
                        <Outlet />
                    </Box>
                </Grid>
            </Grid>
        )
    }
    
    return (
        <>  
            <Box 
                sx={{
                    position: 'absolute', 
                    top:0, 
                    left: 0,  
                    height:'100vh', 
                    width:'100%'
                }}
            >
                <Outlet />
            </Box>
            <Box
                className='animated_background'
                sx={{
                    top:0,
                    left:0,
                    width:'100%',
                    height:'100vh',
                    zIndex:100,
                }}
            />
            
        </>
    )
}

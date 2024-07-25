import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import Welcome from '../Welcome'
import { Outlet } from 'react-router-dom'

export default function MainAuthLayout() {
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

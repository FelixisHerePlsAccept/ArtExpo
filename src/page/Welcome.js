import { Box, Typography } from '@mui/material'
import React from 'react'
import loginpic  from '../image-folder/loginpic.jpg'

export default function Welcome() {
    return (
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', backgroundImage: `url(${loginpic})` , backgroundSize: 'contain'}}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', width:'25rem', height:'25rem', bgcolor:'grey', borderRadius:'2rem'}}>
                <Typography variant='h3' textAlign={'center'}>
                    ArtExpo Logo Here
                </Typography>
            </Box>
        </Box>
    )
}

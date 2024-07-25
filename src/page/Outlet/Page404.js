import React, { useContext } from 'react'
import { Box, Button, Container, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PATH_AUTH, PATH_MAIN } from '../../route/paths';
import AuthContext from '../AuthGuard/AuthProvider';

export default function Page404() {

    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate();
    
    return (
        <Container maxWidth='lg'>
            <Box sx={{  display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100vh', bgcolor:'red'}}>
                <Box sx={{width:'50%', height:'50%', bgcolor:'blue'}}>
                    <Stack direction='column' sx={{ display:'flex', alignItems:'center', justifyContent:'start', width:'100%', height:'100%'}}>
                        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', width:'80%', height:'70%', bgcolor:'yellow' }}>
                            Image will remove box for NotFound illustration
                        </Box>
                        <Button variant='contained' onClick={() => navigate(currentUser ? PATH_MAIN.HOME : PATH_AUTH.LOGIN)}>
                            {currentUser ? 'Return to Home Page' : 'Return to Login'}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    )
}

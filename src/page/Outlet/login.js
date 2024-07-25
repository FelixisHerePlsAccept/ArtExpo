import { Button, IconButton, Container, Stack, Typography, InputAdornment } from '@mui/material'
import * as Yup from 'yup'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import FormProvider from '../../component/hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RHFTextField } from '../../component/hook-form'
import { LoadingButton } from '@mui/lab'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../AuthGuard/AuthProvider'
import { EyeIcon } from '@heroicons/react/20/solid'
import MediaQueryContext from '../MediaContext/MediaProvider'

export default function Login() {

    const navigate = useNavigate()

    const { currentUser, dispatch } = useContext(AuthContext)
    const {isDesktop} = useContext(MediaQueryContext)

    console.log('AuthContext', currentUser)

    const [showPassword, setShowPassword] = useState(false)

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    const defaultValue = useMemo(
        () => ({
            email: '',
            password: '',
        })
        ,[]
    )

    const methods = useForm({
        defaultValue,
        resolver: yupResolver(SignupSchema)
    })

    useEffect(() => {
        if (currentUser) {
            navigate('/mainpage/home')
        }
    }, [ currentUser ])

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    const onSubmit = async (data) => {
        // if array > 0, return;
        if (currentUser) {
            alert(`You are already logged in as ${currentUser.name}`)
            return;
        }
        try {
            const { email, password } = data
            await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log('uid', user.uid)
                handleShowInfo(user.uid)
            })
            .catch((err) => {
                console.error('err-signin', err)
                alert('User does not exist')
            })
        } catch (err) {
            console.error('err-try', err)
        }
    }

    const handleShowInfo = async (id) => {
        const userData = await getDoc(doc(db, "users", id))
        dispatch({type: 'LOGIN', payload:{ userID: id, ...userData.data()}})
        navigate('/mainpage/home')
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('Sign Out')
        })
        .catch(err => console.error(err))
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('userData');
        setDataUser([])
    }

    const handleGoToSignup = () => {
        navigate('/auth/signup')
    }

    return (
        <Container maxWidth={false}>
            <Stack direction='column' spacing={3} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography variant="h4">Welcome Back!</Typography>
                <Typography variant="h5">Log In</Typography>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction='column' spacing={2} sx={{ width:'30vw'}}>
                        <RHFTextField name="email" label="Email"  />
                        <RHFTextField 
                            name="password" 
                            label="Password" 
                            autoComplete='off' 
                            type= {showPassword ? 'text' :'password' }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={()=>setShowPassword(prev=>!prev)}>
                                            <EyeIcon style={{width:'1.5rem', height:'1.5rem'}} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            Log In and Enter
                        </LoadingButton>
                    </Stack>
                </FormProvider>
                <Stack direction='row' spacing={2}>
                    <Typography variant='caption'>
                        Don't have an account?
                    </Typography>
                    <a onClick={handleGoToSignup} style={{cursor:'pointer', textDecoration:'underline', color:'blue'}}>Sign Up</a>
                </Stack>
                <Button onClick={handleSignOut}>SignOut</Button>
            </Stack>
        </Container>
    )
}
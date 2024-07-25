import * as Yup from 'yup'
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { LoadingButton } from '@mui/lab'
import {  collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { RHFTextField } from '../component/hook-form'
import FormProvider from '../component/hook-form/FormProvider'
import { auth, db } from '../firebase';


export default function Signup() {

    const navigate = useNavigate()

    const schema = Yup.object().shape({
        password: Yup.string().required('Username is required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    })

    const defaultValue = useMemo(
        () => ({
            name:'',
            email: '',
            password: '',
        })
        ,[]
    )

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValue,
    })

    const {
        reset,
        handleSubmit, 
        formState: { isSubmitting },
    } = methods

    const onSubmit = async (data) => {
        const { name, email, password } = data;

        try {
            // Create user with email and password
            const getId = await createUserWithEmailAndPassword(auth, email, password)
            .catch((err) => console.error(err))

            console.log(getId)

            // Add user details to Firestore
            await setDoc(doc(db, "users", getId.user.uid), {
                name: name,
                email: email,
                role: 'user',
            });

            reset(defaultValue)

            handleRetrieve(getId.user.uid)
            // console.log("Document written with ID: ", docRef.id);
            // console.log(getId.user.uid)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleRetrieve = async (id) => {
        try {
            const snapshot = await getDocs(collection(db, "users"))
            const snapshotRecent = await getDoc(doc(db, "users", id))
            const userArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            console.log(userArray)
            console.log("RECENT USER", snapshotRecent.data())
        }
        catch(err){
            console.error('Issue with retrieval:', err)
        }
    }

    const handleGoToLogin = () => {
        navigate('/auth/login')
    }

    return (
        <Stack direction='column' spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant='h4'>
                Come Join Our Community!
            </Typography>
            <Typography variant='h5'>
                Sign Up
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack direction='column' spacing={2} sx={{ width:'30vw' }}>
                    <RHFTextField name='name' label='Display Name' />
                    <RHFTextField name='email' label='Email' />
                    <RHFTextField name='password' label='Password' />
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>Create Account</LoadingButton>
                </Stack>
            </FormProvider>
            <Stack direction='row' spacing={2} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography variant='subtitle2'>Already have an account?</Typography>
                <a onClick={handleGoToLogin} style={{textDecoration:'underline', cursor:'pointer', color:'blue'}} >Log In?</a>
            </Stack>
        </Stack>

    )
}

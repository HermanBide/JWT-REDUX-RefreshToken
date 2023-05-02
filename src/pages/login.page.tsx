import { SubmitHandler, useForm,FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod"
import {styled} from "@mui/material/styles"
import {zodResolver} from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";
import { Container, Box, Typography } from "@mui/material";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { useLoginUserMutation } from "../redux/api/authApi";
import FormInput from "../components/FormInput";
import react, { useState } from "react";
import axios from 'axios'
// import { registerSchema } from "./register.page"
// import { object, string } from 'yup';

const LoadingButton= styled(_LoadingButton)`
background-color:black
`

const loginSchema = object({
  email: string().min(1, "Email is required").email('Please enter a valid email address').nonempty(),
  password: string().min(1,'Password is required').min(8, 'Password must be at least 8 characters long').nonempty(),
});

export type LoginInput = TypeOf<typeof loginSchema>

const LoginPage = () => {
    //Creating methods that uses useForm properties and context hosted by formProvider.
    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSchema)
    });
    // api call you will have the useRegisterMutation 
     const [loginUser, {isLoading,isSuccess,error,isError,data}]=useLoginUserMutation()
     const navigate = useNavigate()
     const {reset, handleSubmit, formState:{isSubmitSuccessful},}= methods;


     
    //  useEffect(() => {
    //     // fetch registered users data from your database
    //     // and store it in the `registeredUsers` state
    //     const fetchRegisteredUsers = async () => {
    //       try {
    //         const response = await axios.get("api/register");
    //         const data = await response.json();
    //         setRegisteredUsers(data);
    //       } catch (error) {
    //         console.error("Error fetching registered users data: ", error);
    //       }
    //     };
    //     fetchRegisteredUsers();
    //   }, []);
    

     useEffect(()=>{
        console.log("Inside Use Effect")
        if(isSuccess) {
            
            toast.success(data?.message)
            navigate('/dashboard')
        }
        // is ERROR gets you a list of items as we are in type Script so we are following any so that we could 
        // handle any type here 
        if(isError){
            if(Array.isArray((error as any).data.error)){
                (error as any).data.error.array.forEach((element:any) => {
                    toast.error(element.message,{position:'top-right'})
                });
            }
            else{
                toast.error((error as any).data.message,{position:'top-right'})
            }
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[isLoading])


     console.log("After Use Effect",isLoading)
     useEffect(()=>{
        if(isSubmitSuccessful){
            reset();
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])

     const onSubmitHandler: SubmitHandler<LoginInput>=(values)=>{
        loginUser(values)
     }
        

     return (
        <Container
        maxWidth={false} 
        sx={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: '#e76f51',
        }}>
            <Box sx={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',            
            flexDirection:'column'}
        }>
                <Typography> Welcome to my login</Typography>
               
{/*FormProvider allows the passing of the useForm() hook down to any nested components that need access to the form state. 
This component will host context object and allow consuming component to subscribe to context and use useForm props and methods.*/}
               <FormProvider {...methods}>

               <form onSubmit={handleSubmit(onSubmitHandler)}>
{/*                 
                       <Box
                        component='form'
                       noValidate
                       width=''
                       onSubmit={()=>{alert("Working")}}
                       > */}
                                <FormInput name='email' type="email" label='enter the email' style={{color: "white"}}></FormInput>
                                <FormInput name='password' type="password" label='enter the password'></FormInput>

                                <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isLoading}
                                disableElevation
                                fullWidth
                                // onClick={() => {}}
                                >
                                    Sign Up
                                </LoadingButton>
                       {/* </Box> */}
                       <button>click</button>

               </form>
                </FormProvider>
            </Box>
            
        </Container>
     )
}

export default LoginPage
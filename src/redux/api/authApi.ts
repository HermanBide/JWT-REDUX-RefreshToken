// create  a login and register page 
//then we will get that reference here 

import {RegisterInput} from "../../pages/register.page"
import {LoginInput} from "../../pages/login.page"
import customFetchBase from "./customFetchBase"
// import {LoginInput} from "../../pages/login.page"

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { GenericResponse } from "./types";
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_ENDPOINT as string;

// here we are calling the apis from the backedn using redux toolkit 

export const authApi = createApi({
    reducerPath: "authApi",
    //Query callback to fetch or constructs url parameters.
    baseQuery: customFetchBase,
    endpoints: (builder)=>({
        //Mutations are used to send data updates to the server and apply the changes to the local cache.
        // Mutations can also invalidate cached data and force re-fetches. {read more on redux-toolkit mutations.}
        registerUser: builder.mutation<GenericResponse,RegisterInput>({
            query(data){

                console.log("Performed")
                return{
                    url:"auth/register",
                    method:"POST",
                    body:data
                }
            }
        }),

        loginUser: builder.mutation<GenericResponse,LoginInput>({
            query(credentials){

                console.log("Performed")
                return{
                    url:"auth/login",
                    method:"POST",
                    body:credentials,
                }
            }
        }),
        verifyEmail: builder.mutation<GenericResponse, string>({
            query(){
                return{
                    url:'auth/verifyemail',
                    credentials: 'include'
                }
            }
        })
    })


})


export const {
    useRegisterUserMutation,
    useVerifyEmailMutation,
    useLoginUserMutation,
}= authApi
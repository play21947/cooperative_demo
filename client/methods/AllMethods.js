import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Swal from "sweetalert2"
import { baseURL } from "../baseURL"

export const GetInfoUser = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then((token) => {
            axios.get(`${baseURL}/api/user`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                resolve(res)
            })
        })
    })
}


export const GetShareData = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("token").then((token) => {
            axios.get(`${baseURL}/api/share`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                resolve(res)
            })
        })
    })
}


export const GetListUsers = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then((token) => {
            axios.get(`${baseURL}/api/list_users`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                resolve(res)
            })
        })
    })
}


export const GetListShare=()=>{
    return new Promise((resolve, reject)=>{
        AsyncStorage.getItem("token").then((token)=>{
            axios.get(`${baseURL}/api/list_share`,{
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    })
}


// Admin

export const DepositShare=(deposit_id, amount)=>{
    return new Promise((resolve, reject)=>{
        AsyncStorage.getItem("token").then((token)=>{
            axios.post(`${baseURL}/api/deposit`,{
                deposit_id: deposit_id,
                amount: amount
            },{
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    })
}
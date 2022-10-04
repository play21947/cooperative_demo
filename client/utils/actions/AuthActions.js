import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Alert } from 'react-native'
import { baseURL } from '../../baseURL'

export const LoadAction=()=>{
    return ((dispatch)=>{
        AsyncStorage.getItem("token", (err, token)=>{
            if(err) throw err

            dispatch({
                type: "LOAD",
                payload: token
            })
        })
    })
}


export const LoginAction=(username, password)=>{
    return ((dispatch)=>{
        axios.post(`${baseURL}/api/login`, {
            username,
            password
        }).then((res)=>{
            if(res.data.invalid){
                Alert.alert("ไอดีหรือรหัสผ่านไม่ถูกต้อง")
            }else{
                AsyncStorage.setItem("token", res.data.token)
                dispatch({
                    type: "LOGIN",
                    payload: res.data.token
                })
            }
        })
    })
}


export const LogOutAction=()=>{
    return ((dispatch)=>{
        AsyncStorage.removeItem("token")
        dispatch({
            type: "LOGOUT"
        })
    })
}


export const Pinned=()=>{
    return((dispatch)=>{
        dispatch({
            type: "PINNED",
        })
    })
}
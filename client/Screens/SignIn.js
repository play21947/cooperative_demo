import React, { useState } from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import { useDispatch } from 'react-redux'
import { LoginAction } from '../utils/actions/AuthActions'


const SignIn=()=>{

    let dispatch = useDispatch()


    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')


    const Submit=(username, password)=>{
        if(!username || !password){
            Alert.alert("โปรดใส่ข้อมูลให้ครบถ้วน")
        }else{
            dispatch(LoginAction(username, password))
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header_text}>สหกรณ์ออมทรัพย์</Text>
            <Text style={styles.sec_header_text}>ยินดีต้อนรับ</Text>
            <TextInput onChangeText={(text)=>{
                setUsername(text)
            }} style={styles.input}></TextInput>
            <TextInput onChangeText={(text)=>{
                setPassword(text)
            }} style={styles.input}></TextInput>
            <TouchableOpacity onPress={()=>{
                Submit(username, password)
            }} style={styles.btn}><Text style={styles.btn_text}>เข้าสู่ระบบ</Text></TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        padding: 20,
        display:'flex',
        justifyContent: 'center',
        flex: 1
    },
    header_text:{
        fontFamily: 'Kanit-Bold',
        fontSize: 24,
        color: 'black'
    },
    sec_header_text:{
        fontFamily: 'Kanit-Regular',
        fontSize: 16,
        color: 'gray'
    },
    input:{
        borderWidth: 1.2,
        borderColor: 'black',
        marginTop: 10,
        borderRadius: 4
    },
    btn:{
        width: '100%',
        height: 50,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 4
    },
    btn_text:{
        fontFamily: 'Kanit-Regular',
        fontSize: 16,
        color: 'white'
    }
})

export default SignIn
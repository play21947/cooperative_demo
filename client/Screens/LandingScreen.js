import React, { useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity, StyleSheet, Image } from 'react-native'
import axios from 'axios'
import { baseURL } from '../baseURL'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogOutAction } from '../utils/actions/AuthActions'
import { useDispatch } from 'react-redux'
import { GetInfoUser } from '../methods/AllMethods'

const LandingScreen = ({ navigation }) => {


    let [detail_user, setDetail_user] = useState([])

    let dispatch = useDispatch()

    const AllApi = async () => {
        GetInfoUser().then((res) => {
            if (res.data.invalid_token) {
                dispatch(LogOutAction())
            } else {
                setDetail_user(res.data.payload)
            }
        })
    }

    useEffect(() => {
        AllApi()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.circle_img}>
                <Image style={styles.img} source={require('../img/user.png')}></Image>
            </View>
            <Text style={styles.hello_text}>สวัสดี</Text>
            {detail_user && detail_user.length > 0 ? <Text style={styles.name_text}>คุณ{detail_user[0].first_name}  {detail_user[0].last_name}</Text> : null}
            <TouchableOpacity onPress={() => {
                navigation.navigate("PIN", { user_id: detail_user[0].id })
            }} style={styles.join_btn}><Text style={styles.text_btn}>เข้าใช้งาน</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
                dispatch(LogOutAction())
            }}><Text style={styles.change_acc}>เปลี่ยนบัญชี</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    img: {
        width: 90,
        height: 90,
    },
    circle_img: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 90,
        padding: 3
    },
    hello_text: {
        fontFamily: 'Kanit-Medium',
        fontSize: 18,
        color: '#94a3b8'
    },
    name_text: {
        fontFamily: 'Kanit-Regular',
        fontSize: 16,
        color: '#94a3b8'
    },
    join_btn: {
        backgroundColor: '#3b82f6',
        padding: 5,
        borderRadius: 4,
        width: 120,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    text_btn: {
        fontFamily: 'Kanit-Medium',
        fontSize: 20,
        color: 'white',
    },
    change_acc: {
        fontFamily: 'Kanit-Regular',
        fontSize: 14,
        color: '#ef4444'
    }
})

export default LandingScreen
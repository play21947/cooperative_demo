import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, RefreshControl, Alert, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import { baseURL } from '../baseURL'
import { useDispatch } from 'react-redux'
import { LogOutAction } from '../utils/actions/AuthActions'
import { GetInfoUser, GetShareData } from '../methods/AllMethods'

const Home = ({ navigation }) => {

    let dispatch = useDispatch()

    let [detail_user, setDetail_User] = useState(null)
    let [detail_share, setDetail_Share] = useState(null)


    const AllApi = async () => {
        GetInfoUser().then((res) => {
            if (res.data.invalid_token) {
                dispatch(LogOutAction())
            } else {
                setDetail_User(res.data.payload)
            }
        })
    }

    useEffect(() => {
        AllApi()
    }, [])

    return (
        <View>
            <View style={styles.header}>

                <TouchableOpacity style={{position: 'absolute', right: 20}} onPress={() => {
                    dispatch(LogOutAction())
                }}><Image style={{ width: 20, height: 20, tintColor: 'white' }} source={require('../img/export.png')}></Image></TouchableOpacity>

                <View>
                    <Image style={{ width: 60, height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 180 }} source={require('../img/user.png')}></Image>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.sawaddee_text}>สวัสดี</Text>
                    </View>
                    {detail_user && detail_user.length > 0 ? <Text style={styles.name_text}>{detail_user[0].first_name} {detail_user[0].last_name}</Text> : <Text>Test</Text>}
                </View>
            </View>


            <View style={styles.tag}>
                <Text style={styles.tag_text}>ทั่วไป</Text>
            </View>

            <View style={styles.general}>

                {detail_user ? detail_user[0].role == 0 ? <TouchableOpacity onPress={() => {
                    navigation.navigate("SHARE")
                }} style={styles.bg_logo}>
                    <Image style={styles.logo} source={require('../img/growth.png')}></Image>
                    <Text style={styles.logo_text}>หุ้น</Text>
                </TouchableOpacity> : null : null}


                {detail_user ? detail_user[0].role == 0 ? <TouchableOpacity onPress={() => {
                    navigation.navigate("GUARANTEE")
                }} style={styles.bg_logo}>
                    <Image style={styles.logo} source={require('../img/network.png')}></Image>
                    <Text style={styles.logo_text}>ค้ำประกัน</Text>
                </TouchableOpacity> : null : null}


                {detail_user ? detail_user[0].role == 0 ? <TouchableOpacity onPress={() => {
                    navigation.navigate("PROFIT")
                }} style={styles.bg_logo}>
                    <Image style={styles.logo} source={require('../img/stadistics.png')}></Image>
                    <Text style={styles.logo_text}>ปันผล - เฉลี่ย</Text>
                </TouchableOpacity> : null : null}


                {detail_user ? detail_user[0].role == 1 ? <TouchableOpacity onPress={() => {
                    navigation.navigate("ADMIN")
                }} style={styles.bg_logo}>
                    <Image style={styles.logo} source={require('../img/schedule.png')}></Image>
                    <Text style={styles.logo_text}>ตัวจัดการ</Text>
                </TouchableOpacity> : null : null}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        backgroundColor: '#3b82f6',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sawaddee_text: {
        fontFamily: 'Kanit-Medium',
        fontSize: 24,
        color: 'white'
    },
    name_text: {
        fontFamily: 'Kanit-Regular',
        fontSize: 14,
        color: 'white'
    },
    tag_text: {
        fontFamily: 'Kanit-Bold',
        fontSize: 18,
        color: 'white'
    },
    tag: {
        width: 60,
        height: 30,
        backgroundColor: '#60a5fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginTop: 20
    },
    logo: {
        width: 50,
        height: 50,
    },
    general: {
        padding: 30,
        paddingTop: 0,
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    bg_logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo_text: {
        fontFamily: 'Kanit-Regular',
        fontSize: 14,
        color: 'black',
        marginTop: 5
    }
})

export default Home
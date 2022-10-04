import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import axios from 'axios'
import { baseURL } from '../baseURL'
import { useDispatch } from 'react-redux'
import { Pinned } from '../utils/actions/AuthActions'

const Pin = ({navigation, route}) => {

    let dispatch = useDispatch()

    let user_id = route.params

    const CheckPin=(pin)=>{
        axios.post(`${baseURL}/api/pin_check`,{
            pin: pin,
            user_id: user_id
        }).then((res)=>{
            if(res.data.success){
                dispatch(Pinned())
            }else{
                Alert.alert("PIN ไม่ถูกต้อง", "กรุณาลองใหม่")
                setNumber('')
            }
        })
    }

    let [number, setNumber] = useState('')

    let length_number = number.length

    if(length_number == 6){
        console.log("Check")
        CheckPin(number)
    }

    return (
        <View style={styles.container}>

            <Text style={{fontFamily: "Kanit-Regular", color: '#94a3b8', marginBottom: 20}}>ใส่รหัส PIN</Text>

            <View style={styles.handleCircle}>
                <View style={length_number >= 1 ? styles.fil_circle : styles.circle}>

                </View>
                <View style={length_number >= 2 ? styles.fil_circle : styles.circle}>

                </View>
                <View style={length_number >= 3 ? styles.fil_circle : styles.circle}>

                </View>
                <View style={length_number >= 4 ? styles.fil_circle : styles.circle}>

                </View>
                <View style={length_number >= 5 ? styles.fil_circle : styles.circle}>

                </View>
                <View style={length_number >= 6 ? styles.fil_circle : styles.circle}>

                </View>
            </View>

            <View style={styles.handleNumber}>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '1')
                    }
                }} style={styles.number}><Text style={styles.number_text}>1</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '2')
                    }
                }} style={styles.number}><Text style={styles.number_text}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '3')
                    }
                }} style={styles.number}><Text style={styles.number_text}>3</Text></TouchableOpacity>
            </View>
            <View style={styles.handleNumber}>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '4')
                    }
                }} style={styles.number}><Text style={styles.number_text}>4</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '5')
                    }
                }} style={styles.number}><Text style={styles.number_text}>5</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '6')
                    }
                }} style={styles.number}><Text style={styles.number_text}>6</Text></TouchableOpacity>
            </View>
            <View style={styles.handleNumber}>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '7')
                    }
                }} style={styles.number}><Text style={styles.number_text}>7</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '8')
                    }
                }} style={styles.number}><Text style={styles.number_text}>8</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '9')
                    }
                }} style={styles.number}><Text style={styles.number_text}>9</Text></TouchableOpacity>
            </View>
            <View style={styles.handleNumber}>
                <TouchableOpacity onPress={() => {
                    if (length_number < 6) {
                        setNumber(number + '0')
                    }
                }} style={styles.number}><Text style={styles.number_text}>0</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>{
                if(number > 0){
                    let cut_last = number.slice(0, number.length - 1)
                    setNumber(cut_last)
                }
            }} style={{position: 'absolute', bottom: 60, right: 30}}>
                <Image style={{width: 80, height: 80, tintColor: '#d1d5db'}} source={require('../img/delete.png')}></Image>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 180,
        marginLeft: 20,
        backgroundColor: '#bfdbfe'
    },
    fil_circle: {
        backgroundColor: 'black',
        width: 18,
        height: 18,
        borderRadius: 180,
        marginLeft: 20
    },
    handleCircle: {
        display: 'flex',
        flexDirection: 'row',
    },
    handleNumber: {
        marginTop: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    number: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 180,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    number_text: {
        fontFamily: 'Kanit-Medium',
        fontSize: 30,
        color: 'black'
    }
})

export default Pin
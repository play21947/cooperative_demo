import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { DepositShare } from '../methods/AllMethods'
import { LogOutAction } from '../utils/actions/AuthActions'

const Admin = () => {

    let dispatch = useDispatch()

    let [deposit_id, setDepositId] = useState('')
    let [amount, setAmount] = useState(0)

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: 'Kanit-Regular', color: 'black', fontSize: 18 }}>นำเงินเข้าสู่ระบบ</Text>
            <TextInput onChangeText={(deposit_id_client) => {
                setDepositId(deposit_id_client)
            }} style={{ fontFamily: 'Kanit-Regular' }} placeholder='ไอดีผู้ฝาก' keyboardType='number-pad'></TextInput>
            <TextInput onChangeText={(amount_client) => {
                setAmount(amount_client)
            }} style={{ fontFamily: 'Kanit-Regular' }} placeholder='จำนวนเงิน' keyboardType='number-pad'></TextInput>
            <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#3b82f6', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }} onPress={() => {
                if (!deposit_id || !amount) {
                    Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน")
                } else {
                    Alert.alert('กดยืนยันเมื่อมั่นใจ', `ฝากเงินให้กับไอดี ${deposit_id} จำนวนเงิน ${amount} บาท`, [{
                        text: "ยืนยัน",onPress: () => {
                            DepositShare(deposit_id, amount).then((res)=>{
                                if(res.data.invalid_token){
                                    dispatch(LogOutAction())
                                }else if(res.data.invalid_id){
                                    Alert.alert("ไม่มีผู้ใช้ไอดีนี้อยู่")
                                }else if(res.data.deposit_success){
                                    Alert.alert("ฝากเงินสำเร็จ")
                                }
                            })
                        }
                    }, {text: 'ยกเลิก'}])
                }
            }}><Text style={{ fontFamily: 'Kanit-Regular', fontSize: 20, color: 'white' }}>ฝากเงิน</Text></TouchableOpacity>
        </View>
    )
}

export default Admin
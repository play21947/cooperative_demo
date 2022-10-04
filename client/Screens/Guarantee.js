import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, RefreshControl, TextInput, Image, TouchableOpacity } from 'react-native'
import { GetListUsers } from '../methods/AllMethods'
import { useDispatch } from 'react-redux'
import { LogOutAction } from '../utils/actions/AuthActions'


const Guarantee = () => {


    let [refresh, setRefresh] = useState(false)
    let [list_users, setListUsers] = useState([])
    let [search, setSearch] = useState('')

    let dispatch = useDispatch()

    let SearchItem = list_users.filter((item) => {
        return item.first_name.includes(search) || item.username.includes(search) ? item : null
    })


    const OnPullDown = () => {
        setRefresh(true)

        setTimeout(() => {
            setRefresh(false)
        }, 1200)
    }


    const RunApi = async () => {
        GetListUsers().then((res) => {
            if (res.data.invalid_token) {
                dispatch(LogOutAction())
            } else {
                setListUsers(res.data)
            }
        })
    }

    useEffect(() => {
        RunApi()
    }, [refresh])


    return (
        <ScrollView style={{padding: 10}} refreshControl={<RefreshControl refreshing={refresh} onRefresh={OnPullDown}></RefreshControl>}>
            
            <Text style={{marginBottom: 10, fontFamily: "Kanit-Regular", color: 'black'}}>ใครค้ำประกันให้คุณ</Text>

            <TextInput style={{width: '100%', height: 55, backgroundColor: 'white', borderRadius: 4, fontFamily: "Kanit-Regular", elevation: 3}} placeholderTextColor="gray" onChangeText={(text) => {
                setSearch(text)
            }} placeholder='หาคนค้ำประกัน...'></TextInput>

            {SearchItem && SearchItem.length > 0 ? SearchItem.map((item) => {
                return (
                    <View key={item.id} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: 20, alignItems: 'center' }}>
                        <View>
                            <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>{item.first_name}</Text>
                            <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>ชื่อผู้ใช้ : {item.username}</Text>
                        </View>
                        <TouchableOpacity>
                            <Image style={{ width: 25, height: 25, color: 'black' }} source={require('../img/plus.png')} />
                        </TouchableOpacity>
                    </View>
                )
            }) : null}
        </ScrollView>
    )
}

export default Guarantee
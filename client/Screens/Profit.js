import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { GetListShare } from '../methods/AllMethods'


const Profit = () => {

    let [list_share, setListShare] = useState([])


    const RunApi = () => {
        GetListShare().then((res) => {
            // console.log(res.data)
            setListShare(res.data)
        })
    }

    let init_months = 12

    let total_profit = list_share.reduce((pre, next) => {
        pre = pre + (((next.amount * 7) / 100) * init_months) / 12
        // console.log(init_months)
        init_months = init_months - 1
        return pre
    }, 0)

    useEffect(() => {
        RunApi()
    }, [])

    return (
        <View style={{padding: 10}}>
            <Text style={{ fontFamily: 'Kanit-Regular', color: 'black' }}>Profit</Text>
            <Text style={{ fontFamily: 'Kanit-Regular', color: 'black' }}>เงินปันผลที่จะได้รับ 7%</Text>
            <View style={{display : 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                <View>
                    <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>เงินปันผลที่จะได้รับ</Text>
                </View>
                <View>
                    <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>{list_share && list_share.length > 0 ? list_share.length : null} เดิอน</Text>
                    <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>{total_profit ? total_profit : null} บาท</Text>
                </View>
            </View>
        </View>
    )
}

export default Profit
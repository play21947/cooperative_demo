import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { GetListShare, GetShareData } from '../methods/AllMethods'
import { LogOutAction } from '../utils/actions/AuthActions'

const Share = () => {

    let dispatch = useDispatch()

    let [detail_share, setDetail_Share] = useState(null)
    let [refresh, setRefresh] = useState(false)
    let [list_share, setListShare] = useState([])
    
    let months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']


    const onPullDown=()=>{
        setRefresh(true)

        setTimeout(()=>{
            setRefresh(false)
        }, 1200)
    }

    const AllApi = async () => {
        GetShareData().then((res)=>{
            if(res.data.invalid_token){
                dispatch(LogOutAction())
            }else{
                setDetail_Share(res.data)
                GetListShare().then((res2)=>{
                    if(res2.data.invalid_token){
                        dispatch(LogOutAction())
                    }else{
                        setListShare(res2.data)
                    }
                })
            }
        })
    }

    let total_share = list_share.reduce((pre, next)=>{
        return pre = pre + next.amount
    }, 0)

    useEffect(() => {
        AllApi()
    }, [refresh])

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onPullDown}></RefreshControl>} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header_text}>หุ้น</Text>
            </View>

            <View style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 10 }}>
                <View style={styles.box_show}>
                    <Text style={styles.box_show_text}>หุ้นสะสม (บาท)</Text>
                    {/* <Text style={styles.money}>{detail_share ? detail_share[0].combine_share : null}</Text> กองทุนรวม */}
                    <Text style={styles.money}>{total_share ? total_share : 0}</Text>
                    <Text style={styles.money}></Text>
                    <View style={styles.split}>
                        <Text style={styles.box_show_text}>ยอดยกมาต้นปี</Text>
                        <Text style={styles.box_show_text}>{total_share ? total_share : 0} บาท</Text>
                    </View>
                    <View style={styles.split}>
                        <Text style={styles.box_show_text}>หุ้นรายเดือน</Text>
                        <Text style={styles.box_show_text}>000 บาท</Text>
                    </View>
                </View>
            </View>


            <View style={{padding: 20}}>
                {list_share && list_share.length > 0 ? list_share.map((item)=>{
                    return(
                        <View key={item.id} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'white', padding: 10, marginBottom: 20, borderRadius: 8, elevation: 5}}>
                            <View><Text style={{fontFamily: 'Kanit-Medium', color: 'black', fontSize: 16}}>ส่งหุ้นประจำเดือน</Text></View>
                            <View style={{}}>
                                <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>{item.date.split('/')[0]} {months[item.date.split('/')[1]-1]} {item.date.split('/')[2]}</Text>
                                <Text style={{fontFamily: 'Kanit-Medium', color: 'green', fontSize: 17, alignSelf: 'flex-end'}}>{item.amount} บาท</Text>
                                <Text style={{fontFamily: 'Kanit-Regular', color: 'black', alignSelf: 'flex-end'}}>งวด : {item.times}</Text>
                                <Text style={{fontFamily: 'Kanit-Regular', color: 'black', alignSelf: 'flex-end'}}>หุ้นสะสม : {item.frequent_money}</Text>

                            </View>
                        </View>
                    )
                }) : null}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f4f6',
    },
    header: {
        width: '100%',
        height: 90,
        backgroundColor: '#3b82f6',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_text: {
        fontFamily: 'Kanit-Regular',
        fontSize: 20,
        color: 'white'
    },
    box_show: {
        width: '100%',
        height: 130,
        // borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 4,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box_show_text: {
        fontFamily: 'Kanit-Regular',
        fontSize: 16,
        color: 'black'
    },
    money: {
        fontFamily: 'Kanit-Regular',
        fontSize: 20,
        color: '#34d399'
    },
    split:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
})

export default Share
import React, { useEffect } from 'react'
import {View, Text} from 'react-native'
import { useDispatch } from 'react-redux'
import { LoadAction } from '../utils/actions/AuthActions'

const LoadingScreen=()=>{


    let dispatch = useDispatch()

    useEffect(()=>{
        setTimeout(()=>{
            dispatch(LoadAction())
        }, 1200)
    }, [])

    return(
        <View>
            <Text>Loading Screen</Text>
        </View>
    )
}

export default LoadingScreen
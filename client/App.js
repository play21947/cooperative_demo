import React from 'react'
import {View, Text} from 'react-native'
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { useSelector } from 'react-redux'

import SignIn from './Screens/SignIn'
import AllReducers from './utils/AllReducers'
import LoadingScreen from './Screens/LoadingScreen'
import Home from './Screens/Home'
import Pin from './Screens/Pin'
import LandingScreen from './Screens/LandingScreen'
import Share from './Screens/Share'
import Guarantee from './Screens/Guarantee'
import Admin from './Screens/Admin'
import Profit from './Screens/Profit'

const Stack = createNativeStackNavigator()

let store = createStore(AllReducers, applyMiddleware(thunk))

const App=()=>{

  let auth = useSelector((state)=>{
    return state.auth
  })

  console.log(auth)

  return(
    <NavigationContainer>
      <Stack.Navigator>
        {!auth.loaded ? <Stack.Screen name='LOADING_SCREEN' component={LoadingScreen}></Stack.Screen> : !auth.token ? <Stack.Screen name='SIGN_IN' component={SignIn} options={{headerShown: false}}></Stack.Screen> : auth.pinned != true && auth.token ? <Stack.Screen name='LANDING_SCREEN' component={LandingScreen} options={{headerShown: false}}></Stack.Screen> : null}
        {!auth.pinned ? <Stack.Screen name='PIN' component={Pin} options={{headerShown: false}}></Stack.Screen> : auth.token ? <Stack.Screen name='HOME' component={Home} options={{headerShown: false}}></Stack.Screen> : <Stack.Screen name='SIGN_IN' component={SignIn} options={{headerShown: false}}></Stack.Screen>}
        <Stack.Screen name='SHARE' component={Share} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='GUARANTEE' component={Guarantee} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='ADMIN' component={Admin} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='PROFIT' component={Profit} options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Wrap=()=>{ // ห่อ App ไว้ด้วย Provider เพื่อที่จะส่งค่า state ผ่าน useSelector และ เก็บค่าไว้ที่ store
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}


export default Wrap
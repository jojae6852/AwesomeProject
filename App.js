import React from "react";
import { Alert, Button, Text, View, StyleSheet, Systrace } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

// import View from "react-native-web/src/exports/View";
/*export default function App() {
    return <Loading />;
}*/

export default class extends React.Component{

    state = {
        isLoading: true
    }

    getWeather = async(latitude,longitude) =>{
        const apikey = '2fd6dcff7ef95a8af086de6bc630a975';
        const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&&units=metric`);
        this.setState({isLoading : false , temp:data.main.temp});
    }

    getLocation = async() => {
        try {
            const response = await Location.requestPermissionsAsync();
            // console.log(response);
            const {coords : {latitude,longitude}} = await Location.getCurrentPositionAsync();
            this.getWeather(latitude,longitude);

            /*console.log(latitude);*/
        }catch (e) {
            Alert.alert('test','aaaaa');
        }
    }

    // render_component 가 호출된 이후에 호출되는 메소드
    componentDidMount() {
        this.getLocation();
    }

    //component
    render() {
        const { isLoading,temp } = this.state;
        return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
    }
}


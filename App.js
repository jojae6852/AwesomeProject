import React, {useState} from "react";
import { Alert, Button, Text, View, StyleSheet, Systrace , TouchableOpacity, StatusBar  } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";
// import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

import MenuDrawer from 'react-native-side-drawer';
import Constants from "expo-constants";



export default class extends React.Component{

    /*config = () =>{
        const
        const [count, setCount] = useState(0);
    }*/


    // 이벤트 사용시에 사용되는 함수 - 바인딩 여기서 처리 (변수)
    // 여기서 바인딩을 걸어주지 않으면 javascript this 바인딩 특성에 따라 예외의 결과 나온다.
    constructor(props) {
        //super 서언전엔 this 사용이 안됨. super 사용해야지만 this가 초기화됨
        //constructor 사용시 반드시 super 가 따라와야한다.

        // super(props) or super()
        // super(props) 는 constructor함수 내부 에서 사용시 this.props 외부에서 사용시엔 React가 자동으로 설정
        super(props);
        this.state = {
            open: false,
            count: 0,
            isLoading: true,
        };

        this.styleTypes = ['default','dark-content', 'light-content'];
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open });
        this.setState({ count: this.state.count + 1 });
    };

    drawerContent = () => {
        return (
            <TouchableOpacity onPress={this.toggleOpen} style={styles.slideBar}>
                <Text>Close</Text>
            </TouchableOpacity>
        );
    };


    getWeather = async(latitude,longitude) =>{
        const apikey = '2fd6dcff7ef95a8af086de6bc630a975';
        const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&&units=metric`);
        //로딩 페이지
        this.setState({isLoading : false , temp:data.main.temp});
    }

    getLocation = async() => {
        try {
            const response = await Location.requestPermissionsAsync();
            // console.log(response);
            const {coords : {latitude,longitude}} = await Location.getCurrentPositionAsync();
            this.getWeather(latitude,longitude);

            /!*console.log(latitude);*!/
        }catch (e) {
            Alert.alert('test','aaaaa');
        }
    }

    // render_component 가 호출된 이후에 호출되는 메소드
    componentDidMount() {
        this.getLocation();
    }

    //component
    /*render() {
        const { isLoading,temp } = this.state;
        return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
    }*/

    render() {
        const { isLoading,temp } = this.state;
        const { styleTypes } = this.styleTypes;
        return isLoading ? <Loading/> : (
            <View style={styles.container}>
                <StatusBar backgroundColor="blue" barStyle={this.styleTypes[1]} />
                <MenuDrawer
                    open={this.state.open}
                    drawerContent={this.drawerContent()}
                    drawerPercentage={45}
                    animationTime={400}
                    overlay={false}
                    opacity={0.8}
                >
                    {/*<TouchableOpacity onPress={this.toggleOpen} style={styles.header}>
                        <Weather temp={Math.round(temp)} />
                    </TouchableOpacity>*/}
                    <View style={styles.header}>
                        {/*<TouchableOpacity onPress={this.toggleOpen} >
                            <Weather temp={Math.round(temp)} />
                        </TouchableOpacity>*/}
                        <TouchableOpacity onPress={this.toggleOpen} style={styles.icon_menu}>
                            <Icon name="ios-menu" size={30} />
                        </TouchableOpacity>
                        {/*<View style={{position:'absolute',paddingTop: Constants.statusBarHeight,paddingBottom: Constants.statusBarHeight,}}>
                            <Text style={{fontSize:20,fontWeight:'900',marginTop: 3}}>

                            </Text>
                        </View>*/}
                    </View>
                    <View style={styles.body}></View>
                </MenuDrawer>
                {/*<Text>{this.state.count}</Text>*/}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 14,
    },
    slideBar: {
        flex: 1,
        // backgroundColor: "#38C8EC",
        padding: 0,
        borderStyle:'solid',
        borderRightWidth: 1,
        borderRightColor : '#dae0e2'
    },
    header: {
        flex: 1,
        alignItems: 'center',
    },
    body: {
        flex: 9,
        justifyContent: 'center',
    },
    icon_menu: {
        color:'#000000',
        position:'relative',
        alignSelf: 'flex-start',
        paddingTop: Constants.statusBarHeight,
        paddingLeft: Constants.statusBarHeight,
        paddingBottom: Constants.statusBarHeight,
        paddingRight: Constants.statusBarHeight,
    },
})

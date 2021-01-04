import React from "react"
import { View, StatusBar } from "react-native"
import { Router, Scene } from "react-native-router-flux"

//pages
import Home from "./pages/Home"
import Favorities from "./pages/Favorities"

const RouterComp = () => { 
    return (
        <Router>
            <Scene key="root">
                <Scene key="home" component={Home} hideNavBar={true} />
                <Scene key="favorities" component={Favorities} hideNavBar={true} />
            </Scene>
        </Router>
    )
}

export default RouterComp;
import React, { useEffect,useState } from 'react'
import {Text, View, SafeAreaView, Image, ScrollView, Dimensions, FlatList, TouchableOpacity, PermissionsAndroid, Alert, } from 'react-native'
const widthScreen = Dimensions.get("screen").width;
import axios from "axios"
import {Actions} from "react-native-router-flux"


//Colors
import Colors from "../config/Colors"
import apikey from "../config/api"


const Home = () => {

    const { mainContainer, title, poster, bestMovieWrapper, bestMovieWrapperText, star, starContainer, subTitle, miniCardContainer, cardPoster, cardWrapper } = styles;

    const [movies, setMovies] = useState([])
    const [downloadImage, setDownLoadImage] = useState(false)
    const [visible, setVisible] = useState(true)
    const menuControl = visible ? (<Text style={[title, { marginLeft: 10 }]}>Home</Text>) : (null);

    getMovies = () => {
        axios.get("http://www.omdbapi.com/?apikey=" + apikey.API_KEY + "&s=action")
            .then(res => setMovies(res.data.Search))
            .catch(err => console.log(err))
    }

    renderItemComponent = (movie) => {
        const { cardWrapper, cardPoster, title, starContainer, subTitle } = styles;
        console.log(movie)
        return (
            <View style={cardWrapper}>
                <View>
                    <Image source={{ uri: movies.item.Poster }} style={cardPoster} />
                </View>
                <View style={{ marginLeft: 10, justifyContent: "center" }}>
                    <Text style={title}>{movie.item.Title}{movie.item.Year}</Text>
                    <View style={starContainer}>
                        <Image source={require("../icons/star.png")} style={star} />
                        <Image source={require("../icons/star.png")} style={star} />
                        <Image source={require("../icons/star.png")} style={star} />
                        <Image source={require("../icons/star.png")} style={star} />
                    </View>
                    <Text style={subTitle}>{movie.item.Type}</Text>
                </View>
            </View>
        )
    }

    selectType = (type) => {
        axios.get("http://www.omdbapi.com/?apikey=" + apikey.API_KEY + "&s=" + type)
            .then(res => setMovies(res.data.Search))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getMovies();

        
    }, [])
    


    return (
        <View style={mainContainer}>
            <View>
                <Text style={title}>Top picks by your social network</Text>
            </View>

            <View style={bestMovieWrapper}>
                <View>
                    <Image source={{ uri: movies[2].Poster }} style={cardPoster} />
                </View>
                <View style={bestMovieWrapperText}>
                    <Text style={title}>{ movies[2].Title}({movies[2].Year})</Text>
                    <View style={starContainer}>
                        <Image source={require("../icons/star.png")} style={star} />
                        <Image source={require("../icons/star.png")} style={star} />
                        <Image source={require("../icons/star.png")} style={star} />
                        <Image source={require("../icons/star.png")} style={star} />
                    </View>
                </View>
            </View>

            <View>
                <Text style={[title, { marginTop: 10 }]}>Suggest for you</Text>
                <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={() => selectType("drama")} style={miniCardContainer}>
                        <Text style={title}>Drama</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectType("action")} style={miniCardContainer}>
                        <Text style={title}>Action</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectType("Horror")} style={miniCardContainer}>
                        <Text style={title}>Horror</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectType("Marvel")} style={miniCardContainer}>
                        <Text style={title}>Thriler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectType("Comedy")} style={miniCardContainer}>
                        <Text style={title}>Comedy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectType("Police")} style={miniCardContainer}>
                        <Text style={title}>Police</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View style={{ width: widthScreen, backgroundColor: "red", position: "absolute", bottom: 0, zIndex: 2, flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 16 }}>
                <TouchableOpacity onPress={() => setVisible(true)} style={{ backgroundColor: Colors.gray2, padding: 10, borderRadius: 20, marginHorizontal: 20, flexDirection: "row" }}>
                    <Image source={require("../icons/menu.png")} style={{ height: 20, width: 20 }} />
                    {menuControl}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.favorities({imageURL:movies[2].Poster})} style={{ backgroundColor: Colors.gray2, padding: 10, borderRadius: 20, marginHorizontal: 20 }}>
                    <Image source={require("../icons/film.png")} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
            </View>

            <View style={{ padding: 10 }}>
                <FlatList
                    data={movies}
                    renderItem={renderItemComponent}
                />
            </View>
        </View>
    )
}

const styles = {
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        padding: 15,
    },
    title: {
        fontWeight: "bold",
        color:"white"
    },
    bestMovieWrapper: {
        marginTop: 20,
        flexDirection:"row"
    },
    bestMovieWrapperText: {
        marginLeft:12
    },
    star: {
        height: 15,
        width: 15,
        marginHorizontal:2
    },
    starContainer: {
        marginTop: 10,
        flexDirection:"row"
    },
    poster: {
        borderRadius: 12,
        height: 150,
        width: 100
    },
    subTitle: {
        fontSize:12,
        color: "gray",
        marginTop:10
    },
    miniCardContainer: {
        backgroundColor: "#1A1C1E",
        padding: 10,
        borderRadius: 12,
        margin:3
    },
    cardPoster: {
        borderRadius: 12,
        height: 75,
        width: 50
    },
    cardWrapper: {
        flexDirection: "row",
        borderRadius: 12,
        padding: 5,
        marginVertical:10
    }
}

export default Home;

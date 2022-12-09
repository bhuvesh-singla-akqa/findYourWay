// TabOnScreen.tsx
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Button,
} from "react-native";
import { View } from "../components/Themed";
import List from "./List";
import SearchBar from "./SearchBar";
import * as Speech from "expo-speech";
// import { View } from '../components/Themed';
// import MapView from 'react-native-maps';

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 29.9990674;
// const LONGITUDE = -90.0852767;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function TabOneScreen({ provider }) {
  // const [region, setRegion] = useState({
  //   latitude: LATITUDE,    // initial location latitude
  //   longitude: LONGITUDE,  // initial location longitude
  //   latitudeDelta: LATITUDE_DELTA,
  //   longitudeDelta: LONGITUDE_DELTA,
  // });
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const customData = require("./AutoSuggest.json");
  // useEffect(()=>{
  //   console.log(customData)
  // })
  // get data from the fake api endpoint
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://innovatorsmap.azurewebsites.net/search"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

  // const speak = () => {
  //   const thingToSay = "Go Left";
  //   Speech.speak(thingToSay);
  // };

  return (
    <SafeAreaView style={styles.root}>
      {!clicked && (
        <>
          <Text style={styles.title}>Programming Languages</Text>
        </>
      )}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />

      {/* <View>
        <Button title="Press to hear some words" onPress={speak} />
      </View> */}
    </SafeAreaView>
    // <View style={styles.container}>
    //   <MapView
    //     provider={provider}
    //     style={styles.map}
    //     initialRegion={region}
    //     zoomTapEnabled={false}
    //   ></MapView>
    // </View>
  );
}
const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});
// const styles = StyleSheet.create({
//   container: {
// 		flex:1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: 'lightblue'
// 	},
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     left: 0,
// 		right: 0,
// 		top: 0,
// 		bottom: 0,
// 		position: 'absolute'
//   },
// });

// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';

// export default function TabTwoScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab Two</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Image, Button } from "react-native";
import * as Location from "expo-location";
import * as Speech from "expo-speech";
export default function TabTwoScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    // console.log(text)
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(text)
  }
  const [fakeData, setFakeData] = useState();
  // const [fakeData?.length, setFakeDataLength] = useState(0);
  const [imgArray, setImgArray] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://innovatorsmap.azurewebsites.net/direction"
      );
      const data = await apiResponse.json();
      setFakeData(data);
      setFakeDataLength(data.length);
    };
    getData();
  }, []);
  const speak = (speakString: any) => {
    const thingToSay = speakString;
    Speech.speak(thingToSay);
  };
  useEffect(() => {
    console.log(imgIndex, "imgIndex");
  }, [imgIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('This will run every second!',fakeData.length);

      if (imgIndex < fakeData?.length) {
        setImgIndex((imgIndex) => imgIndex + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [fakeData]);

  return (
    //   <View style={styles.container}>
    //   <Text style={styles.paragraph}>{text.timestamp}</Text>
    // </View>
    //   <View style={styles.container}>
    //   {/* <Image
    //     style={styles.tinyLogo}
    //     source={require('@expo/snack-static/react-native-logo.png')}
    //   /> */}
    //   <Image
    //     style={styles.backgroundImage}
    //     source={require('../assets/images/IMG_8716.jpg')}
    //   />
    //    <View style={styles.backgroundImageContainer}>
    //    <Image
    //     style={styles.backgroundImage}
    //     source={require('../assets/images/arrow-gif.gif')}
    //   />
    //    </View>
    //   {/*  */}
    //   {/* <Image
    //     style={styles.logo}
    //     source={{
    //       uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
    //     }}
    //   /> */}
    // </View>

    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        {/* <Image  source={require('../assets/images/IMG_8716.jpg')} resizeMode = 'cover' style = {styles.backdrop} /> */}
        {/* <Image
       
        source={{
          uri: `${currentImage}`,
        }}
      /> */}
        {fakeData?.length > 0 && fakeData?.length > imgIndex && (
          <Image
            style={styles.backdrop}
            source={{
              uri: fakeData[imgIndex].imageUrl,
            }}
          />
        )}
        {fakeData?.length > 0 && fakeData?.length <= imgIndex && (
          <Text>Reached</Text>
        )}
      </View>
      <View style={styles.overlay}>
        <Text style={styles.headline}>Go Here</Text>
        {fakeData?.length > 0 &&
          fakeData?.length > imgIndex &&
          fakeData[imgIndex].direction == "Left" && (
            <Image
              style={styles.logo}
              source={require("../assets/images/arrow-gif.gif")}
            />
          )}
        {fakeData?.length > 0 &&
          fakeData?.length > imgIndex &&
          fakeData[imgIndex].direction == "Right" && (
            <Image
              style={styles.logo2}
              source={require("../assets/images/arrow-gif.gif")}
            />
          )}
        {fakeData?.length > 0 &&
          fakeData?.length > imgIndex &&
          fakeData[imgIndex].direction == "Straight" && (
            <Image
              style={styles.logo3}
              source={require("../assets/images/arrow-gif.gif")}
            />
          )}

      </View>
      {fakeData?.length > 0 &&
          fakeData?.length > imgIndex && (   <View>
            <Button title="Vol" onPress={speak(fakeData[imgIndex]?.voiceCommand)} />
          </View>)}
   
    </View>
  );
}

var styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    opacity: 0.5,
    backgroundColor: "#000000",
  },
  logo: {
    backgroundColor: "rgba(0,0,0,0)",
    width: 160,
    height: 200,
    transform: [{ rotate: "90deg" }],
  },
  logo2: {
    backgroundColor: "rgba(0,0,0,0)",
    width: 160,
    height: 200,
    transform: [{ rotate: "270deg" }],
  },
  logo3: {
    backgroundColor: "rgba(0,0,0,0)",
    width: 160,
    height: 200,
    transform: [{ rotate: "180deg" }],
  },
  backdrop: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  headline: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "black",
    color: "white",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

//
// // import { StyleSheet } from 'react-native';

// // import EditScreenInfo from '../components/EditScreenInfo';
// // import { Text, View } from '../components/Themed';

// // export default function TabTwoScreen() {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Tab Two</Text>
// //       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
// //       <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   separator: {
// //     marginVertical: 30,
// //     height: 1,
// //     width: '80%',
// //   },
// // });
// import React, { useState, useEffect } from 'react';
// import { StyleSheet ,Text, View, Button, Image} from 'react-native';
// import { Camera,CameraType } from 'expo-camera';
// import { Video } from 'expo-av';

// export default function TabTwoScreen() {
//   const [hasAudioPermission, setHasAudioPermission] = useState(null);
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [record, setRecord] = useState(null);
//   const [type, setType] = useState(CameraType.back);
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});

//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === 'granted');

//       const audioStatus = await Camera.requestMicrophonePermissionsAsync();
//       setHasAudioPermission(audioStatus.status === 'granted');

//     })();
//   }, []);

//   const takeVideo = async () => {
//     if(camera){
//         const data = await camera.recordAsync({
//           maxDuration:10
//         })
//         setRecord(data.uri);
//         console.log(data.uri);
//     }
//   }

//   const stopVideo = async () => {
//     camera.stopRecording();
//   }

//   if (hasCameraPermission === null || hasAudioPermission === null ) {
//     return <View />;
//   }
//   if (hasCameraPermission === false || hasAudioPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={{ flex: 1}}>
//         <View style={styles.cameraContainer}>
//             <Camera
//             ref={ref => setCamera(ref)}
//             style={styles.fixedRatio}
//             type={type}
//             ratio={'4:3'} />
//         </View>
//         <Video
//           ref={video}
//           style={styles.video}
//           source={{
//             uri: record,
//           }}
//           useNativeControls
//           resizeMode="contain"
//           isLooping
//           onPlaybackStatusUpdate={status => setStatus(() => status)}
//         />
//         <View style={styles.buttons}>
//           <Button
//             title={status.isPlaying ? 'Pause' : 'Play'}
//             onPress={() =>
//               status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
//             }
//           />
//         </View>
//         <Button
//             title="Flip Video"
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//           </Button>
//           <Button title="Take video" onPress={() => takeVideo()} />
//           <Button title="Stop Video" onPress={() => stopVideo()} />

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   cameraContainer: {
//       flex: 1,
//       flexDirection: 'row'
//   },
//   fixedRatio:{
//       flex: 1,
//       aspectRatio: 1
//   },
//   video: {
//     alignSelf: 'center',
//     width: 350,
//     height: 220,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })

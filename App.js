import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    //ask for permission to camera roll
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 

    // if user denies access, show alert
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    
    // otherwise launch photo library
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    // if user cancells, just return
    if (pickerResult.cancelled === true) {
      return;
    }

    // set the selected image
    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {

    // check if sharing is allowed on platform, show alert if not available
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    // open sharing on device
    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      //selected image screen view
      <View style = {styles.container}>
        <Image source = {{ uri: selectedImage.localUri }} style = {styles.thumbnail}/>
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    // home screen view
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style ={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>
      
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style ={styles.buttonText}>Pick a photo </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

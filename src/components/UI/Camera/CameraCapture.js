import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Vibration } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Content, Card, Item, Icon, Title, Spinner, Input, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Constants, Camera, FileSystem, Permissions } from 'expo';
import isIPhoneX from 'react-native-is-iphonex';

export default class CameraCapture extends Component {
  constructor (props) {
    super (props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      photoId: 1,
      photos: [],
      picLink: null
    };
  }
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync({base64: true}).then(data => {
          Vibration.vibrate();
          if (this.props.onPicture && typeof this.props.onPicture === "function") {
            this.props.onPicture(data);
          }
      });
    }
  };
  
    render() {
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <Container>
            <View style={{ flex: 1 }}>
              <Camera ref={ref => {this.camera = ref}} style={{flex: 1}}>
                <View style={styles.snapButton}>
                  <TouchableOpacity style={[styles.flipButton, styles.picButton, { flex: 0.1, alignSelf: 'flex-end' }]} onPress={this.takePicture.bind(this)}>
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
          </Container>
        );
      }
    }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 45,
    marginHorizontal: 0,
    marginBottom: 10,
    marginRight: 10,
    marginTop: 20,
    borderRadius: 100,
    borderWidth: 6,
    padding: 0,
    
  },
  picButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff'
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  row: {
    flexDirection: 'row',
  },
  snapButton:{
    flex: 0.1,
    paddingBottom: isIPhoneX ? 20 : 0,
    // backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 600
  }
});
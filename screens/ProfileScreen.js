import React, {useState, useEffect} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button,
  Image, 
  Alert,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import i18n from '../i18n';
import logo from './../Images/logo.png';
import db from '../db'


const ProfileScreen = ( {navigation} ) => {
  const [pic, setpic] = useState(null);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [changePass, setChangePass] = useState('');
  
  useEffect(() => {
    const askPermissions = async () => {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,);
      if (status === 'granted') {
        setPermissionsGranted(true);
      }
    };
    askPermissions();
  });

  async function changePic(){
    const result = await ImagePicker.launchCameraAsync();
    if(!result.cancelled){
      const path = `${FileSystem.documentDirectory}asd.jpg`;
      await FileSystem.copyAsync({
        from: result.uri,
        to: path,
      })
        console.log(path);
      setpic(path);
    }
  };

  return(
      <View style={styles.container}>
        {
        !pic && (
            <Image source={logo} style={styles.pic}/>
        ) 
        ||
        pic && (
            <Image source={{uri: pic}} style={styles.pic}/>
          )
        }
        <Text style={styles.usn}>U S E R N A M E</Text>
        <Text>asdasdasdasadasds</Text>
        <Button color={'rgb(250, 194, 197)'} title={i18n.t('pic')} onPress={changePic}/>
        <Button color={'rgb(250, 194, 197)'} title={i18n.t('propass')} onPress={() => {
            Alert.prompt(
              i18n.t('propass'),
              null,
              [
                {text: (i18n.t('no')), onPress: () => this.close, style: 'cancel'},
                {text: (i18n.t('yes')), }
              ],
              'secure-text'
            
            )

        }}/>
        
        <Button color={'red'} style={styles.btn} title={i18n.t('logout')} onPress={() => {
          Alert.alert(
            i18n.t('logoutAlert'),
            null,
            [
              {text: (i18n.t('no')), onPress: () => this.close, style: 'cancel'},
              {text: (i18n.t('yes')), onPress: () => navigation.navigate('Home')}
            ]
          )
        }}/>
      </View>

  );

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#rgb(66, 65, 96)'
  },
  usn: {
      fontSize: 30,
      fontWeight: 'bold'    
  },
  btn: {
      color: 'red'
  },
  pic: {
    height: 200,
    width: 200,
    backgroundColor:'rgb(250, 194, 197)',
    borderRadius: 200 / 2
  }
});

export default ProfileScreen;

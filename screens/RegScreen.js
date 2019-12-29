import React from 'react';
import {
  Button, 
  StyleSheet, 
  View,
  Image,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';
import logo from './../Images/logo.png';
import i18n from '../i18n';
import db from '../db';


const {width: WIDTH} = Dimensions.get('window')

class RegScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordag: '',
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      input:{
        width: WIDTH - 100,
        height: 40, 
        borderRadius: 15,
        fontSize: 15,
        paddingLeft: 45,
        backgroundColor: 'rgb(66, 65, 96)',
        color: 'rgb(250, 194, 197)',
        marginHorizontal: 25,
        marginBottom:15,
      },
      logo: {
        width: 60,
        height: 60,
        marginBottom: 15
      },
    });
    
    
    return(
      <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <TextInput 
            style={styles.input}
            placeholder={i18n.t('username')}
            placeholderTextColor={'rgb(250, 194, 197)'}
            underlineColorAndroid={'transparent'}
            onChangeText={(value) => this.setState({username: value})} 

        />
        <TextInput 
            style={styles.input}
            placeholder={i18n.t('pass')}
            secureTextEntry={true}
            placeholderTextColor={'rgb(250, 194, 197)'}
            underlineColorAndroid={'transparent'}
            onChangeText={(value) => this.setState({password: value})}
        />
        <TextInput 
            style={styles.input}
            placeholder={i18n.t('passAg')}
            secureTextEntry={true}
            placeholderTextColor={'rgb(250, 194, 197)'}
            underlineColorAndroid={'transparent'}
            onChangeText={(value) => this.setState({passwordag: value})}
        />
        <Button style={styles.btn} 
            color='#fac2c5'
            title={i18n.t('reg')} onPress={() => {
                const { username, password, passwordag } = this.state;
                if((username !== '') && (password !== '') && (passwordag !== '') && (password === passwordag)){
                  db.saveUser({name: username, password}, 
                    (result)=> {
                      console.log(result);
                      return Alert.alert(
                        i18n.t('succ'),
                        '',
                        [
                          {text: (i18n.t('yes')), onPress: () => this.props.navigation.navigate('Some')}
                        ]
                        
                      );
                    }
                  )
                }
                else{
                  Alert.alert(
                    i18n.t('den'),
                    '',
                    [
                      {text: (i18n.t('ok')), onPress: () => this.close}
                    ]
                  )
                }
            }} 
        />
  
      </View>);
  }
}

export default RegScreen;
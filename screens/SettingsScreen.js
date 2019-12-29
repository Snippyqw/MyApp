import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button, 
  Animated, 
  Dimensions,
  Modal,
  Alert
} from 'react-native';
import MapView from 'react-native-maps';
import i18n from '../i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Contacts from './Contacts';


const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');

class SettingsScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      modal: false,
    }
  }

  

  componentDidMount() {
    const { fadeAnim } = this.state;
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
      }),
    ]).start();
  }

  

  render() {
    const { fadeAnim } = this.state;
    const { modal } = this.state;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#rgb(66, 65, 96)',
        width: WIDTH,
        height: HEIGHT,
        paddingBottom:45
      },
      Settings:{
        width: WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        top: 0, //Here is the trick
        marginTop:20,
        textAlign: 'left',
      },
      mapContainer:{
        width: WIDTH,
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        marginBottom:65,
        borderRadius: 10,
        
      },
      mapText:{
        fontSize: 30,
        fontWeight: 'bold',
        

      },
      map:{
        height : '100%',
        width: '99%',
        borderRadius: 10,
        marginBottom:10,
        marginLeft: 5,
        marginRight: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.62,
        
        elevation: 4,
        
      },
      list: {
        width: WIDTH-20,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor:'#rgb(52, 52, 76)',
        marginLeft: 10,
        marginRight: 10

      },
      listSet:{
        fontSize: 20,
        padding: 10,
        color: 'rgb(250, 194, 197)'
      },
      modal: {
        flex: 1,
        margin: 20,
        borderWidth: 0.5,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 20,
        
      },
      modalbtn: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
      },
      head: {
        color: 'rgb(250, 194, 197)',
        fontSize: 30,
        fontWeight: 'bold',
        width: WIDTH,
        paddingLeft: 5,
        borderBottomWidth: 3,
        borderBottomColor: 'black',
        backgroundColor:'#rgb(52, 52, 76)',

      }
    });
    return(
      
      <Animated.View style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        /*top: positionAnim.x,
        left: positionAnim.y,*/
        opacity: fadeAnim,}
        }>
          <View style={styles.container}>
            <View style={styles.Settings}>
            <Text style={ styles.head }>{i18n.t('settin')}</Text>
              <TouchableOpacity style={styles.list}
                  onPress={() => {Alert.alert(
                    i18n.t('langu'),
                    null,
                    [
                      {text: (i18n.t('ok')), onPress: () => this.close, style: 'cancel'},
                    ]
                  )
                }}
              >
                <Text style={styles.listSet}>
                  {i18n.t('lang')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.list}
                onPress={() => {this.setState({modal: true})}}
              >
                <Text style={styles.listSet}>
                  {i18n.t('inv')}
                </Text>
              </TouchableOpacity>

            </View>
            <View style={styles.mapContainer}>
              <Text style={styles.mapText}>{i18n.t('where')}</Text>
              <MapView style={styles.map}/>
            </View>
          </View>
          
          
            <Modal  animationType={"slide"}
                    visible={ modal }
                    transparent={true}
            >
              <View style={styles.modal}>
                <Contacts/>
               
                <Button title={i18n.t('can')} style={ {color: 'green'} } 
                  onPress={() => {this.setState({modal: false})}}
                />
              </View>
            </Modal>
      </Animated.View>
    );
  }
}

export default SettingsScreen;
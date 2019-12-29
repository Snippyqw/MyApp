import React from 'react';
import { 
  StyleSheet,
  View,
  Button, 
  Animated, 
  Dimensions,
} from 'react-native';
import { Card, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { createStore } from "redux";
import { Provider } from "react-redux";
import Counter, { counter } from "./Counter";
import gas from './../Images/gas.jpeg';
import clothes from './../Images/clothes.jpeg';
import food from './../Images/food.jpeg';
import i18n from '../i18n';

const store1 = createStore(counter);
const store2 = createStore(counter);
const store3 = createStore(counter);

const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')
class SomeScreen extends React.Component{
  state = {
    fadeAnim: new Animated.Value(0),
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
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#rgb(66, 65, 96)',
        width: WIDTH,
        height: HEIGHT,
        paddingTop: 20,
        paddingBottom:45,
      },
      card:{
        width: WIDTH - 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.62,
        
        elevation: 4,
        color: 'red'
      },
      title: {
        fontWeight: 'bold',
        color: '#rgb(66, 65, 96)',
        fontSize: 30
      }

      
    });


    return(
      <Animated.View style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeAnim,
        position: 'absolute',
      }
        }>
          <View style={styles.container}>
            <ScrollView style={{height: HEIGHT}}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title style={ styles.title }>{i18n.t('gas')}</Title>
                </Card.Content>
                <Card.Cover source={ gas } />
                <Card.Actions style={styles.btns}>
                <Provider store={store1}>
                    <Counter />
                  </Provider>
                </Card.Actions>
              </Card>

              <Card style={styles.card}>
                <Card.Content>
                  <Title style={ styles.title }>{i18n.t('food')}</Title>
                </Card.Content>
                <Card.Cover source={ food } />
                <Card.Actions style={styles.btns}>
                <Provider store={store2}>
                    <Counter />
                  </Provider>
                </Card.Actions>
              </Card>

              <Card style={styles.card}>
                <Card.Content>
                  <Title style={ styles.title }>{i18n.t('clothes')}</Title>
                </Card.Content>
                <Card.Cover source={ clothes } />
                <Card.Actions style={styles.btns}>
                <Provider store={store3}>
                    <Counter />
                  </Provider>
                </Card.Actions>
              </Card>

            
            
            </ScrollView>
          </View>
         
      </Animated.View>
    );
  }
}

export default SomeScreen;













/*const SomeScreen = ({ navigation }) => (
  <View style={styles.container}>
     <TextInput 
            style={styles.input}
            placeholder={'Felhasználónév'}
            placeholderTextColor={'rgb(250, 194, 197)'}
            underlineColorAndroid='transparent'

        />
    
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default SomeScreen;*/

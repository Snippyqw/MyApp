import React from "react";
import { connect } from "react-redux";
import { 
    Text,
    View,
    Button,
    TouchableOpacity,
    Alert,
    StyleSheet
  } from 'react-native';
  import i18n from '../i18n';

const INCREMENT1000 = "INCREMENT1000";
const INCREMENT500 = "INCREMENT500";
const INCREMENT100 = "INCREMENT100";
const DECREMENT1000 = "DECREMENT1000";
const DECREMENT500 = "DECREMENT500";
const DECREMENT100 = "DECREMENT100";
const valu = "valu";

function incrementAction1000() {
  return { type: INCREMENT1000 };
}
function incrementAction500() {
  return { type: INCREMENT500 };
}
function incrementAction100() {
  return { type: INCREMENT100 };
}

function decrementAction1000() {
  return { type: DECREMENT1000 };
}
function decrementAction500() {
  return { type: DECREMENT500 };
}
function decrementAction100() {
  return { type: DECREMENT100 };
}

function incrementVal(val){
  return {  type: valu, 
            value: val};
}

export function counter(state = 0, action) {
      switch (action.type) {
        case INCREMENT1000:
          return state + 1000;
        case INCREMENT500:
          return state + 500;
        case INCREMENT100:
          return state + 100;
        case DECREMENT1000:
          return state - 1000;
        case DECREMENT500:
          return state - 500;
        case DECREMENT100:
          return state - 100;
        case valu:
          return state + parseInt(action.value);
        default:
          return state;
      }
}

const mapStateToProps = state => {
  return {
    counter: state
  };
};

const mapDispatchToProps = {
  increment1000: incrementAction1000,
  increment500: incrementAction500,
  increment100: incrementAction100,
  decrement100: decrementAction100,
  decrement500: decrementAction500,
  decrement1000: decrementAction1000,
  incrementVal: incrementVal
};

const Counter = props => {
  const { counter,  increment1000, decrement1000, 
                    increment500, decrement500, 
                    increment100, decrement100,
                    incrementVal
        } = props;
    const styles = StyleSheet.create({
      container: {
        flex: 1,                 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }
    });
  

  return (
    
    <View style={ styles.container }>
      <Button color={'rgb(250, 194, 197)'} onPress={() => decrement1000()} title={"-1000"}/>
      <Button color={'rgb(250, 194, 197)'} onPress={() => decrement500()} title={"-500"}/>
          <TouchableOpacity onPress={() => Alert.prompt(
              null,
              null,
              [
                {text: (i18n.t('can')), onPress: () => this.close, style: 'cancel'},
                {text: (i18n.t('ok')), onPress: (value) => {
                  incrementVal(value);
                  
                }}
              ],
              
            
            )}>
            <Text style={{textAlign: 'center', fontSize: 20, color: '#rgb(66, 65, 96)'}}>{counter}</Text>
          </TouchableOpacity>
      <Button color={'rgb(250, 194, 197)'} onPress={() => increment500()} title={"+500"}/>
      <Button color={'rgb(250, 194, 197)'} onPress={() => increment1000()} title={"+1000"}/>
    </View>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

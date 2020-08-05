import React, {Component, useState} from 'react';
import Board from './components/Board';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={{fontSize: 30}}>Campo Minado</Text>
      </View>
    );
  }
}

class CampoMinado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recomecar: false,
    }
  }

  recomecar() {
    this.setState({recomecar: true});
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <Board x={16} y={16} bombas={15} recomecar={this.state.recomecar}/>
        <Button 
          title="Recomeçar"
          onPress={() => this.recomecar()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export default CampoMinado;
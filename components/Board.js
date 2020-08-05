import React, {Component, useState} from 'react';
import onPressCelula from '../onPressCelula';
import Square from './Square';
import ScrollView, { ScrollViewChild } from 'react-native-directed-scrollview';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  // ScrollView,
} from 'react-native';

export default class Board extends Component {
  constructor(props) {
		super(props);
		this.state = {
			campo: Array(props.x * props.y).fill(null),
			//null, 'bomba', 'bandeira' ou número
			celulasAbertas: Array(props.x * props.y).fill(false),
      bandeiras: Array(props.x * props.y).fill(false),
			isFirstPress: true,
	  }
  }

  handleClick(i) {
    if(this.state.bandeiras[i] === false) {
      const [newBoard, resultado] = onPressCelula(this.props, this.state, i);
      this.setState(newBoard);
      if(resultado === 1) {
        alert("Parabéns, você ganhou!!!");
        this.setInitialState();
      }
      else if(resultado === -1) {
        alert("Que pena! Você perdeu.");
        alert(this.props.recomecar);
        this.setInitialState();
      }
    }
  }

  handleLongClick(i) {
    const bandeiras = this.state.bandeiras.slice();
    if(!this.state.celulasAbertas[i] && bandeiras[i] === false) {
      bandeiras[i] = true;
    }
    else {
      bandeiras[i] = false;
    }
    this.setState({bandeiras});
  }

  setInitialState() {
    const campo = Array(this.props.x * this.props.y).fill(null);
		const celulasAbertas = Array(this.props.x * this.props.y).fill(false);
    const bandeiras = Array(this.props.x * this.props.y).fill(false);
		const isFirstPress = true;
    this.setState({campo, celulasAbertas, bandeiras, isFirstPress});
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.campo[i]}
        key={i}
        aberto={this.state.celulasAbertas[i]}
        onPress={() => this.handleClick(i)}
        onLongPress={() => this.handleLongClick(i)}
        bandeira={this.state.bandeiras[i]}
      />
    );
  }
  renderLinha(initial) { 
		//initial marca o índice do primeiro square da linha
		//esse índice é usado para linkar o square com seu state
		const linha = [];
    const x = this.props.x;

		for(let i = 0; i < x; i++) {
			linha.push(this.renderSquare(initial + i));
		}
		return (
			<View key={initial} style={{flexDirection: 'row'}}>
				{linha}
			</View>
		)
	}
	renderCampo() {
    const x = this.props.x;
    const y = this.props.y;

		const campo = [];
		for(let i = 0; i < y; i++) {
			campo.push(this.renderLinha(i * x));
		}
		return campo;
	}
  render() {
    return (
      <View>
      {/* <ScrollView horizontal>
        <ScrollView > */}
          {this.renderCampo()}
        {/* </ScrollView>
      </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    height: 1000,
    width: 1000,
  },
})
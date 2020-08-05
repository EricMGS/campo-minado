import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
	TouchableWithoutFeedback,
  Button,
} from 'react-native';

export default function Square(props) {
	const imagens = {
		zero: null,
		one: require("../assets/one.png"),
		two: require("../assets/two.png"),
		three: require("../assets/three.png"),
		four: require("../assets/four.png"),
		five: require("../assets/five.png"),
		six: require("../assets/six.png"),
		seven: require("../assets/seven.png"),
		eight: require("../assets/eight.png"),
		bomba: require("../assets/bomba.png"),
		bandeira: require("../assets/bandeira.png"),
	};

	const getImagem = (imagem) => imagens[imagem];
	
	const isAberto = function() {
		return props.aberto;
	}

  const isBandeira = function() {
    return props.bandeira;
  }

	const mostraImagem = function() {
		if(isAberto()) {
			return getImagem(props.value);
    }
    else if(isBandeira()) {
      return getImagem("bandeira");
    }
		return null;
	}

  const getColor = function() { 
    const newColor = isAberto() && props.value === null ? "gray" : "dodgerblue";
    return newColor;
      
  }

	return (
		<TouchableWithoutFeedback
      onPress={props.onPress} 
      onLongPress={props.onLongPress}
      >
			<View style={[styles.square, {backgroundColor: getColor()}]}>
				<Image
					source={mostraImagem()}
					style={styles.squareImage}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
  square: {
    width: 40,
    height: 40,
    borderRadius: 10,
    margin: 1,
    padding: 3,
  },
	squareImage: {
		flex: 1,
		width: undefined,
		height: undefined,
	},
});
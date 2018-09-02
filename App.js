import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { DefaultTheme, Provider as PaperProvider, Appbar, Button, Text } from 'react-native-paper'

export default class App extends Component {
	constructor(props) {
		super(props)

		this.buttonClick = this.buttonClick.bind(this)
	}

	render() {
		return (
			<PaperProvider theme={DefaultTheme}>
				<Appbar.Header>
				<Appbar.Content
					title="Guess It"
				/>
				</Appbar.Header>
				<Text style={styles.title}>Let's assume the random number is X</Text>
				<View style={styles.container}>
					<Text style={{ fontSize: 22, marginHorizontal: 10, marginBottom: 20 }}>X is greater than 0</Text>
					<View style={styles.padder}>
						<Button mode="contained" onPress={this.buttonClick}>+</Button>
					</View>
					<View style={styles.padder}>
						<Text style={{ fontSize: 22 }}>0</Text>
					</View>
					<View style={styles.padder}>
						<Button mode="contained" onPress={this.buttonClick}>-</Button>
					</View>
					<View style={styles.padder}>
						<Button mode="contained" onPress={this.buttonClick}>Guess</Button>
					</View>
				</View>
			</PaperProvider>
		)
	}

	buttonClick() {
		console.log('Hello')
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 22,
		textAlign: 'center',
		paddingHorizontal: 20,
		marginTop: 10
	},
	padder: {
		paddingBottom: 16
	}
})

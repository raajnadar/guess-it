import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { DefaultTheme, Provider as PaperProvider, Appbar, Button, Text } from 'react-native-paper'

let number = 0
const min = 0, max = 50, random = 0

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			number: 0,
			guessed_value: 0,
			value: 'greater',
			won: false
		}

		this.guessValue = this.guessValue.bind(this)
	}

	render() {
		const { number, value, guessed_value, won } = this.state

		return (
			<PaperProvider theme={DefaultTheme}>
				<Appbar.Header>
				<Appbar.Content
					title="Guess It"
				/>
				</Appbar.Header>
				<Text style={styles.title}>Let's assume the random number is X</Text>
				<View style={styles.container}>
					{
						won ? (
							<Text style={{ fontSize: 22, marginHorizontal: 16, marginBottom: 20 }}>Wow you guessed in X Tries</Text>
						) : (
							<Text style={{ fontSize: 22, marginHorizontal: 16, marginBottom: 20 }}>X is {value} than {guessed_value}</Text>
						)
					}
					<View style={styles.padder}>
						<Button mode="contained" onPress={() => this.changeValue('plus')}>+1</Button>
					</View>
					<View style={styles.padder}>
						<Text style={{ fontSize: 22 }}>Guess X as {number}</Text>
					</View>
					<View style={styles.padder}>
						<Button mode="contained" onPress={() => this.changeValue('minus')}>-1</Button>
					</View>
					<View style={styles.padder}>
						<Button mode="contained" onPress={this.guessValue}>Guess</Button>
					</View>
				</View>
			</PaperProvider>
		)
	}

	componentDidMount() {
		// Generate random number
		random = Math.floor(Math.random() * (max-min+1) + min);
		console.log(random)
	}

	guessValue() {
		if (number > random) {
			console.log('Lesser')
			this.setState({ value: 'lesser', guessed_value: number })
		} else if (number < random) {
			console.log('Greater')
			this.setState({ value: 'greater', guessed_value: number })
		} else {
			this.setState({ won: true })
		}
	}

	changeValue(name) {
		if (number >= min && number <= max) {
			if (name == 'plus' && number < max) {
				number++
			}

			if (name == 'minus' && number > min) {
				number--
			}

			this.setState({ number: number })
		}
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
		marginTop: 16
	},
	padder: {
		paddingBottom: 16
	}
})

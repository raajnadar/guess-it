import React, { Component, Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

import { Button, Text } from 'react-native-paper'

let number = 0, tries = 0
const min = 0, max = 50, random = 0

export default class Index extends Component {
	constructor(props) {
		super(props)

		this.state = {
			number: 0,
			guessed_value: 0,
			value: 'greater',
			won: false
		}

		this.guessValue = this.guessValue.bind(this)
		this.playAgain = this.playAgain.bind(this)
	}

	render() {
		const { number, value, guessed_value, won, tries } = this.state

		return (
            <Fragment>
				<Text style={styles.title}>The random number is X</Text>
				<View style={styles.container}>
					{
						won ? (
							<Text style={{ fontSize: 22, marginHorizontal: 16, marginBottom: 20 }}>You guessed in {tries} tries</Text>
						) : (
							<Text style={{ fontSize: 22, marginHorizontal: 16, marginBottom: 20 }}>X is {value} than {guessed_value}</Text>
						)
					}
					<View style={styles.padder}>
						<Button mode="contained" onPress={() => this.changeValue('plus')} style={styles.button} disabled={number === 50 || won  ? true : false}>+1</Button>
					</View>
					<View style={styles.padder}>
						<Text style={{ fontSize: 22 }}>Guess X as {number}</Text>
					</View>
					<View style={styles.padder}>
						<Button mode="contained" onPress={() => this.changeValue('minus')} style={styles.button} disabled={number === 0 || won ? true : false}>-1</Button>
					</View>
					<View style={styles.padder}>
						{
							won ? (
								<Button mode="contained" onPress={this.playAgain} style={styles.button}>Play Again?</Button>
							) : (
								<Button mode="contained" onPress={this.guessValue} style={styles.button} disabled={number === guessed_value ? true : false}>Guess</Button>
							)
						}
					</View>
				</View>
            </Fragment>
		)
	}

	componentDidMount() {
		// Generate random number
		this.generateRandom()
	}

	generateRandom() {
		random = Math.floor(Math.random() * (max-min+1) + min);
	}

	playAgain() {
		// Clear all the data
		this.generateRandom()
		number = 0, tries = 0
		this.setState({ won: false, value: 'greater', guessed_value: 0, number: 0 })
	}

	guessValue() {
		if (number > random) {
			this.setState({ value: 'lesser', guessed_value: number })
		} else if (number < random) {
			this.setState({ value: 'greater', guessed_value: number })
		} else {
			this.setState({ won: true })
		}

		tries++
		this.setState({ tries: tries })
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
	},
	button: {
		minWidth: 160,
		paddingVertical: 6
	}
})
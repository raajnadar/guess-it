/* eslint-disable object-shorthand */
import React, { Component } from 'react'

import { StyleSheet, Text, View } from 'react-native'

import { Button, Dialog, Paragraph, Portal } from 'react-native-paper'

import NumberTile from '../components/NumberTile'

let items = []

const min = 1
const max = 30
let random = 0
let tries = 0
let guessed_value = []

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.resetData()

		this.state = {
			items: items,
			tries: 0,
			won: false,
			guessed: [],
			value: ''
		}
	}

	render() {
		const { guessed, value, won } = this.state

		return (
			<View>
				<Text style={styles.hint}>
					{value === ''
						? 'Click on a number to get a hint'
						: `${guessed[guessed.length - 1]} is ${value}`}
				</Text>
				<View style={styles.container}>
					{items.map((data, index) => {
						let i = index
						return (
							<NumberTile
								key={i}
								index={i}
								disabled={data.disabled}
								onPress={() => this.guessValue(i)}
							/>
						)
					})}
				</View>
				<Portal>
					<Dialog
						visible={won}
						dismissable={false}
						onDismiss={() => this.setState({ won: false })}>
						<Dialog.Title>You won!</Dialog.Title>
						<Dialog.Content>
							<Paragraph>
								The random number is{' '}
								{guessed_value[guessed_value.length - 1]}, You
								guessed in {tries} tries
							</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={this.playAgain}>
								Play Again?
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</View>
		)
	}

	componentDidMount() {
		// Generate random number
		this.generateRandom()
	}

	generateRandom() {
		random = Math.floor(Math.random() * (max - min + 1) + min)
	}

	guessValue = number => {
		tries++
		guessed_value.push(number)
		items[number].disabled = true

		if (number > random) {
			this.setState({
				value: 'high',
				guessed: guessed_value,
				tries: tries,
				items: items
			})
		} else if (number < random) {
			this.setState({
				value: 'low',
				guessed: guessed_value,
				tries: tries,
				items: items
			})
		} else {
			this.setState({ won: true, tries: tries })
		}
	}

	playAgain = () => {
		// Clear all the data
		this.generateRandom()
		this.resetData()
		tries = 0
		guessed_value = []
		this.setState({
			won: false,
			value: '',
			tries: tries,
			guessed: guessed_value
		})
	}

	resetData = () => {
		items = []

		for (var i = 1; i <= max; i++) {
			items.push({ [i]: i, disabled: false })
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	hint: {
		fontSize: 20,
		padding: 10,
		textAlign: 'center'
	}
})

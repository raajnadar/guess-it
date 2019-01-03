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
			value: '',
			isModalVisible: false
		}
	}

	render() {
		const { guessed, value, won, isModalVisible } = this.state

		return (
			<View>
				<Text style={styles.hint}>
					{value === ''
						? 'Click on a number to get a hint'
						: `${guessed[guessed.length - 1]} is ${value}`}
				</Text>
				<View style={styles.container}>
					{items.map((data, index) => {
						return (
							<NumberTile
								key={data.value}
								index={data.value}
								disabled={data.disabled}
								onPress={() => this.guessValue(data.value)}
							/>
						)
					})}
				</View>
				{won ? (
					<View style={styles.playAgainContainer}>
						<Button
							style={styles.playAgainBtn}
							mode="contained"
							compact
							onPress={this.playAgain}>
							Play Again?
						</Button>
					</View>
				) : null}
				<Portal>
					<Dialog
						visible={isModalVisible}
						dismissable={false}
						onDismiss={() =>
							this.setState({ isModalVisible: false })
						}>
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
							<Button
								onPress={() =>
									this.setState({ isModalVisible: false })
								}>
								Exit
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
		items[number - 1].disabled = true

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
			this.setState({ won: true, isModalVisible: true, tries: tries })
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
			items.push({ value: i, disabled: false })
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
	},
	playAgainContainer: {
		alignItems: 'center'
	},
	playAgainBtn: {
		margin: 10,
		width: '50%'
	}
})

/* eslint-disable object-shorthand */
import React, { Component } from 'react'

import { Linking, StyleSheet, Text, View } from 'react-native'

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
		const { won, isModalVisible } = this.state
		const { navigation } = this.props
		const visible = navigation.getParam('isCreditsDialogVisible', false)

		return (
			<View>
				<Text style={styles.hint}>{this.hintMessage()}</Text>
				<View style={styles.container}>
					{items.map((data, index) => {
						return (
							<NumberTile
								key={data.value}
								index={data.value}
								random={random}
								disabled={data.disabled}
								won={won}
								onPress={() => this.guessValue(data.value)}
							/>
						)
					})}
				</View>
				{won ? (
					<View style={styles.newGameContainer}>
						<Button
							style={styles.newGameBtn}
							mode="contained"
							compact
							onPress={this.newGame}>
							New Game
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
							<Button
								onPress={() =>
									this.setState({ isModalVisible: false })
								}>
								Exit
							</Button>
						</Dialog.Actions>
					</Dialog>
					<Dialog visible={visible} dismissable={false}>
						<Dialog.Content>
							<Paragraph>
								Guess the number mobile application developed by
								rajendran nadar
							</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button
								onPress={() =>
									Linking.openURL('https://raajnadar.in')
								}>
								Portfolio
							</Button>
							<Button
								onPress={() =>
									this.props.navigation.setParams({
										isCreditsDialogVisible: false
									})
								}>
								Close
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

	hintMessage = () => {
		let currentNumber = this.state.guessed[this.state.guessed.length - 1]

		if (this.state.value !== '' && !this.state.won) {
			return `${currentNumber} is ${
				this.state.value
			} than the random number`
		} else if (this.state.won) {
			return `You guessed in ${tries} tries`
		} else {
			return 'Click on a number to get a hint'
		}
	}

	guessValue = number => {
		tries++
		guessed_value.push(number)
		items[number - 1].disabled = true

		if (number > random) {
			this.setState({
				value: 'greater',
				guessed: guessed_value,
				tries: tries,
				items: items
			})
		} else if (number < random) {
			this.setState({
				value: 'lesser',
				guessed: guessed_value,
				tries: tries,
				items: items
			})
		} else {
			this.setState({ won: true, isModalVisible: true, tries: tries })
		}
	}

	newGame = () => {
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
	newGameContainer: {
		alignItems: 'center'
	},
	newGameBtn: {
		margin: 10,
		width: '50%'
	}
})

import React, { useEffect, useState } from 'react'

import { StyleSheet, View } from 'react-native'

import { Button, Dialog, Paragraph, Portal, Text } from 'react-native-paper'

import NumberTile from '../components/NumberTile'

const min = 1
const max = 30

type Item = {
	value: number
	disabled: boolean
}

export default function Game(): JSX.Element {
	const [items, setItem] = useState<Array<Item>>([])
	const [random, setRandom] = useState(0)
	const [tries, setTries] = useState(0)
	const [won, setWonStatus] = useState(false)
	const [guessed, setGuessed] = useState<Array<number>>([])
	const [value, setValue] = useState('')

	const [isModalVisible, setModalVisibility] = useState(false)

	useEffect(() => {
		resetData()
		generateRandom()
	}, [])

	const generateRandom = (): void =>
		setRandom(Math.floor(Math.random() * (max - min + 1) + min))

	const hintMessage = (): string => {
		const currentNumber = guessed[guessed.length - 1]

		if (value !== '' && !won) {
			return `${currentNumber} is ${value} than the random number`
		} else if (won) {
			return `You guessed in ${tries} tries`
		} else {
			return 'Click on a number to get a hint'
		}
	}

	const guessValue = (number: number): void => {
		const temp = items
		const tempTries = tries + 1
		const tempGuessedValue = guessed

		tempGuessedValue.push(number)
		temp[number - 1].disabled = true

		if (number > random) {
			setValue('greater')
			setGuessed(tempGuessedValue)
			setTries(tempTries)
			setItem(temp)
		} else if (number < random) {
			setValue('lesser')
			setGuessed(tempGuessedValue)
			setTries(tempTries)
			setItem(temp)
		} else {
			setWonStatus(true)
			setModalVisibility(true)
			setTries(tempTries)
		}
	}

	const newGame = (): void => {
		// Clear all the data
		generateRandom()
		resetData()
		setWonStatus(false)
		setValue('')
		setTries(0)
		setGuessed([])
	}

	const resetData = (): void => {
		const temp = []

		for (let i = 1; i <= max; i++) {
			temp.push({ value: i, disabled: false })
		}
		setItem(temp)
	}

	return (
		<View>
			<Text style={styles.hint}>{hintMessage()}</Text>
			<View style={styles.container}>
				{items.map((data) => {
					const { disabled, value } = data

					return (
						<NumberTile
							won={won}
							key={value}
							index={value}
							random={random}
							disabled={disabled}
							onPress={(): void => guessValue(value)}
						/>
					)
				})}
			</View>
			{won ? (
				<View style={styles.newGameContainer}>
					<Button
						compact
						mode="contained"
						onPress={newGame}
						style={styles.newGameBtn}>
						New Game
					</Button>
				</View>
			) : null}
			<Portal>
				<Dialog
					dismissable={false}
					visible={isModalVisible}
					onDismiss={(): void => setModalVisibility(false)}>
					<Dialog.Title>You won!</Dialog.Title>
					<Dialog.Content>
						<Paragraph>
							The random number is {random}, You guessed in {tries} tries
						</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={(): void => setModalVisibility(false)}>
							Exit
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	hint: {
		fontSize: 20,
		padding: 10,
		textAlign: 'center',
		color: '#FF0000'
	},
	newGameContainer: {
		alignItems: 'center'
	},
	newGameBtn: {
		margin: 10,
		width: '50%'
	}
})

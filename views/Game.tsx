import React, { JSX } from 'react'

import { StyleSheet, View } from 'react-native'

import { Button } from '@rootnative/components/button'
import { Dialog } from '@rootnative/components/dialog'
import { Layout } from '@rootnative/components/layout'
import { Typography } from '@rootnative/components/typography'
import { useTheme } from '@rootnative/core'

import NumberTile from '../components/NumberTile'

const min = 1
const max = 30

const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i)

const generateRandom = (): number =>
	Math.floor(Math.random() * (max - min + 1) + min)

const formatTries = (tries: number): string =>
	`${tries} ${tries === 1 ? 'try' : 'tries'}`

export default function Game(): JSX.Element {
	const theme = useTheme()
	const [random, setRandom] = React.useState(generateRandom)
	const [guessed, setGuessed] = React.useState<Array<number>>([])

	const tries = guessed.length
	const currentNumber = guessed[tries - 1]
	const won = currentNumber === random

	const hint = (): { message: string; color: string } => {
		if (won) {
			return {
				message: `You guessed in ${formatTries(tries)}`,
				color: theme.colors.primary
			}
		}

		if (currentNumber === undefined) {
			return {
				message: 'Click on a number to get a hint',
				color: theme.colors.onSurfaceVariant
			}
		}

		const position = currentNumber > random ? 'greater' : 'lesser'

		return {
			message: `${currentNumber} is ${position} than the random number`,
			color: theme.colors.error
		}
	}

	const guessValue = (number: number): void =>
		setGuessed((previous) => [...previous, number])

	const newGame = (): void => {
		setRandom(generateRandom())
		setGuessed([])
	}

	const { message, color } = hint()

	return (
		<Layout>
			<Typography variant="titleLarge" color={color} style={styles.hint}>
				{message}
			</Typography>
			<View style={styles.container}>
				{numbers.map((value) => (
					<NumberTile
						won={won}
						key={value}
						index={value}
						random={random}
						disabled={guessed.includes(value)}
						onPress={(): void => guessValue(value)}
					/>
				))}
			</View>
			<Dialog dismissable={false} visible={won} onDismiss={newGame}>
				<Dialog.Title>You won!</Dialog.Title>
				<Dialog.Content>
					{`The random number is ${random}. You guessed in ${formatTries(
						tries
					)}.`}
				</Dialog.Content>
				<Dialog.Actions>
					<Button variant="text" onPress={newGame}>
						Play again
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	hint: {
		padding: 10,
		textAlign: 'center'
	}
})

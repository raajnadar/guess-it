import type { JSX } from 'react'
import { StyleSheet, View } from 'react-native'

import { Layout } from '@rootnative/components/layout'
import { Typography } from '@rootnative/components/typography'

import { levels, min } from '../game/levels'

const ranges = levels
	.map((level) => `${level.label} ${min} to ${level.max}`)
	.join(', ')

const rules = [
	`Select a level. The computer selects a random number in the range of that level: ${ranges}.`,
	'Tap a number to guess it.',
	'The hint tells you to go higher or lower. It also shows the range that is left.',
	'Repeat until you find the random number. Use as few tries as you can.'
]

export default function HowToPlay(): JSX.Element {
	return (
		<Layout style={styles.container}>
			{rules.map((rule) => (
				<View key={rule} style={styles.howToContainer}>
					<Typography variant="bodyLarge" style={styles.howToText}>
						{rule}
					</Typography>
				</View>
			))}
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		padding: 40
	},
	howToContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1
	},
	howToText: {
		flex: 1,
		fontSize: 18,
		textAlign: 'center'
	}
})

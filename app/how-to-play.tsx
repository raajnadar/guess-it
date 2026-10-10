import type { JSX } from 'react'
import { StyleSheet, View } from 'react-native'

import { Layout } from '@rootnative/components/layout'
import { Typography } from '@rootnative/components/typography'

export default function HowToPlay(): JSX.Element {
	return (
		<Layout style={styles.container}>
			<View style={styles.howToContainer}>
				<Typography variant="bodyLarge" style={styles.howToText}>
					The computer will select a number randomly between 1 and 30.
				</Typography>
			</View>
			<View style={styles.howToContainer}>
				<Typography variant="bodyLarge" style={styles.howToText}>
					Try guessing the random number by clicking on the number.
				</Typography>
			</View>
			<View style={styles.howToContainer}>
				<Typography variant="bodyLarge" style={styles.howToText}>
					Guess the next number with the help of the hint.
				</Typography>
			</View>
			<View style={styles.howToContainer}>
				<Typography variant="bodyLarge" style={styles.howToText}>
					Repeat until you find the random number.
				</Typography>
			</View>
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

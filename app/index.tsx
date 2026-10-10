import type { JSX } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'

import { Button } from '@rootnative/components/button'
import { Layout } from '@rootnative/components/layout'
import { Typography } from '@rootnative/components/typography'
import { router } from 'expo-router'

export default function HowToPlay(): JSX.Element {
	return (
		<Layout edges={['top', 'bottom']} style={styles.container}>
			<StatusBar barStyle="dark-content" />
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
			<Button
				size="medium"
				shape="square"
				style={styles.btn}
				onPress={(): void => router.replace('/game')}>
				Let&apos;s Play
			</Button>
		</Layout>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		padding: 40
	},
	btn: {
		alignSelf: 'stretch'
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

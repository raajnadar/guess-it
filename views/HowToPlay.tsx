import { StyleSheet, View } from 'react-native'

import { Button, Text } from 'react-native-paper'

type Props = {
	navigation: any
}

export default function HowToPlay({ navigation }: Props): JSX.Element {
	return (
		<View style={styles.container}>
			<View style={styles.howToContainer}>
				<Text style={styles.howToText}>
					The computer will select a number randomly between 1 - 50.
				</Text>
			</View>
			<View style={styles.howToContainer}>
				<Text style={styles.howToText}>
					Try guessing the random number by clicking on the number.
				</Text>
			</View>
			<View style={styles.howToContainer}>
				<Text style={styles.howToText}>
					Guess the next number with the help of the hint.
				</Text>
			</View>
			<View style={styles.howToContainer}>
				<Text style={styles.howToText}>
					Repeat untill you find the random number.
				</Text>
			</View>
			<View style={styles.btnContainer}>
				<Button
					style={styles.btn}
					mode="contained"
					uppercase={false}
					onPress={(): void => navigation.replace('Game')}>
					Let&apos;s Play
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 40,
		backgroundColor: '#fff'
	},
	btnContainer: {
		display: 'flex',
		flexDirection: 'row'
	},
	btn: {
		flex: 1,
		borderRadius: 0
	},
	howToContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1
	},
	howToText: {
		fontSize: 18,
		textAlign: 'center'
	}
})

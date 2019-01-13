import React, { Component } from 'react'

import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class NumberTile extends Component {
	render() {
		const { index, onPress, disabled, random, won } = this.props
		let indexColor = '#551A8B'

		if (index % 2 === 0) {
			indexColor = '#ccbadc'
		} else {
			indexColor = '#ddd1e7'
		}

		if (disabled) {
			if (random === index) {
				indexColor = 'rgba(0, 255, 0, 0.5)'
			} else {
				indexColor = 'rgba(255, 0, 0, 0.5)'
			}
		}

		return (
			<TouchableOpacity
				onPress={!(disabled || won) ? onPress : null}
				activeOpacity={!(disabled || won) ? 0.2 : 1}
				style={[styles.container, { backgroundColor: indexColor }]}>
				<Text style={styles.text}>{index}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		width: '20%'
	},
	text: {
		fontSize: 20
	}
})

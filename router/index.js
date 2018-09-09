import React from 'react'

import { Appbar } from 'react-native-paper'

import { createStackNavigator } from 'react-navigation'

import Index from '../views'

export default createStackNavigator({
		Index: Index
}, {
	navigationOptions: {
		header: (
			<Appbar.Header>
				<Appbar.Content title="Guess It" />
			</Appbar.Header>
		)
	},
	initialRouteName: 'Index'
})
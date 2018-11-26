import React from 'react'

import { Appbar } from 'react-native-paper'

import { createAppContainer, createStackNavigator } from 'react-navigation'

import Index from '../views'

const stack = createStackNavigator(
	{
		Index
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			header: (
				<Appbar.Header>
					<Appbar.Content title="Guess It" />
					<Appbar.Action
						icon="code"
						onPress={() => navigation.setParams({ visible: true })}
					/>
				</Appbar.Header>
			)
		}),
		initialRouteName: 'Index'
	}
)

export default createAppContainer(stack)

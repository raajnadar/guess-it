/* eslint-disable object-shorthand */
import React from 'react'

import { Appbar } from 'react-native-paper'

import { createAppContainer, createStackNavigator } from 'react-navigation'

import Game from '../views/Game'

const stack = createStackNavigator(
	{
		Game: Game
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
		initialRouteName: 'Game'
	}
)

export default createAppContainer(stack)

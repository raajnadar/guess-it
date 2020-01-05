/* eslint-disable object-shorthand */
import { createAppContainer } from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack'

import Developer from '../views/Developer'
import Game from '../views/Game'

const stack = createStackNavigator(
	{
		Developer: Developer,
		Game: Game
	},
	{
		defaultNavigationOptions: {
			header: null
		},
		initialRouteName: 'Game'
	}
)

export default createAppContainer(stack)

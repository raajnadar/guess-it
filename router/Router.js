/* eslint-disable object-shorthand */
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Developer from '../views/Developer'
import Game from '../views/Game'
import HowToPlay from '../views/HowToPlay'

const stack = createStackNavigator(
	{
		Developer: Developer,
		Game: Game,
		HowToPlay: HowToPlay
	},
	{
		defaultNavigationOptions: {
			header: null
		},
		initialRouteName: 'HowToPlay'
	}
)

export default createAppContainer(stack)

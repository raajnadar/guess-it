import React, { JSX } from 'react'

import { MD2LightTheme, Provider as PaperProvider } from 'react-native-paper'

import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import Router from './router/Router'

const theme = {
	...MD2LightTheme,
	colors: {
		...MD2LightTheme.colors,
		primary: '#800080',
		accent: 'yellow'
	}
}

export default function App(): JSX.Element {
	React.useEffect(() => {
		StatusBar.setBarStyle('light-content')
		StatusBar.setBackgroundColor('#640164')
	}, [])

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Router />
			</NavigationContainer>
		</PaperProvider>
	)
}

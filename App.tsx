import React from 'react'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import { NavigationContainer } from '@react-navigation/native'

import Router from './router/Router'

export default function App(): JSX.Element {
	return (
		<PaperProvider theme={DefaultTheme}>
			<NavigationContainer>
				<Router />
			</NavigationContainer>
		</PaperProvider>
	)
}

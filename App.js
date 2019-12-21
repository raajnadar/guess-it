import React from 'react'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import Router from './router/Router'

export default function App() {
	return (
		<PaperProvider theme={DefaultTheme}>
			<Router />
		</PaperProvider>
	)
}

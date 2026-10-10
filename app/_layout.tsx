import type { JSX } from 'react'

import { mdiResolver } from '@rootnative/components/mdi'
import { PortalHost } from '@rootnative/components/portal'
import { ThemeProvider } from '@rootnative/core'
import { createMaterialTheme } from '@rootnative/core/create-theme'
import { NativeStackHeaderProps, Stack } from 'expo-router'

import Header from '../components/Header'

// 'fidelity' keeps the brand purple: the seed becomes primaryContainer and
// primary is a darker tone of the same hue. 'tonalSpot' shifts it to mauve.
const { lightTheme: theme } = createMaterialTheme('#800080', {
	variant: 'fidelity'
})

export default function RootLayout(): JSX.Element {
	return (
		<ThemeProvider theme={theme} iconResolver={mdiResolver}>
			<PortalHost>
				<Stack
					screenOptions={{
						header: (props: NativeStackHeaderProps): JSX.Element => (
							<Header {...props} />
						)
					}}>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="game" options={{ title: 'Guess It' }} />
					<Stack.Screen name="developer" options={{ title: 'Developer' }} />
				</Stack>
			</PortalHost>
		</ThemeProvider>
	)
}

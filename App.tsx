import type { JSX } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { mdiResolver } from '@rootnative/components/mdi'
import { PortalHost } from '@rootnative/components/portal'
import { ThemeProvider } from '@rootnative/core'
import { createMaterialTheme } from '@rootnative/core/create-theme'

import Router from './router/Router'

// 'fidelity' keeps the brand purple: the seed becomes primaryContainer and
// primary is a darker tone of the same hue. 'tonalSpot' shifts it to mauve.
const { lightTheme: theme } = createMaterialTheme('#800080', {
	variant: 'fidelity'
})

export default function App(): JSX.Element {
	return (
		<ThemeProvider theme={theme} iconResolver={mdiResolver}>
			<PortalHost>
				<NavigationContainer>
					<Router />
				</NavigationContainer>
			</PortalHost>
		</ThemeProvider>
	)
}

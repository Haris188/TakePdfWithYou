import '../styles/globals.css'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import {Provider} from 'react-redux'
import {store} from '../components/Redux'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </StyledThemeProvider>
    </ThemeProvider>
  )
}

export default MyApp

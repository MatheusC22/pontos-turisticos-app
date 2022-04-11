// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            border: '0px solid',
            borderRadius: '0',
            borderBottom: '2px solid',
            borderBottomColor: '#A5EBE1',
            _hover: {
              borderBottomColor: '#7FCBC3',
            },
            _focus: {
              boxShadow: 'none',
              borderBottomColor: '#7FCBC3',
            },
            '::placeholder': {
              color: '#7FCBC3'
            }
          }
        }
      }
    }
  },
  styles: {
    global: {
      '*': {
        fontFamily: 'heading'
      }
    }
  },
  fonts: {
    heading: '"Red Hat Display", sans-serif',
  }
});

export default theme;
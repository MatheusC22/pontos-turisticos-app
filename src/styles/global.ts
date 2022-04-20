// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            border: "0px solid",
            borderRadius: "0",
            borderBottom: "2px solid",
            borderBottomColor: "primaryApp.300",
            paddingStart: "2",
            _hover: {
              borderBottomColor: "primaryApp.400",
            },
            _focus: {
              boxShadow: "none",
              borderBottomColor: "primaryApp.400",
            },
            "::placeholder": {
              color: "primaryApp.400",
            },
            _invalid: {
              borderBottomColor: "red",
              boxShadow: `0`,
              "::placeholder": {
                color: "red",
              },
            },
          },
        },
      },
    },
  },
  styles: {
    global: {
      "*": {
        fontFamily: "heading",
      },
    },
  },
  fonts: {
    heading: '"Red Hat Display", sans-serif',
  },
  colors: {
    primaryApp: {
      50: "#e2fbf7",
      100: "#c4eae7",
      200: "#a2dad5",
      300: "#80cbc4",
      400: "#5fbdb3",
      500: "#45a399",
      600: "#347f77",
      700: "#225b55",
      800: "#0e3733",
      900: "#001512",
    },
  },
});

export default theme;

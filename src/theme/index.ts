import { extendTheme } from "@chakra-ui/react";
import SearchHeader from "./searchHeader";

const theme = extendTheme({
  components: {
    SearchHeader,
  },
});

export default theme;

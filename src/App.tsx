import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./App.css";
import MoviesProvider from "./context/MoviesProvider";
import ScreenWrapper from "./components/ScreenWrapper";

const theme = createTheme({
  headings: {
    fontFamily: "Georgia, serif",
  },
  components: {
    Tooltip: {
      defaultProps: {
        radius: 10,
      },
    },
  },
});

function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Notifications />
      <ModalsProvider modalProps={{ centered: true }}>
        <MoviesProvider>
          <ScreenWrapper />
        </MoviesProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;

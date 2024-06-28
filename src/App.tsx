import {
  Badge,
  Button,
  createTheme,
  MantineProvider,
  MultiSelect,
  Select,
} from "@mantine/core";
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
    Select: Select.extend({
      styles: {
        label: { color: "#ff5047", fontWeight: "bold" },
        option: { color: "#ff5047", fontWeight: "bold" },
        input: { color: "#ff5047", fontWeight: "bold" },
      },
    }),
    MultiSelect: MultiSelect.extend({
      styles: {
        label: { color: "#ff5047" },
        option: { color: "#ff5047", fontWeight: "bold" },
        pill: { color: "#ff5047", fontWeight: "bold" },
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        color: "#ff5047",
      },
    }),
    Button: Button.extend({
      defaultProps: {
        color: "#ff5047",
      },
    }),
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

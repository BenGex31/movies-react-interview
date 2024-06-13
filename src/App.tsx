import { useEffect, useState } from "react";
import {
  createTheme,
  Grid,
  LoadingOverlay,
  MantineProvider,
} from "@mantine/core";
import { MovieCard } from "./components/movie-card/MovieCard";
import "@mantine/core/styles.css";
import "./App.css";
import { movies$ } from "./movies/movies";
import { Movie } from "./types";

const theme = createTheme({
  headings: {
    fontFamily: "Georgia, serif",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
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
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    movies$.then((movies) => setMovies(movies));
  }, []);

  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <LoadingOverlay
        visible={movies.length === 0}
        overlayProps={{ blur: 2 }}
        loaderProps={{ type: "bars" }}
      />
      <Grid>
        {movies.map((movie) => (
          <Grid.Col
            key={`movie-${movie.id}`}
            span={{ base: 12, sm: 6, md: 4, lg: 2 }}
          >
            <MovieCard movie={movie} />
          </Grid.Col>
        ))}
      </Grid>
    </MantineProvider>
  );
}

export default App;

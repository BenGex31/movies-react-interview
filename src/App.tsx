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
      <Grid p={"sm"}>
        {movies.map((movie) => (
          <Grid.Col
            key={`movie-${movie.id}-${movie.title.toLowerCase()}`}
            span={{ base: 12, sm: 6, md: 4, lg: 3 }}
          >
            <MovieCard movie={movie} />
          </Grid.Col>
        ))}
      </Grid>
    </MantineProvider>
  );
}

export default App;

import { Container, Grid, LoadingOverlay } from "@mantine/core";
import { useMovies } from "../context/MoviesProvider";
import { MovieCard } from "./movie-card/MovieCard";

export default function ScreenWrapper() {
  const { movies } = useMovies();
  return (
    <Container fluid>
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
    </Container>
  );
}

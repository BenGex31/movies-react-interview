import {
  Center,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  Space,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useMovies } from "../context/MoviesProvider";
import { MovieCard } from "./movie-card/MovieCard";
import MoviesHeader from "./movies-header/MoviesHeader";
import { useEffect, useState } from "react";
import { movies$ } from "../movies/movies";
import { Movie } from "../types";
import { IconMovieOff } from "@tabler/icons-react";

export default function ScreenWrapper() {
  const theme = useMantineTheme();
  const { movies } = useMovies();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectData, setSelectData] = useState<string[]>([]);

  useEffect(() => {
    movies$.then((movies) => {
      const categories: string[] = movies.map((movie: Movie) => movie.category);
      const uniqueCategories = categories.filter(
        (item, index) => categories.indexOf(item) === index
      );
      setSelectedCategories(uniqueCategories);
      setSelectData(uniqueCategories);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filterByCategory() {
    if (selectedCategories.length === 0) {
      return movies;
    }
    return movies.filter((movie) =>
      selectedCategories.includes(movie.category)
    );
  }

  return (
    <Container fluid>
      <LoadingOverlay
        visible={movies.length === 0}
        overlayProps={{ blur: 2 }}
        loaderProps={{ type: "bars" }}
      />
      <Space h="md" />
      <MoviesHeader
        selectData={selectData}
        setSelectedCategories={setSelectedCategories}
      />
      <Space h="xl" />
      {filterByCategory().length > 0 ? (
        <Grid>
          {filterByCategory().map((movie) => (
            <Grid.Col
              key={`movie-${movie.id}-${movie.title.toLowerCase()}`}
              span={{ base: 12, sm: 6, md: 4, lg: 3 }}
            >
              <MovieCard movie={movie} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Center>
          <Group>
            <Title c={"dimmed"}>No movie...</Title>
            <IconMovieOff
              style={{ width: rem(40), height: rem(40) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          </Group>
        </Center>
      )}
    </Container>
  );
}

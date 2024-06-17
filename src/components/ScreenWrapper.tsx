import {
  Center,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  Space,
  Title,
  rem,
  Pagination,
  Select,
  Stack,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useMovies } from "../context/MoviesProvider";
import { MovieCard } from "./movie-card/MovieCard";
import MoviesHeader from "./movies-header/MoviesHeader";
import { useMemo, useState } from "react";
import { Movie } from "../types";
import { IconMovieOff } from "@tabler/icons-react";

interface PaginationWrapperProps<T> {
  itemsPerPage: number;
  data: T[];
  render: (data: T[]) => React.ReactNode;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

function PaginationWrapper<T>({
  itemsPerPage,
  data,
  render,
  onItemsPerPageChange,
}: PaginationWrapperProps<T>) {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pagination = usePagination({ total: totalPages, initialPage: 1 });
  const startIndex = (pagination.active - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <Stack gap={"xl"}>
      <Group align="flex-end" justify="space-evenly" gap={"xl"}>
        <Select
          label="Movies per page"
          value={itemsPerPage.toString()}
          onChange={(value) => onItemsPerPageChange(Number(value))}
          data={[
            { value: "4", label: "4" },
            { value: "8", label: "8" },
            { value: "12", label: "12" },
          ]}
        />
        <Pagination
          total={totalPages}
          value={pagination.active}
          onChange={pagination.setPage}
          color="#ff5047"
        />
      </Group>
      {render(currentData)}
    </Stack>
  );
}

export default function ScreenWrapper() {
  const { movies } = useMovies();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const selectData = useMemo(() => {
    const categories: string[] = movies.map((movie: Movie) => movie.category);
    const uniqueCategories = categories.filter(
      (item, index) => categories.indexOf(item) === index
    );
    return uniqueCategories;
  }, [movies]);

  function filterByCategory(): Movie[] {
    if (selectedCategories.length === 0) {
      return movies;
    }
    return movies.filter((movie) =>
      selectedCategories.includes(movie.category)
    );
  }

  const filteredMovies = filterByCategory();

  return (
    <Container fluid>
      <LoadingOverlay
        visible={movies.length === 0}
        overlayProps={{ blur: 2 }}
        loaderProps={{ type: "bars", color: "#ff5047" }}
      />
      <Space h="md" />
      <MoviesHeader
        selectData={selectData}
        setSelectedCategories={setSelectedCategories}
      />
      <Space h="xl" />
      {filteredMovies.length > 0 ? (
        <PaginationWrapper<Movie>
          itemsPerPage={itemsPerPage}
          data={filteredMovies}
          render={(currentData) => (
            <Grid>
              {currentData.map((movie) => (
                <Grid.Col
                  key={`movie-${movie.id}-${movie.title.toLowerCase()}`}
                  span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                >
                  <MovieCard movie={movie} />
                </Grid.Col>
              ))}
            </Grid>
          )}
          onItemsPerPageChange={setItemsPerPage}
        />
      ) : (
        <Center>
          <Group>
            <Title c={"dimmed"}>No movie...</Title>
            <IconMovieOff
              style={{ width: rem(40), height: rem(40) }}
              color={"#ff5047"}
              stroke={1.5}
            />
          </Group>
        </Center>
      )}
    </Container>
  );
}

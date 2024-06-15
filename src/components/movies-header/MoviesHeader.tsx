import { useDisclosure } from "@mantine/hooks";
import { Burger, Group, MultiSelect, Title } from "@mantine/core";
import classes from "./MoviesHeader.module.css";
import { useMemo } from "react";
import { Movie } from "../../types";
import { useMovies } from "../../context/MoviesProvider";

export default function MoviesHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const { movies } = useMovies();

  const selectData = useMemo(() => {
    const categories = movies.map((movie: Movie) => movie.category);
    const uniqueCategories = categories.filter(
      (item, index) => categories.indexOf(item) === index
    );
    return uniqueCategories;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Title size={"h1"} className={classes.title}>
            Movies list
          </Title>
        </Group>

        <MultiSelect
          data={selectData}
          label="Search"
          placeholder="Choose categories"
          searchable
        />
      </div>
    </header>
  );
}

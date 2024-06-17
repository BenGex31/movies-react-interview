import { MultiSelect, Title, Grid } from "@mantine/core";
import classes from "./MoviesHeader.module.css";

type Props = {
  selectData: string[];
  setSelectedCategories: ((value: string[]) => void) | undefined;
};

export default function MoviesHeader({
  selectData,
  setSelectedCategories,
}: Props) {
  return (
    <header className={classes.header}>
      <Grid justify="space-evenly" align="flex-end">
        <Grid.Col span={{ base: 8, md: 4 }}>
          <Title size={"h1"} className={classes.title}>
            Movies list
          </Title>
        </Grid.Col>

        <Grid.Col span={{ base: 8, md: 4 }}>
          <MultiSelect
            data={selectData}
            placeholder="Choose categories"
            searchable
            onChange={setSelectedCategories}
          />
        </Grid.Col>
      </Grid>
    </header>
  );
}

import { MultiSelect, Title, Grid, Group, Image } from "@mantine/core";
import classes from "./MoviesHeader.module.css";
import logo from "../../images/logo.png";

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
          <Group>
            <Image src={logo} width={50} height={50} />
            <Title size={"h1"} className={classes.title}>
              Particeep Movies list
            </Title>
          </Group>
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

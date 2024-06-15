import { useDisclosure } from "@mantine/hooks";
import { Burger, Group, MultiSelect, Title } from "@mantine/core";
import classes from "./MoviesHeader.module.css";

type Props = {
  selectData: string[];
  setSelectedCategories: ((value: string[]) => void) | undefined;
};

export default function MoviesHeader({
  selectData,
  setSelectedCategories,
}: Props) {
  const [opened, { toggle }] = useDisclosure(false);

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
          onChange={setSelectedCategories}
        />
      </div>
    </header>
  );
}

import {
  Card,
  Image,
  Group,
  Text,
  Avatar,
  Badge,
  ActionIcon,
  rem,
  useMantineTheme,
  Tooltip,
} from "@mantine/core";
import classes from "./MovieCard.module.css";
import { Movie } from "../../types";
import MovieGauge from "../MovieGauge";
import { IconTrashFilled } from "@tabler/icons-react";

type Props = {
  movie: Movie;
};

export function MovieCard({ movie }: Props) {
  const theme = useMantineTheme();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
          alt="Top 50 underrated plants for house decoration"
          height={180}
        />
      </Card.Section>

      <Group justify="space-between">
        <Badge w="fit-content" variant="light">
          {movie.category}
        </Badge>
        <Tooltip
          label="Delete"
          withArrow
          color={theme.colors.red[6]}
          position="left"
        >
          <ActionIcon variant="subtle" color="gray">
            <IconTrashFilled
              style={{ width: rem(20), height: rem(20) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Text fw={700} className={classes.title} mt="xs">
        {movie.title}
      </Text>

      <Group mt="lg">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
          radius="sm"
        />
        <div>
          <Text fw={500}>Elsa Gardenowl</Text>
          <Text fz="xs" c="dimmed">
            posted 34 minutes ago
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {`${movie.likes} people liked this movie`}
          </Text>
          <MovieGauge likes={movie.likes} dislikes={movie.dislikes} />
        </Group>
      </Card.Section>
    </Card>
  );
}

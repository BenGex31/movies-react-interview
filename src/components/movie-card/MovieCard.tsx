import {
  Card,
  Image,
  Group,
  Text,
  Badge,
  ActionIcon,
  rem,
  useMantineTheme,
  Tooltip,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import classes from "./MovieCard.module.css";
import { Movie } from "../../types";
import MovieGauge from "../MovieGauge";
import { IconCheck, IconTrashFilled, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useMovies } from "../../context/MoviesProvider";
import movieMakingOffImg from "../../images/movie-making-off.jpg";

type Props = {
  movie: Movie;
};

export function MovieCard({ movie }: Props) {
  const theme = useMantineTheme();
  const { movies, setMovies } = useMovies();

  function handleOpenDeleteMovieModal(id: string, title: string): void {
    modals.openConfirmModal({
      modalId: `confirm-delete-movie-${id}-modal`,
      title: <Title size={"h3"}>{title}</Title>,
      children: (
        <Text c={"dimmed"} fz={"sm"} fw={"bold"}>
          Confirm deletion ?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      withCloseButton: false,
      onConfirm: () => handleDeleteMovie(id),
    });
  }

  function handleDeleteMovie(id: string): void {
    const _movies = [...movies];
    const findMovieIndex = _movies.findIndex((movie) => movie.id === id);
    if (findMovieIndex !== -1) {
      _movies.splice(findMovieIndex, 1);
      setMovies(_movies);
      showNotification({
        id: `delete-movie-${id}-notification`,
        title: "Success",
        message: "Movie deleted !",
        color: theme.colors.green[8],
        icon: <IconCheck />,
      });
    } else {
      showNotification({
        id: `delete-movie-${id}-notification`,
        title: "Error",
        message: "An error has occurred !",
        color: theme.colors.red[8],
        icon: <IconX />,
      });
    }
  }

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      shadow="xs"
      className={classes.card}
    >
      <Card.Section mb="sm">
        <Image
          src={movieMakingOffImg}
          alt={`movie-${movie.title}`}
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
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => handleOpenDeleteMovieModal(movie.id, movie.title)}
          >
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

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {`${movie.likes} people liked this movie`}
          </Text>
          <MovieGauge movie={movie} />
        </Group>
      </Card.Section>
    </Card>
  );
}

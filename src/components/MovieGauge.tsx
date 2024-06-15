import {
  ActionIcon,
  Group,
  useMantineTheme,
  rem,
  Tooltip,
} from "@mantine/core";
import {
  IconThumbUpFilled,
  IconThumbDownFilled,
  IconUsers,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { useMovies } from "../context/MoviesProvider";
import { Movie } from "../types";

type Props = {
  movie: Movie;
};

export default function MovieGauge({ movie }: Props) {
  const theme = useMantineTheme();
  const { movies, setMovies } = useMovies();

  function tooltipLabel(number: number): ReactNode {
    return (
      <Group gap={"xs"}>
        <IconUsers stroke={2} style={{ width: rem(15), height: rem(15) }} />
        {number}
      </Group>
    );
  }

  function handleLikeMovieClick(isLikes: boolean): void {
    const _movies = [...movies];
    const findMovieIndex = _movies.findIndex(
      (_movie) => _movie.id === movie.id
    );
    if (findMovieIndex !== -1) {
      const { likes } = _movies[findMovieIndex];
      const { dislikes } = _movies[findMovieIndex];

      if (isLikes) {
        _movies[findMovieIndex].likes = likes + 1;

        if (_movies[findMovieIndex].disableDislike) {
          if (_movies[findMovieIndex].dislikes === 0) {
            _movies[findMovieIndex].dislikes = 0;
          } else {
            _movies[findMovieIndex].dislikes = dislikes - 1;
          }
        }

        _movies[findMovieIndex].disableLike = true;
        _movies[findMovieIndex].disableDislike = false;
      } else {
        _movies[findMovieIndex].dislikes = dislikes + 1;
        if (_movies[findMovieIndex].disableLike) {
          if (_movies[findMovieIndex].likes === 0) {
            _movies[findMovieIndex].likes = 0;
          } else {
            _movies[findMovieIndex].likes = likes - 1;
          }
        }

        _movies[findMovieIndex].disableDislike = true;
        _movies[findMovieIndex].disableLike = false;
      }
      setMovies(_movies);
    }
  }

  return (
    <Group gap={"xs"}>
      <Tooltip
        label={tooltipLabel(movie.likes)}
        withArrow
        color={theme.colors.green[8]}
      >
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => handleLikeMovieClick(true)}
          disabled={movie.disableLike}
        >
          <IconThumbUpFilled
            style={{ width: rem(20), height: rem(20) }}
            color={theme.colors.green[8]}
            stroke={1.5}
          />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label={tooltipLabel(movie.dislikes)}
        withArrow
        color={theme.colors.red[8]}
      >
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => handleLikeMovieClick(false)}
          disabled={movie.disableDislike}
        >
          <IconThumbDownFilled
            style={{ width: rem(20), height: rem(20) }}
            color={theme.colors.red[8]}
            stroke={1.5}
          />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

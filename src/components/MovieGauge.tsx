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

type Props = {
  likes: number;
  dislikes: number;
};

export default function MovieGauge({ likes, dislikes }: Props) {
  const theme = useMantineTheme();

  function tooltipLabel(number: number): ReactNode {
    return (
      <Group gap={"xs"}>
        <IconUsers stroke={2} style={{ width: rem(15), height: rem(15) }} />
        {number}
      </Group>
    );
  }

  return (
    <Group gap={"xs"}>
      <Tooltip
        label={tooltipLabel(likes)}
        withArrow
        color={theme.colors.green[8]}
      >
        <ActionIcon variant="subtle" color="gray">
          <IconThumbUpFilled
            style={{ width: rem(20), height: rem(20) }}
            color={theme.colors.green[8]}
            stroke={1.5}
          />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label={tooltipLabel(dislikes)}
        withArrow
        color={theme.colors.red[8]}
      >
        <ActionIcon variant="subtle" color="gray">
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

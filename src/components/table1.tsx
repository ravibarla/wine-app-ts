import React, { useState } from "react";
import cx from "clsx";
import { Table, ScrollArea } from "@mantine/core";
import classes from "./table1.module.css";

interface StatsData {
  id: string;
  mean: string;
  median: string;
  mode: string;
}

interface Table1Props {
  stats: StatsData[];
}

const Table1: React.FC<Table1Props> = ({ stats }) => {
  const [scrolled, setScrolled] = useState(false);

  const rows = stats.map((row, i) => (
    <Table.Tr key={i}>
      {i === 0 && <Table.Td>Flavonoids Mean</Table.Td>}
      {i === 1 && <Table.Td>Flavonoids Median</Table.Td>}
      {i === 2 && <Table.Td>Flavonoids Mode</Table.Td>}
      <Table.Td>{row.mean}</Table.Td>
      <Table.Td>{row.median}</Table.Td>
      <Table.Td>{row.mode}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700}>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th>Measures</Table.Th>
            {stats.map((data, index) => (
              <Table.Th key={index}>{data.id}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default Table1;

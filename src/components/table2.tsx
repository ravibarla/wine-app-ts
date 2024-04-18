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

interface Table2Props {
  gammaStats: StatsData[];
}

const Table2: React.FC<Table2Props> = ({ gammaStats: stats }) => {
  const [scrolled, setScrolled] = useState(false);

  const rows = stats.map((row, i) => (
    <Table.Tr key={i}>
      {i === 0 && <Table.Td>Gamma Mean</Table.Td>}
      {i === 1 && <Table.Td>Gamma Median</Table.Td>}
      {i === 2 && <Table.Td>Gamma Mode</Table.Td>}
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

export default Table2;

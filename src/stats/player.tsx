import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import styled from "styled-components";
import { PlayerStatKeys, PlayerStatName } from "./types";
import { usePlayerStats } from "./utils";

const PlayerStatsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

const PlayerStatsTitle = styled.h1`
  text-align: center;
`;

const PlayerStatOptions = styled.select`
  border: none;

  border-radius: 8px;
  background-color: white;

  margin: auto;
  padding: 0.5em;

  color: black;

  font-family: ui-monospace monospace Cascadia Consolas;
  font-weight: bold;
  font-size: 1.25em;
`;

function PlayerStats() {
  const [statName, setStatName] = useState<PlayerStatKeys>("crit");
  const stats = usePlayerStats(statName);

  return (
    <PlayerStatsDiv>
      <PlayerStatsTitle>플레이어 능력치 통계</PlayerStatsTitle>
      <PlayerStatOptions
        value={statName}
        onChange={({
          target: { value },
        }: {
          target: { value: PlayerStatKeys };
        }) => setStatName(value)}
      >
        {Object.keys(PlayerStatName)
          .filter(
            (key) => !key.endsWith("AtkBase") && !key.endsWith("AtkDefault")
          )
          .map((key) => (
            <option value={key}>
              {PlayerStatName[key as PlayerStatKeys].replace(/\([^)]+\)$/, "")}
            </option>
          ))}
      </PlayerStatOptions>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: "area",
            inverted: false,

            width: 600,
            style: {
              margin: "auto",
              "max-width": "100%",
              fontFamily: "NanumSquareRound, sans-serif",
            },
          },
          title: {
            text: `${PlayerStatName[statName].replace(/\([^)]+\)$/, "")} 통계`,
          },
          tooltip: {
            headerFormat: "<b>{point.key:.0f}%</b><br>",
            pointFormat: "{point.y:.0f}",
          },
          yAxis: {
            labels: {
              format: "{text}",
            },
            title: {
              text: PlayerStatName[statName],
            },
          },
          plotOptions: {
            area: {
              fillOpacity: 0.5,
            },
          },
          series: stats,
        }}
      />
    </PlayerStatsDiv>
  );
}

export default PlayerStats;

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";
import { useEquipmentStats } from "./utils";

const EquipStatsDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const EquipStatsTitle = styled.h1`
  text-align: center;
`;

function EquipStats() {
  const stats = useEquipmentStats();

  return (
    <EquipStatsDiv>
      <EquipStatsTitle>장비 공격력 통계</EquipStatsTitle>
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

            zooming: {
              type: "xy",
            },
          },
          title: {
            text: `장비 공격력 통계`,
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
              text: "장비 공격력",
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
    </EquipStatsDiv>
  );
}

export default EquipStats;

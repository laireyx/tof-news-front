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

const EquipChartContainer = styled.div`
  @media (min-width: 768px) {
    max-width: 600px;
    margin: auto;
  }
`;

function EquipStats() {
  const stats = useEquipmentStats();

  return (
    <EquipStatsDiv>
      <EquipStatsTitle>장비 공격력 통계</EquipStatsTitle>
      <EquipChartContainer>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "area",
              inverted: false,

              style: {
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
      </EquipChartContainer>
    </EquipStatsDiv>
  );
}

export default EquipStats;

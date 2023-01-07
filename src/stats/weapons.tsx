import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";
import { useWeaponStats } from "./utils";

const WeaponStatsDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const WeaponStatsTitle = styled.h1`
  text-align: center;
`;

function WeaponStats() {
  const stats = useWeaponStats();

  return (
    <WeaponStatsDiv>
      <WeaponStatsTitle>무기 조합 통계</WeaponStatsTitle>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",

            width: 600,
            style: {
              margin: "auto",
              "max-width": "100%",
              fontFamily: "NanumSquareRound, sans-serif",
            },
          },
          title: { text: "무기 조합 통계" },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              },
            },
          },
          tooltip: {
            pointFormat: "<b>{point.percentage:.1f}%</b>",
          },
          series: [{ name: "무기 조합", colorByPoint: true, data: stats }],
        }}
      />
    </WeaponStatsDiv>
  );
}

export default WeaponStats;

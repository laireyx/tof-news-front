import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";
import { useWeaponStats } from "./utils";

const WeaponStatsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

function WeaponStats() {
  const stats = useWeaponStats();

  return (
    <WeaponStatsDiv>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
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

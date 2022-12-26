import styled from "styled-components";
import { useStats } from "./utils";

const StatsDiv = styled.div`
  flex-grow: 1;

  border-radius: 8px;
  background-color: #eeeeeedd;

  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 12px;
  padding: 12px;
`;

const WeaponImage = styled.img`
  width: 128px;
  height: 128px;
  mix-blend-mode: multiply;
`;

function Stats() {
  const stats = useStats();

  return (
    <StatsDiv>
      Under construction
      {stats.slice(1, 11).map(([weaponNames, count], idx) => {
        const weapons = weaponNames.map((name) => (
          <WeaponImage src={`/img_weapon/${name}.webp`} />
        ));

        return (
          <div key={idx}>
            {weapons} : {count}
          </div>
        );
      })}
    </StatsDiv>
  );
}

export default Stats;
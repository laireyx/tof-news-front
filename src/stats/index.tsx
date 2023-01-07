import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import PlayerStats from "./player";
import WeaponStats from "./weapons";

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

function StatsNavigation() {
  return (
    <>
      <Link to="weapons">무기 통계</Link>
      <Link to="player">플레이어 통계</Link>
    </>
  );
}

function Stats() {
  return (
    <StatsDiv>
      <Routes>
        <Route path="/" element={<StatsNavigation />} />
        <Route path="/weapons" element={<WeaponStats />} />
        <Route path="/player" element={<PlayerStats />} />
      </Routes>
    </StatsDiv>
  );
}

export default Stats;

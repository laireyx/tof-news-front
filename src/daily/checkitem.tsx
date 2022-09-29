import styled from "styled-components";
import { dateInfo } from "../common/utils";
import { Routine } from "./types";
import { calcPeriod, isFinished } from "./utils";
import dailyIcon from "../assets/daily.svg";
import resetIcon from "../assets/reset.svg";
import "./checkitem.css";

const CheckItemDiv = styled.div`
  border-radius: 8px;
  background-color: #eeeeeedd;
  padding: 1em;
  flex-basis: calc(50% - 2em - 8px);

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1 1 content;
  }
`;

const Category = styled.span`
  padding-right: 0.5em;
  vertical-align: top;
  font-size: 1.5em;
  font-weight: bold;
  font-family: "Dongle", sans-serif;
`;
const RoutineName = styled.span<{ active: boolean }>`
  font-weight: bold;
  font-size: 2em;
  font-family: "Jua", sans-serif;
  ${({ active }) => active || "color: grey;"}
`;

const RoutineDescription = styled.p`
  font-size: 1.5em;
  font-family: "Dongle", sans-serif;
`;

const CheckIcon = styled.img`
  cursor: pointer;
  align-self: flex-end;
`;

function CheckItem({
  category,
  name,
  description,
  period,
  lastChecked = 0,
  update,
  reset,
}: Routine & { update: () => void; reset: () => void }) {
  const finished = isFinished({ lastChecked, period });
  return (
    <CheckItemDiv>
      <p>
        <Category>{category}</Category>
        <RoutineName active={!finished}>{name}</RoutineName>
      </p>
      <RoutineDescription>{description}</RoutineDescription>
      마지막 기록: {lastChecked ? dateInfo(new Date(lastChecked)) : "기록 없음"}
      {finished ? (
        <CheckIcon
          width="24"
          title="초기화"
          alt="초기화"
          src={resetIcon}
          onClick={() => reset()}
        />
      ) : (
        <CheckIcon
          width="24"
          title="체크"
          alt="체크"
          src={dailyIcon}
          onClick={() => update()}
        />
      )}
    </CheckItemDiv>
  );
}

export default CheckItem;

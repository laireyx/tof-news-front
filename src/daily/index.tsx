import styled from "styled-components";
import CheckItem from "./checkitem";
import { useRoutine } from "./utils";

const Routines = styled.div`
  flex-grow: 1;

  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: center;
  gap: 1em;
`;

function DailyRoutine() {
  const { routineState, update, reset } = useRoutine();

  console.log(routineState);

  return (
    <Routines>
      {routineState.map((routine, idx) => (
        <CheckItem
          key={routine.name}
          {...routine}
          update={() => update(idx)}
          reset={() => reset(idx)}
        />
      ))}
    </Routines>
  );
}

export default DailyRoutine;

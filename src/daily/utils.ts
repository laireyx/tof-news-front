import { useEffect } from "react";
import { useState } from "react";
import routines from "./routines.json";
import localforage from "localforage";
import { Routine } from "./types";
import { useCallback } from "react";

function calcPeriod(period: string) {
  let now = new Date();
  const today = now.getDay();

  if (period === "weekly") {
    now.setDate(now.getDate() - ((today + 6) % 7));
    now.setHours(5, 0, 0, 0);
  } else if (period === "daily") {
    if (now.getHours() < 5) now.setDate(now.getDate() - 1);
    now.setHours(5, 0, 0, 0);
  } else if (period.match(/^\d+d/)) {
    const matchResult = period.match(/^(\d+)d/);
    const intervalDays = parseInt(matchResult?.[1] ?? "0");

    now.setDate(now.getDate() - intervalDays);
  } else if (
    period.match(
      /^(mon|tue|wed|thu|fri|sat|sun)(\|(mon|tue|wed|thu|fri|sat|sun))*$/
    )
  ) {
    const dayTable = {
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
      sun: 0,
    };

    now =
      period
        .split("|")
        .map(
          (dayString) =>
            dayTable[
              dayString as "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
            ]
        )
        .map((dayNumber) => {
          const diff = (today - dayNumber + 7) % 7;
          const temp = new Date(now);
          temp.setDate(temp.getDate() - diff);
          temp.setHours(5, 0, 0, 0);
          return temp;
        })
        .filter((date) => date < now)
        .sort((a, b) => a.getDate() - b.getDate())
        .pop() ?? new Date();
  }

  return now;
}

function isFinished({
  lastChecked = 0,
  period,
}: {
  lastChecked?: number;
  period: string;
}) {
  const horizon = calcPeriod(period);
  const lastCheckedDate = new Date(lastChecked);

  return (
    (lastCheckedDate.getTime() - horizon.getTime()) *
      (Date.now() - horizon.getTime()) >=
    0
  );
}

function useRoutine() {
  const [routineState, setRoutineState] = useState<Routine[]>(routines);

  useEffect(() => {
    localforage.getItem<Routine[]>("tof:routine-state").then((savedState) => {
      setRoutineState(savedState ?? routines);
    });
  }, []);

  useEffect(() => {
    localforage.setItem("tof:routine-state", routineState);
  }, [routineState]);

  const update = useCallback(
    (idx: number) =>
      setRoutineState((oldState) => {
        oldState[idx].lastChecked = Date.now();
        return oldState
          .sort(
            (a, b) =>
              (isFinished(a) ? a.lastChecked ?? 0 : 0) -
              (isFinished(b) ? b.lastChecked ?? 0 : 0)
          )
          .slice();
      }),
    [routineState, setRoutineState]
  );

  const reset = useCallback(
    (idx: number) =>
      setRoutineState((oldState) => {
        oldState[idx].lastChecked = 0;
        return oldState
          .sort(
            (a, b) =>
              (isFinished(a) ? a.lastChecked ?? 0 : 0) -
              (isFinished(b) ? b.lastChecked ?? 0 : 0)
          )
          .slice();
      }),
    [routineState, setRoutineState]
  );

  return { routineState, update, reset };
}

export { calcPeriod, isFinished, useRoutine };

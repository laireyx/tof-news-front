const json = {
  time: "0.00",
  Dog: 123,
};

function SomeComponent({ key, val }: { key: any; val: any }) {
  return <></>;
}

Object.entries(json).flatMap(([key, value]) =>
  key !== "time" ? <SomeComponent key={key} val={value} /> : []
);

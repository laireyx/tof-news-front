import { useState } from "react";
import styled, { css } from "styled-components";

type OptionValues = {
  show: string | JSX.Element;
  value: string;
};

const OptionButton = styled.span<{ active: boolean }>`
  border-radius: 3em;

  padding: 0.5em 1em;

  color: black;
  background: white;

  user-select: none;

  ${({ active }) =>
    active &&
    css`
      color: white;
      background: navy;
    `}

  transition: 250ms;
  &:hover {
    color: white;
    background: navy;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  padding: 0.5em;
`;

function useRadio(options: OptionValues[]) {
  const [value, setValue] = useState(options[0]?.value);

  return {
    Radio: (
      <OptionWrapper>
        {options.map((option) => (
          <OptionButton
            key={option.value}
            active={value === option.value}
            onClick={() => setValue(option.value)}
          >
            {option.show}
          </OptionButton>
        ))}
      </OptionWrapper>
    ),
    value,
  };
}

export default useRadio;

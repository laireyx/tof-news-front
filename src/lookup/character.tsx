import styled from "styled-components";
import { LookupResponse } from "./types";

const CategoryTitle = styled.h1``;

const CharacterSheetDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

function CharacterSheet({ resp }: { resp: LookupResponse }) {
  return (
    <CharacterSheetDiv>
      <CategoryTitle>이름</CategoryTitle>
      {resp?.data?.name}
      <CategoryTitle>무기</CategoryTitle>
      {resp.data?.data?.weapons.map(({ level, name, stars }) => (
        <div>
          <img src={`/img_weapon/${name}.webp`} />
          {level}LV / ★{stars}
        </div>
      ))}
      <CategoryTitle>장비</CategoryTitle>
      {resp.data?.data?.equipments.map(({ level, options, part, stars }) => (
        <div>
          {part} | +{level} / ★{stars}
          <br />
          {options.map(({ amount, type }) => `${type} + ${amount}`)}
        </div>
      ))}
    </CharacterSheetDiv>
  );
}
export default CharacterSheet;

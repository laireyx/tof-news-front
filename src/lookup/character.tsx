import styled from "styled-components";
import { EquipmentStat, LookupResponse, WeaponStat } from "./types";
import { optionText, parsePart } from "./utils";

const CategoryTitle = styled.h1``;

const CharacterSheetDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const MountIconDiv = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
`;

const MountImage = styled.img`
  width: 128px;
  height: 128px;
`;

function MountIcon({ src, label }: { src: string; label: string }) {
  return (
    <MountIconDiv>
      <MountImage src={src} />
      {label}
    </MountIconDiv>
  );
}

const WeaponGalleryDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const WeaponFrameDiv = styled.div`
  text-align: center;
`;

function WeaponGallery({ weapons }: { weapons?: WeaponStat[] }) {
  return (
    <WeaponGalleryDiv>
      {weapons?.map(({ name, stars, level }) => (
        <WeaponFrameDiv>
          <MountIcon
            src={`/img_weapon/${name}.webp`}
            label={`${level}LV / ★${stars}`}
          />
        </WeaponFrameDiv>
      ))}
    </WeaponGalleryDiv>
  );
}

const EquipmentGalleryDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EquipmentFrame = styled.div``;

const EquipmentOptionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const OptionIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const OptionValue = styled.span``;

function EquipmentGallery({ equipments }: { equipments?: EquipmentStat[] }) {
  return (
    <EquipmentGalleryDiv>
      {equipments?.map(({ level, options, part, stars }) => (
        <EquipmentFrame>
          <MountIcon
            src={`/img/equip/part/${parsePart(part)}.webp`}
            label={`+${level} / ★${stars}`}
          />

          <EquipmentOptionInfo>
            {options.map(({ element, value, adjust, amount }) => (
              <div>
                {value && <OptionIcon src={`/img/equip/value/${value}.webp`} />}
                {["Fire", "Ice", "Phy", "Thunder", "Superpower"].includes(
                  element ?? ""
                ) && <OptionIcon src={`/img/equip/element/${element}.webp`} />}
                +
                <OptionValue>
                  {optionText({ value, adjust, amount })}
                </OptionValue>
              </div>
            ))}
          </EquipmentOptionInfo>
        </EquipmentFrame>
      ))}
    </EquipmentGalleryDiv>
  );
}

function CharacterSheet({ resp }: { resp: LookupResponse }) {
  return (
    <CharacterSheetDiv>
      <CategoryTitle>플레이어 정보</CategoryTitle>
      Lv.{resp?.data?.level} {resp?.data?.name}
      <br />
      Guild [{resp?.data?.guildName}] / GS {resp?.data?.battleStrength}
      <br />
      UID {resp?.data?.uid} / {resp?.data?.inGameUid}
      <br />
      <CategoryTitle>무기</CategoryTitle>
      <WeaponGallery weapons={resp?.data?.data.weapons} />
      <CategoryTitle>장비</CategoryTitle>
      <EquipmentGallery equipments={resp?.data?.data.equipments} />
    </CharacterSheetDiv>
  );
}
export default CharacterSheet;

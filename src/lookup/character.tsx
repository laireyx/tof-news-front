import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { EquipmentStat, LookupResponse, WeaponStat } from "./types";
import { copyNametag, drawNametag, optionText, parsePart } from "./utils";

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
            src={`/img/weapon/${name}.webp`}
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

const Nametag = styled.canvas`
  aspect-ratio: 9 / 5;
  max-width: min(100%, 450px);
`;

const NametagButton = styled.button`
  border: none;
  background: inherit;

  display: inline;
  width: fit-content;

  text-align: left;
  cursor: pointer;
`;

function CharacterSheet({ resp }: { resp: LookupResponse }) {
  const nametag = useRef<HTMLCanvasElement>(null);
  const [avatarIdx, setAvatarIdx] = useState(0);

  useEffect(() => {
    if (nametag.current && resp.data) {
      drawNametag(nametag.current, resp.data, avatarIdx);
    }
  }, [resp, nametag, avatarIdx]);

  return (
    <CharacterSheetDiv>
      <CategoryTitle>플레이어 정보</CategoryTitle>
      <Nametag ref={nametag} width="900" height="500" />
      <div>
        <NametagButton onClick={() => setAvatarIdx((avatarIdx + 104) % 105)}>
          [이전]
        </NametagButton>

        <NametagButton onClick={() => copyNametag(nametag.current)}>
          [복사]
        </NametagButton>
        <NametagButton onClick={() => setAvatarIdx((avatarIdx + 1) % 105)}>
          [다음]
        </NametagButton>
      </div>
      <CategoryTitle>무기</CategoryTitle>
      <WeaponGallery weapons={resp?.data?.data.weapons} />
      <CategoryTitle>장비</CategoryTitle>
      <EquipmentGallery equipments={resp?.data?.data.equipments} />
    </CharacterSheetDiv>
  );
}
export default CharacterSheet;

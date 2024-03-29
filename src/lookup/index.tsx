import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CharacterSheet from "./character";
import { LookupResponse } from "./types";
import { lookup } from "./utils";

const LookupDialogDiv = styled.div`
  flex-grow: 1;

  border-radius: 8px;
  background-color: #eeeeeedd;

  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 12px;
  padding: 12px;
`;

const Announcement = styled.h2`
  text-align: center;
`;

const LookupSearchDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const LookupOptions = styled.select`
  border: none;

  border-radius: 8px;
  background-color: white;

  padding: 0.5em;

  color: black;

  font-family: ui-monospace monospace Cascadia Consolas;
  font-weight: bold;
  font-size: 1.25em;
`;

const LookupInput = styled.input`
  border: none;

  border-radius: 8px;
  background-color: white;

  padding: 0.5em;

  color: black;

  font-family: ui-monospace monospace Cascadia Consolas;
  font-weight: bold;
  font-size: 1.25em;
  width: 15ch;
`;

const SearchButton = styled.button`
  border: none;
  border-radius: 8px;

  flex-grow: 1;

  background-color: black;
  cursor: pointer;

  padding: 0.5em;

  color: white;

  font-family: ui-monospace monospace Cascadia Consolas;
  font-weight: bold;
  font-size: 1.25em;
`;

function Lookup() {
  const [server, setServer] = useState("102");
  const [option, setOption] = useState("name");
  const [uid, setUid] = useState(useParams().uid ?? "");
  const [resp, setResp] = useState<LookupResponse>({});

  return (
    <LookupDialogDiv>
      <LookupSearchDiv>
        <LookupOptions
          value={server}
          onChange={({ target: { value } }: { target: { value: string } }) =>
            setServer(value)
          }
        >
          <option value="102" default>
            뱅기스
          </option>
          <option value="101">아스트라</option>
        </LookupOptions>
        <LookupOptions
          value={option}
          onChange={({ target: { value } }: { target: { value: string } }) =>
            setOption(value)
          }
        >
          <option value="name" default>
            닉네임
          </option>
          <option value="uid">UID</option>
        </LookupOptions>
        <LookupInput
          placeholder="UID or Nickname"
          value={uid}
          onChange={({ target: { value } }: { target: { value: string } }) =>
            setUid(value)
          }
        />
        <SearchButton
          onClick={() =>
            lookup(option, uid, server)
              .then(setResp)
              .catch(() => alert("UID 오류 또는 조회 오류가 발생했습니다."))
          }
        >
          검색
        </SearchButton>
      </LookupSearchDiv>

      {resp.queued ? (
        <p>
          현재 다음 중 하나의 상황입니다.
          <br />
          1. 올바른 요청이었지만 아직 서버에 정보가 없습니다. 현재 조회중이니
          다시 시도해주세요.
          <br />
          2. 닉네임 또는 UID에 문제가 있어서 정보를 받아올 수 없습니다.
        </p>
      ) : (
        resp.data && <CharacterSheet resp={resp} />
      )}
    </LookupDialogDiv>
  );
}

export default Lookup;

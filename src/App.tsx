import TofNews from "./news";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import newsIcon from "./assets/news.svg";
import dailyIcon from "./assets/daily.svg";
import DailyRoutine from "./daily";

const AppDiv = styled.div`
  padding: 2rem;

  height: calc(100vh - 4rem);

  background: #000000aa;
  overflow: auto;
  scrollbar-width: none;

  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavigationBar = styled.div`
  position: absolute;

  left: 0;
  top: 0;

  padding: 1em;

  box-sizing: border-box;

  height: 100vh;
  background: #000000aa;

  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;

  z-index: 999;

  @media (max-width: 1280px) {
    top: unset;
    bottom: 0;

    height: unset;
    width: 100vw;
    flex-direction: row;
  }
`;

const FooterDiv = styled.div`
  line-height: 128px;
`;

const LinkIcon = styled.img<{ active: boolean }>`
  filter: invert();

  ${({ active }) =>
    active &&
    "filter: invert(14%) sepia(70%) saturate(4870%) hue-rotate(240deg) brightness(58%) contrast(137%) drop-shadow(0px 0px 8px white);"}
`;

function Navigation() {
  const loc = useLocation();
  return (
    <NavigationBar>
      <Link to="/">
        <LinkIcon active={loc.pathname === "/"} width="48" src={newsIcon} />
      </Link>
      <Link to="/daily">
        <LinkIcon
          active={loc.pathname === "/daily"}
          width="48"
          src={dailyIcon}
        />
      </Link>
    </NavigationBar>
  );
}

function App() {
  return (
    <AppDiv>
      <h1 className="title">Tower of Fantasy News</h1>
      <HashRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<TofNews />} />
          <Route path="/daily" element={<DailyRoutine />} />
        </Routes>
      </HashRouter>
      <FooterDiv>&nbsp;</FooterDiv>
    </AppDiv>
  );
}

export default App;

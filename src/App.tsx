import TofNews from "./news";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import newsIcon from "./assets/news.svg";
import dailyIcon from "./assets/daily.svg";
import lookupIcon from "./assets/search.svg";
import statsIcon from "./assets/stats.svg";
import DailyRoutine from "./daily";
import Lookup from "./lookup";
import Stats from "./stats";

const AppDiv = styled.div`
  padding: 2rem;

  flex: 1;

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
  bottom: 0;

  padding: 1em;

  box-sizing: border-box;

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
      <Link to="/lookup">
        <LinkIcon
          active={loc.pathname === "/lookup"}
          width="48"
          src={lookupIcon}
        />
      </Link>
      <Link to="/stats">
        <LinkIcon
          active={loc.pathname === "/stats"}
          width="48"
          src={statsIcon}
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
          <Route path="/lookup" element={<Lookup />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </HashRouter>
      <FooterDiv>&nbsp;</FooterDiv>
    </AppDiv>
  );
}

export default App;

import "./App.css";
import TofNews from "./news";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import newsIcon from "./assets/news.svg";
import dailyIcon from "./assets/daily.svg";
import DailyRoutine from "./daily";

const NavigationBar = styled.div`
  color: white;
  display: flex;
  justify-content: flex-end;
  gap: 1em;
`;

const LinkIcon = styled.img<{ active: boolean }>`
  filter: invert();

  ${({ active }) =>
    active &&
    "filter: invert(14%) sepia(70%) saturate(4870%) hue-rotate(240deg) brightness(58%) contrast(137%) drop-shadow(0px 0px 8px white);"}
`;

function Navigation() {
  const loc = useLocation();
  console.log(loc);
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
    <div className="App">
      <h1 className="title">Tower of Fantasy News</h1>
      <HashRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<TofNews />} />
          <Route path="/daily" element={<DailyRoutine />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

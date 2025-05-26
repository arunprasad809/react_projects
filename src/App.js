import { Routes, Route, Link, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Todo from "./Todo/Todo";
import Reducer from "./Reducer/Reducer";
import FormComp from "./FormComp/FormComp";
import Counter from "./Counter/Counter";
import Random from "./Random/Random";
import RoutingTabs from "./RoutingTabs/RoutingTabs";
import PageRouting from "./PageRouting/PageRouting";
import Page from "./PageRouting/Page";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import NotFound from "./NotFound";
import ParentLayout from "./PageRouting/ParentLayout";
import WindowSize from "./WindowSize/WindowSize";

function App() {
  const currentPage = useLocation().pathname;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleNavClick = () => {
    setIsNavOpen(false);
  };
  return (
    <div className="App">
      <Header title="This is Header Title" />
      <main className="main">
        <nav>
          <Button
            aria-label="nav-button"
            className="nav-icon"
            variant="light"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {!isNavOpen ? (
              <svg
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
              </svg>
            ) : (
              <svg
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            )}
          </Button>
          <div id="nav-items" className={isNavOpen ? "opened" : null}>
            <Link
              onClick={() => handleNavClick()}
              className={currentPage === "/" ? "active" : null}
              to="/"
            >
              Todo
            </Link>
            <Link
              onClick={() => handleNavClick()}
              className={currentPage === "/reducer" ? "active" : null}
              to="/reducer"
            >
              Reducer
            </Link>
            <Link
              onClick={() => handleNavClick()}
              className={currentPage === "/form" ? "active" : null}
              to="/form"
            >
              Form
            </Link>
            <Link
              onClick={() => handleNavClick()}
              className={currentPage === "/counter" ? "active" : null}
              to="/counter"
            >
              Counter
            </Link>
            <Link
              onClick={() => handleNavClick()}
              className={currentPage === "/random" ? "active" : null}
              to="/random"
            >
              Random
            </Link>
            <Link
              onClick={() => handleNavClick()}
              className={currentPage === "/routing" ? "active" : null}
              to="/routing"
            >
              Routing
            </Link>
            <Link
              onClick={() => handleNavClick()}
              className={currentPage === "/page-routing" ? "active" : null}
              to="/page-routing"
            >
              In Page Routing
            </Link>
            <Link
              onClick={() => handleNavClick()}
              className={currentPage === "/window-size" ? "active" : null}
              to="/window-size"
            >
              Window Size
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/reducer" element={<Reducer />} />
          <Route path="/form" element={<FormComp />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/random" element={<Random />} />
          <Route path="/routing" element={<RoutingTabs />} />
          <Route path="/page-routing" element={<ParentLayout />}>
            <Route index element={<PageRouting />} />
            <Route path=":id" element={<Page />} />
          </Route>
          <Route path="/window-size" element={<WindowSize />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

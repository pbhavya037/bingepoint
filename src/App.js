import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Trend from "./parts/trending";
import Movies from "./parts/movies";
import Search from "./parts/search";
import Navbar from "./parts/navbar";
import Footer from "./parts/footer";
import Series from "./parts/tvseries";
import Notfound from "./parts/404";

function App() {
  return (
    <Router>
      <div className="App scroll-smooth ">
        <Navbar />
        <div className="main mt-5 min-h-screen ">
          <Switch>
            <Route exact path="/">
              <Trend />
            </Route>
            <Route path="/trending">
              <Trend />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/series">
              <Series />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="*">
              <Notfound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

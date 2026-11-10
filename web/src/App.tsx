import { useState } from "react";
import type { PageState, Pitch, User } from "./types";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { NavBar } from "./widgets/NavBar";
import { user1 } from "./mocks/mockData";
import HomePage from "./pages/HomePage";

function App() {
  const [page, setPage] = useState<PageState>("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // const [pitch, setPitch] = useState<Pitch | null>();

  function onNavigate(_page: PageState) {
    if (page != _page) setPage(_page);
  }
  function onSignIn() {
    if (loggedIn) {
      console.log("Error: User already logged in.");
      return;
    }
    setLoggedIn(true);
    setUser(user1);
  }
  function onSignOut() {
    if (!loggedIn) {
      console.log("Error: No user to log out.");
      return;
    }
    (setLoggedIn(false), setUser(null));
  }
  // function onClickSubmit(_pitch: Pitch) {
  //   if (page !== "pitch") {
  //     console.log("Error: Cannot submit on non-pitch page");
  //     return;
  //   }
  // }

  return (
    <>
      <NavBar
        current={page}
        onNavigate={onNavigate}
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      {/* TODO: replace with routing isnstead of state switching */}
      {page === "home" && <HomePage isLoggedIn={loggedIn} />}
      {page === "lboard" && <LeaderboardPage />}
    </>
  );
}

export default App;

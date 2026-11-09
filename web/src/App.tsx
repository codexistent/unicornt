import { useState } from "react";
import type { PageState, User } from "./types";
import { HomePage } from "./pages/HomePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { NavBar } from "./widgets/NavBar";
import { user1 } from "./mocks/mockData";

function App() {
  const [page, setPage] = useState<PageState>("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
      {page === "home" && <HomePage />}
      {page === "lboard" && <LeaderboardPage />}
    </>
  );
}

export default App;

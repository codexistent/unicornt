import { useState, useEffect } from "react";
import type { PageState, /*Pitch,*/ User } from "./types";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { NavBar } from "./widgets/NavBar";
import HomePage from "./pages/HomePage";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";

function App() {
  const [page, setPage] = useState<PageState>("home");
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const user: User | null = session
    ? {
      name: session.user.user_metadata.user_name ?? 
            session.user.user_metadata.full_name ?? 
            "Anonymous",
      avatarUrl: session.user.user_metadata.avatar_url ?? ""
    } : null;
  const loggedIn = user !== null;

  // run once on mount; check if there is current user
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    })

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  function onNavigate(_page: PageState) {
    if (page != _page) setPage(_page);
  }
  async function onSignIn(){
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: window.location.origin },
    });
    if(error) console.log("Sign in failed:", error.message);
  }
  async function onSignOut(){
    const { error } = await supabase.auth.signOut();
    if(error) console.log("Sign out failed:", error.message);
  }

  return (
    <>
      <NavBar
        current={page}
        onNavigate={onNavigate}
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        authLoading={authLoading}
      />
      {/* TODO: replace with routing isnstead of state switching */}
      {page === "home" && <HomePage isLoggedIn={loggedIn} />}
      {page === "lboard" && <LeaderboardPage />}
    </>
  );
}

export default App;

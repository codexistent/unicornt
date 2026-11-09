import type { PageState, User } from "../types";

type NavBarProps = {
  current: PageState;
  onNavigate: (page: PageState) => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
};

const PAGES: { id: PageState; label: string }[] = [
  { id: "home", label: "Pitch" },
  { id: "lboard", label: "Leaderboard" },
];

export function NavBar({
  current,
  onNavigate,
  user,
  onSignIn,
  onSignOut,
}: NavBarProps) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-violet-200 bg-white dark:border-purple-900/60 dark:bg-purple-950">
        <nav className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
          {/*Left - Logo + main navbar items*/}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="shrink-0 text-base font-bold tracking-tight text-purple-950 dark:text-purple-50"
          >
            Unicornt
          </button>

          <ul className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
            {PAGES.map((p) => {
              const active = p.id === current;

              return (
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate(p.id)}
                    aria-current={active ? "page" : undefined}
                    className={
                      "whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-all " +
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 " +
                      (active
                        ? "bg-purple-600 font-semibold text-white shadow-sm shadow-purple-900/40 dark:bg-purple-600 dark:text-white"
                        : "text-purple-900/70 hover:bg-purple-100/60 hover:text-purple-950 dark:text-purple-200/70 dark:hover:bg-purple-900/40 dark:hover:text-purple-100")
                    }
                  >
                    {p.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right auth area */}
          {user ? (
            <div className="flex shrink-0 items-center gap-3">
              <img
                src={user.avatarUrl}
                className="h-7 w-7 rounded-full ring-1 ring-stone-200 dark:ring-stone-700"
              ></img>
              <span className="hidden text-sm text-stone-700 sm:inline dark:text-stone-300">
                {user.name}
              </span>

              <button
                type="button"
                onClick={onSignOut}
                className="text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="shrink-0 rounded-md bg-stone-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
            >
              Sign In
            </button>
          )}
        </nav>
      </header>
    </>
  );
}

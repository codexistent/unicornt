import { LogOutIcon, MenuIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PageState } from "@/types";

const NAV_ITEMS: { page: PageState; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "lboard", label: "Leaderboard" },
];

type User = {
  name: string;
  avatarUrl: string;
};

type NavBarProps = {
  current: PageState;
  onNavigate: (_page: PageState) => void;
  user: User | null; // null = signed out
  onSignIn: () => void;
  onSignOut: () => void;
};

export function NavBar({
  current,
  onNavigate,
  user,
  onSignIn,
  onSignOut,
}: NavBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="mr-4 flex items-center gap-2 rounded-md font-semibold text-primary focus-visible:outline-2 focus-visible:outline-ring"
        >
          <SparklesIcon className="size-5" />
          Unicornt
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map(({ page, label }) => (
            <Button
              key={page}
              variant={current === page ? "secondary" : "ghost"}
              aria-current={current === page ? "page" : undefined}
              onClick={() => onNavigate(page)}
            >
              {label}
            </Button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="Account menu"
                  />
                }
              >
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt="" />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut}>
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={onSignIn}>Sign in</Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="sm:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {NAV_ITEMS.map(({ page, label }) => (
                <DropdownMenuItem key={page} onClick={() => onNavigate(page)}>
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

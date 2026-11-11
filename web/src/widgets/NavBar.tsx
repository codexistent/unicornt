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
import { Skeleton } from "@/components/ui/skeleton";

import type { PageState } from "@/types";
import { SHOW_LBOARD } from "@/globals";

const NAV_ITEMS: { page: PageState; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "lboard", label: "Leaderboard" },
];

const VISIBLE_NAV_ITEMS = NAV_ITEMS.filter(
  ({ page }) => page !== "lboard" || SHOW_LBOARD,
);

type User = {
  name: string;
  avatarUrl: string;
};

type NavBarProps = {
  current: PageState;
  onNavigate: (_page: PageState) => void;
  user: User | null; // null = signed out
  authLoading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
};

type AuthAreaProps = Pick<NavBarProps, "user" | "authLoading" | "onSignIn" | "onSignOut">;

export function NavBar({
  current,
  onNavigate,
  user,
  authLoading,
  onSignIn,
  onSignOut
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
          {VISIBLE_NAV_ITEMS.map(({ page, label }) => (
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
          <AuthArea user={user} authLoading={authLoading} onSignIn={onSignIn} onSignOut={onSignOut}/>

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
              {VISIBLE_NAV_ITEMS.map(({ page, label }) => (
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

function AuthArea({user, authLoading, onSignIn, onSignOut} : AuthAreaProps){
  if(authLoading){
    return <Skeleton className="size-8 rounded-full" />;
  }
  if(!user){
    return <Button onClick={onSignIn}>Sign in with GitHub</Button>;
  }

  return (
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
  );
}
# 11/8/2026 - Upd 1

My first steps in building Unicorndt were twofold: 1. write a product spec, listing what functionalities and stakeholders/types of users would be interacting with the app, and 2. lay out a sitemap/information architecture.

## Product Spec

Stakeholders:

- primarily just the end user

Functionalities:

- users can create accounts/login via github
- users (does not have to be logged in) can input a startup idea via text box
  - there will be the following outputs:
    - from each of three judge personas:
      1. roast/feedback
      2. score out of 10
    - total score out of 30
    - verdict label (unicorn or unicorndt)
    - if logged in, leaderboard result
    - if logged in, share link to roast; otherwise, a prompt to 'sign in to claim your spot' or similar

## Sitemap

![sitemap](docs/media/sitemap.PNG)

## Components

Based on our product spec and sitemap, we mapped out the following component pages for our frontend:

- `App`
- `HomePage`
- `LeaderboardPage`
- `SignUpPage`
- `SignInPage`
- `ResultPage`
- `PitchPage`

and the individual components

- `JudgeCard` - one VC's avatar, name, roast and score
- `Navbar` at the top

# 11/8/2026 - Upd 2

To simplify the architecture of our app, at least for its first version, we made the following changes.

## Product Spec Changes

Only place that changed is that the shareable results link is now on backlog.

## Sitemap Changes

- Drop `SignUp` and `SignIn` pages and replace with a single `sign in with github` button.
- Merge `Pitch` and `Result` pages into `HomePage`.
- Since shareable results page is on backlog, the results appear on the homepage and there is no need for changing url.

# 11/8/2026 - Upd 3

After adding `types.ts`, we moved to a new branch `ui` which will build out the frontend. In order to properly see how the frontend would display, we made a `mockData.ts` file which the frontend will temporarily reference.

Having wired the mock backend, we then moved onto implementing the components (for each page) and widgets (for the smaller things like buttons or the navbar). By the end of the day, `JudgeCard.tsx` and `NavBar.tsx` was created.

# 11/9/2026 - Upd 1

Our initial stack was `React` + `TailwindCSS` + `FastAPI`. However the UI was getting tiring to implement, so we added in the components library `ShadCN` to make the process more streamlined.

When adding ShadCN, we had to make the following changes:

- In `tsconfig.json`, add to main block:
  - ```// for shadCN library
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"]
      }
    }
    ```
- In `tsconfig.app.json`, add to `"CompilerOptions"`:
  - ```// for shadCN library
    "paths": {
      "@/*": ["./src/*"]
    }
    ```
- In `vite.config.ts`, add
  - `import path from "path";` at the top and
  - ```resolve: {
      alias: {
        // for shadCN components lib
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ```
    in `defineConfig`.

# 11/9/2026 - Upd 2

Finished the `JudgeCard.tsx` and `LeaderBoardRow.tsx` widgets using shadcn library. Also redid `HomePage.tsx` and `NavBar.tsx` with shadcn.

Currently wiring `LeaderboardPage.tsx` to api.

# 11/9/2026 - Upd 3

Completed frontend with mock data plugged in.

## Connecting to AI API

Moved to `ai-api` branch for adding in the AI API for judge results.

Added a virtual environment to isolate dependencies:

- Went into `/api`, ran `python -m venv .venv` then `.venv\Scripts\activate` (on Windows btw; the commands can differ if you're on Mac)
- To install listed dependencies from `requirements.txt` I ran `pip install -r requirements.txt`
- Added `.venv/` to `.gitignore`

# 11/10/2026 - Upd 1

## Connecting to AI API (Cont.d)

### Testing the API

Tested AI API wiring by running the server through calling `uvicorn main:app --reload` in `/api` directory. The server started up successfully.

FastAPI then opens `http://localhost:8000/docs` for which we can test sending requests. Sending in this request:

```json
{
  "companyName": "GreenerGrass",
  "text": "We help people paint their lawns green."
}
```

we successfully got:

```json
{
  "judgeResults": [
    {
      "judgeName": "Nohype Bro",
      "feedback": "So you've disrupted paint by targeting homeowners who refuse to accept basic biology? Good luck scaling a business model that burns cash faster than a drought burns your customers' dead turf.",
      "score": 2
    },
    {
      "judgeName": "The Skeptic",
      "feedback": "You've managed to invent a solution that is somehow worse for the environment than actual artificial turf, all to solve a cosmetic problem nobody with a brain cares about. Your total addressable market is literally delusional homeowners and HOAs with too much money and zero taste.",
      "score": 1
    },
    {
      "judgeName": "Boomer",
      "feedback": "So you want me to buy spray paint for my dirt instead of just turning on the sprinkler? My neighbor Bob tried painting his deck once and it looked like a swamp, nobody is paying you for a lawn full of toxic green goop.",
      "score": 2
    }
  ],
  "totalScore": 5,
  "verdict": "unicornt"
}
```

proving our AI server connection is working.

## Linking the Front and Backend

Switched to a new branch `api` and connected the frontend with the backend. We got our first working pitch result sent over by the AI server:
![first pitch p1](docs/media/firstpitch1.png)
![first pitch p2](docs/media/firstpitch2.png)

The requests are sent seperately for each of the judges and it is quite slow waiting for all three calls though, so I might add in functionality which shows users now many judges are complete or some sort of status bar for greater perceived speed.

## Sidequest - Editing Project on Mac

Couldn't access my Windows computer for a while and had to code on mac. Ran into an issue where when installing the dependencies for my venv it kept failing with error ```ERROR: Failed building wheel for cryptography```. Resolved by using the edited command ```pip install -r requirements.txt --only-binary cryptography```.

# 11/10/2026 - Upd 2

## Version 1.0

Version 1 complete! Its primary fulfillment was in enabling users to send in a pitch and get it judged.

## Version 2.0

For version 2, we add:
- User auth 
- Leaderboard
- (possibly) shareable links for results

# 11/10/2026 - Upd 3

Adding supabase to app for user auth.
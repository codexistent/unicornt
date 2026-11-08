# 11/8/2026

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

# Test Writing Process

- Current File Being Tested: header-auth.tsx
- What are the important parts of the component/what am I testing?
  - If a session/user is not authenticated:
    [ x ] Render the sign in and sign up buttons
  - If a session/user IS authenticated:
    [ x ] Do not show the sign in and sign up buttons
    [ x ] Render the user's avatar
    [ x ] Render sign out button

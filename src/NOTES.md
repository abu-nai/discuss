# Test Writing Process

File Being Tested: search-input.tsx

- What are the important parts of the component/what am I testing?
  - When a term is searched, the term (now in the URL) should pre-populate in the search input.
  - When there is no term being searched, the input should not have anything rendered.

File Being Tested: header-auth.tsx

- What are the important parts of the component/what am I testing?
  - If a session/user is not authenticated:
    [ x ] Render the sign in and sign up buttons
  - If a session/user IS authenticated:
    [ x ] Do not show the sign in and sign up buttons
    [ x ] Render the user's avatar
    [ x ] Render sign out button

File Being Tested: comment-create-form.tsx

- What are the important parts of the component/what am I testing?
  - Clicking the reply button will toggle the comment form open and closed

File Being Tested: post-create-form.tsx

- What are the important parts of the component/what am I testing?
  - Clicking the Create Post button will toggle the form open and closed

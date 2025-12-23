# Testing Guide for Animate Community

This guide provides comprehensive testing scenarios to verify all features of the platform.

## Prerequisites

Before testing:
1. Follow the Quick Start Guide to set up the application
2. Run the seed script to populate sample data: `cd server && npm run seed`
3. Start both server and client: `npm run dev` from root directory

## Test Scenarios

### 1. Testing as a Visitor (Not Logged In)

#### Browse Community
- [ ] Navigate to http://localhost:3000
- [ ] Click "Explore Community" button
- [ ] Verify video grid displays with 12 videos
- [ ] Check that each video card shows:
  - [ ] Thumbnail image
  - [ ] Video title
  - [ ] Uploader name
  - [ ] View count
  - [ ] Tags
  - [ ] Like, bookmark, and share buttons

#### Search Functionality
- [ ] Enter "tutorial" in search bar
- [ ] Press Enter or click Search button
- [ ] Verify results show only videos matching "tutorial"
- [ ] Clear search and try "3d"
- [ ] Verify appropriate results

#### Category Filtering
- [ ] Select "Tutorial" from category dropdown
- [ ] Verify only tutorial videos are displayed
- [ ] Try other categories: Showcase, Behind-the-scenes
- [ ] Select "All" to see all videos again

#### Sort Options
- [ ] Select "Most Popular" from sort dropdown
- [ ] Verify videos reorder by likes/views
- [ ] Select "Oldest" 
- [ ] Verify videos show oldest first
- [ ] Select "Latest" to return to default

#### Pagination
- [ ] Scroll to bottom of page
- [ ] Click "Next" button (if more than 12 videos)
- [ ] Verify page indicator shows "Page 2 of X"
- [ ] Click "Previous" to return to page 1

#### Video Detail
- [ ] Click on any video card
- [ ] Verify video detail page loads
- [ ] Check that page shows:
  - [ ] Video player
  - [ ] Full title and description
  - [ ] Uploader name (clickable)
  - [ ] Statistics (views, likes, date)
  - [ ] Tags and category
  - [ ] Comments section

#### Attempting Interactive Features (Should Prompt Login)
- [ ] Try to click like button on a video card
- [ ] Verify alert: "Please log in to like videos"
- [ ] Try to click bookmark button
- [ ] Verify alert: "Please log in to bookmark videos"
- [ ] Go to video detail page
- [ ] Try to add a comment
- [ ] Verify message: "Log in to leave a comment"

#### Share Functionality (Works Without Login)
- [ ] Click share button on any video card
- [ ] Verify alert: "Video link copied to clipboard!"
- [ ] Paste clipboard content - should be video URL
- [ ] Try share from video detail page
- [ ] Verify same behavior

#### User Profiles
- [ ] Click on any uploader name
- [ ] Verify profile page loads
- [ ] Check profile shows:
  - [ ] Username
  - [ ] Member since date
  - [ ] All videos by that user
- [ ] Click on another uploader name from a video
- [ ] Verify navigation works

#### Navigation
- [ ] Click logo to return home
- [ ] Click "Community" in navbar
- [ ] Verify navigation works
- [ ] Click "Login / Sign Up" button
- [ ] Verify login page loads

### 2. Testing Registration

#### Create New Account
- [ ] Go to login page
- [ ] Click "Don't have an account? Sign up"
- [ ] Enter username: "testuser"
- [ ] Enter email: "testuser@example.com"
- [ ] Enter password: "password123"
- [ ] Click "Sign Up"
- [ ] Verify redirect to community page
- [ ] Verify navbar shows "Profile" and "Logout"

#### Duplicate Account Prevention
- [ ] Logout
- [ ] Try to register with same email
- [ ] Verify error message appears

### 3. Testing as Logged-In User

#### Login
- [ ] Go to login page
- [ ] Enter email: "alice@example.com"
- [ ] Enter password: "password123"
- [ ] Click "Log In"
- [ ] Verify successful login and redirect to community
- [ ] Verify navbar shows username link and logout button

#### Like Videos
- [ ] On community page, click heart icon on any video
- [ ] Verify heart fills with color (red)
- [ ] Verify like count increases by 1
- [ ] Click heart again to unlike
- [ ] Verify heart becomes outline
- [ ] Verify like count decreases by 1
- [ ] Refresh page
- [ ] Verify like status persists

#### Bookmark Videos
- [ ] Click bookmark icon on any video
- [ ] Verify bookmark icon fills with color (blue)
- [ ] Bookmark 2-3 more videos
- [ ] Refresh page
- [ ] Verify bookmark status persists

#### Comment on Videos
- [ ] Open any video detail page
- [ ] Scroll to comments section
- [ ] Type "Great work!" in comment box
- [ ] Click "Post Comment"
- [ ] Verify comment appears immediately at top
- [ ] Verify comment shows your username
- [ ] Add another comment
- [ ] Verify both comments display

#### Delete Own Comments
- [ ] Find your comment in the list
- [ ] Click "Delete" button
- [ ] Verify comment is removed
- [ ] Try to delete someone else's comment
- [ ] Verify you cannot (button not visible)

#### View Profile
- [ ] Click your username in navbar or on a comment
- [ ] Verify profile page shows your information
- [ ] Check if any videos you're associated with appear

#### Share Videos
- [ ] Share any video
- [ ] Verify clipboard functionality
- [ ] Open the copied link in new tab
- [ ] Verify it navigates to correct video

### 4. Testing Video Detail Page

#### Video Playback
- [ ] Open any video detail page
- [ ] Click play on video player
- [ ] Verify video plays (sample videos from seed data)
- [ ] Test pause, volume, fullscreen controls
- [ ] Verify player is responsive

#### All Interactive Features
- [ ] Like the video
- [ ] Bookmark the video
- [ ] Share the video
- [ ] Add a comment
- [ ] Delete your comment
- [ ] Click on uploader name
- [ ] Verify navigation to profile

#### Comments Display
- [ ] Verify all comments display
- [ ] Check timestamps on comments
- [ ] Verify usernames are clickable
- [ ] Scroll through all comments

### 5. Testing Search Combinations

#### Combined Filters
- [ ] Search for "animation"
- [ ] Select category "Tutorial"
- [ ] Select sort "Most Popular"
- [ ] Verify all filters apply together
- [ ] Change sort to "Latest"
- [ ] Verify results update
- [ ] Clear search
- [ ] Verify category filter remains

#### Empty Results
- [ ] Search for "xyznonexistent"
- [ ] Verify "No videos found" message
- [ ] Verify suggestion to adjust filters
- [ ] Clear search
- [ ] Verify videos return

### 6. Testing Responsive Design

#### Mobile View (< 640px)
- [ ] Resize browser to mobile width or use device emulation
- [ ] Verify video grid shows 1 column
- [ ] Check navbar is readable
- [ ] Verify buttons are touch-friendly
- [ ] Test search and filters on mobile
- [ ] Test video detail page on mobile

#### Tablet View (640px - 1024px)
- [ ] Resize to tablet width
- [ ] Verify video grid shows 2 columns
- [ ] Test all features
- [ ] Verify layout is comfortable

#### Desktop View (> 1024px)
- [ ] Resize to desktop width
- [ ] Verify video grid shows 3-4 columns
- [ ] Test all features
- [ ] Verify optimal use of space

### 7. Testing Edge Cases

#### Long Content
- [ ] Find video with long title
- [ ] Verify title truncates properly (2 lines max)
- [ ] Check video with many tags
- [ ] Verify only 3 tags show on card

#### Rapid Interactions
- [ ] Quickly click like button multiple times
- [ ] Verify it doesn't create duplicate likes
- [ ] Try rapid bookmark/unbookmark
- [ ] Verify state remains consistent

#### Navigation While Loading
- [ ] Start navigating to a page
- [ ] Immediately click to another page
- [ ] Verify no errors occur
- [ ] Check that correct page loads

#### Session Persistence
- [ ] Log in
- [ ] Refresh the page
- [ ] Verify you remain logged in
- [ ] Close browser and reopen
- [ ] Verify session persists (if browser saves localStorage)

### 8. Testing Logout

#### Logout Process
- [ ] Click "Logout" button
- [ ] Verify redirect occurs
- [ ] Verify navbar no longer shows profile/logout
- [ ] Verify navbar shows "Login / Sign Up"
- [ ] Try to like a video
- [ ] Verify login prompt appears

#### Post-Logout Access
- [ ] Try accessing community page
- [ ] Verify you can still view
- [ ] Try accessing a video detail page
- [ ] Verify you can still view
- [ ] Verify you cannot interact

## Performance Testing

### Load Times
- [ ] Monitor time to load community page
- [ ] Check time to load video detail page
- [ ] Verify pagination is fast
- [ ] Check search results appear quickly

### Multiple Users
- [ ] Have another user (or another browser) logged in
- [ ] User 1: Like a video
- [ ] User 2: Refresh and verify like count updated
- [ ] User 1: Add comment
- [ ] User 2: View video and see new comment

## Error Handling

### Network Errors
- [ ] Stop the server
- [ ] Try to load community page
- [ ] Verify error handling (error message or loading state)
- [ ] Restart server
- [ ] Verify recovery

### Invalid URLs
- [ ] Navigate to /video/invalidid123
- [ ] Verify "Video not found" message
- [ ] Navigate to /profile/invaliduserid
- [ ] Verify "User not found" message

### Invalid Credentials
- [ ] Try to login with wrong password
- [ ] Verify error message appears
- [ ] Try to login with non-existent email
- [ ] Verify appropriate error

## Security Testing

### Protected Actions
- [ ] Logout
- [ ] Try to like a video (should fail gracefully)
- [ ] Try to bookmark a video (should fail gracefully)
- [ ] Try to add a comment (should show login prompt)

### Comment Ownership
- [ ] Login as User A (alice@example.com)
- [ ] Add a comment
- [ ] Logout and login as User B (bob@example.com)
- [ ] Verify you cannot delete User A's comment
- [ ] Verify you can only delete your own comments

## Test Results Template

After completing all tests, document:

### Pass/Fail Summary
- Total Tests: ___
- Passed: ___
- Failed: ___
- Blocked: ___

### Issues Found
1. Issue description
   - Severity: [Critical/Major/Minor]
   - Steps to reproduce
   - Expected behavior
   - Actual behavior

### Browser Compatibility
- [ ] Chrome - Version: ___ - Status: ___
- [ ] Firefox - Version: ___ - Status: ___
- [ ] Safari - Version: ___ - Status: ___
- [ ] Edge - Version: ___ - Status: ___

### Notes
Any additional observations or recommendations.

## Automated Testing

For future development, consider adding:
- Unit tests for components (Jest + React Testing Library)
- API integration tests (Supertest)
- End-to-end tests (Cypress or Playwright)

## Conclusion

This comprehensive test plan covers all major features and user flows of the Animate Community platform. Complete this testing checklist before deploying to production or when making significant changes to the codebase.

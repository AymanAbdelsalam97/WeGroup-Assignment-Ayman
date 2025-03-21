# WeGroup Frontend Assessment

Your task is to develop a **Users overview** application. The application should include the following features:

1. **Overview of Users**: Display an overview of all users with their name, email address, and role. The list should be fetched from the mock API provided in the server folder.
   **Done**
2. **Sort Users**: Implement functionality to sort users by their name or role. The selected sorting preference should persist even after refreshing the page.
      **Done**

3. **Create a New User**: Provide a form to add a new user by entering their name, email, and role.
   **Done**
4. **Edit a User**: When a user clicks 'Edit', a form should appear with the details of the selected user, allowing them to make changes. After saving the changes, the user's details in the list should be updated.
      **Done**

5. **Delete a User**: Allow users to delete an existing user from the list.
      **Done**

   This assignment will give us insights in how well you can create a Front-End application for a Back-End. There are several important points where we will rate your code on:

- UX
- Using best practices
- Code structure
- Code readability
- State management
- API integration and handling
- Type usage
- Styling

### Requirements:

- Use **React** with **TypeScript**.
- Use **React Query** for efficient data fetching and synchronization with the API.
- Use any styling framework or library of your choice. **Tailwind CSS** is preferred, but feel free to choose what best suits your workflow.
- The application must work with the mock API in the pre-configured server folder.
- The application should provide an intuitive user experience with a visually appealing design.

### Additional Feature: User Detail Page

You can enhance the application by adding a **User Detail Page**. This page should display more detailed information about a specific user. When you click on a user's name in the overview, they should be navigated to this detail page.

This feature is optional but can demonstrate your ability to work with dynamic routes and API integration.

### API Endpoints

The mock API is available at `http://localhost:3001/` and includes the following endpoints:

- **GET /users**: Fetches a list of all users.
- **GET /users/:id**: Fetches details of a specific user.
- **POST /users**: Creates a new user.
- **PUT /users/:id**: Updates the details of an existing user.
- **PATCH /users/:id**: Partially updates the details of an existing user (e.g., updating only the role or email).

### Setup

1. Clone the repository.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Run mock server
   ```bash
   npm run server
   ```

### I'm finished, what now?

Please provide the following:

- A link to your public GitHub repository containing the complete project code

That's all!

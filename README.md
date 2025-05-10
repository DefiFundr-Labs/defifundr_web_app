[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/license/MIT)

# Defifundr Setup Instructions

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a code editor like Visual Studio Code installed.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/project.git
   ```
2. Navigate to the project directory:
   ```sh
   cd project
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Tailwind CSS Styling Guidelines

### Important Styling Rules

- **Always use Tailwind's predefined classes**
- **Avoid arbitrary values (square bracket notation)**

#### Correct Usage Examples:

```jsx
// Correct: Use predefined Tailwind classes
<div className="w-full h-64 text-lg p-4 m-2">
  Content
</div>

// Incorrect: Avoid arbitrary values
<div className="w-[345px] h-[200px] text-[17px] p-[15px]">
  Content
</div>
```

#### Handling Non-Standard Sizes

When a specific size isn't available in Tailwind:

1. Use the closest predefined class
2. Combine multiple classes if needed
3. Consult the team for standardization

#### Common Conversions

- Instead of `w-[345px]`, use `w-96` or nearest width class
- Instead of `text-[17px]`, use `text-base` or `text-lg`
- Instead of `p-[15px]`, use `p-4`
- Instead of `h-[200px]`, use `h-48` or `h-52`

## Branch and Commit Conventions

### Branch Naming Convention

Always create branches from the `main` branch with the following conventions:

- For new features:

  ```sh
  git checkout main
  git checkout -b feature/descriptive_feature_name
  ```

  Example: `git checkout -b feature/create_hero_section`

- For bug fixes:
  ```sh
  git checkout main
  git checkout -b fix/descriptive_fix_name
  ```
  Example: `git checkout -b fix/login_error_handling`

### Commit Message Convention

Use descriptive commit messages with the following format:

- For features:

  ```sh
  git commit -m "feature: brief description of the feature"
  ```

  Example: `git commit -m "feature: add responsive navigation component"`

- For fixes:
  ```sh
  git commit -m "fix: brief description of the fix"
  ```
  Example: `git commit -m "fix: resolve login authentication error"`

### Pull Request Guidelines

- Always compare your pull request against the `main` branch, NOT `main`
- Ensure your branch is up to date with the `main` branch before creating a pull request

## ESLint Configuration

1. Install ESLint and TypeScript ESLint:
   ```sh
   npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
   ```
2. Optionally add `...tseslint.configs.stylisticTypeChecked`
3. Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:
   ```sh
   npm install eslint-plugin-react --save-dev
   ```
4. Create or update `eslint.config.js`:
   ```js
   // eslint.config.js
   import react from "eslint-plugin-react";
   export default tseslint.config({
     // Set the react version
     settings: { react: { version: "18.3" } },
     plugins: {
       // Add the react plugin
       react,
     },
     rules: {
       // other rules...
       // Enable its recommended rules
       ...react.configs.recommended.rules,
       ...react.configs["jsx-runtime"].rules,
     },
   });
   ```

## Running the Project

1. Start the development server:
   ```sh
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Running Tests

1. Run the tests:
   ```sh
   npm test
   ```

## Contributing

To contribute to this project, please follow these steps:

1. Ensure you're on the `main` branch
2. Pull the latest changes
3. Create a new branch following the naming conventions
4. Make your changes and commit with the specified commit message format
5. Push to the branch:
   ```sh
   git push origin feature/your_feature_name
   ```
6. Create a pull request targeting the `main` branch

## License

This project is licensed under the MIT License.

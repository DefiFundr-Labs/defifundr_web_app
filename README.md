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

## Branch and Commit Conventions

### Branch Naming Convention
Always create branches from the `develop` branch with the following conventions:

- For new features:
  ```sh
  git checkout develop
  git checkout -b feature/descriptive_feature_name
  ```
  Example: `git checkout -b feature/create_hero_section`

- For bug fixes:
  ```sh
  git checkout develop
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
- Always compare your pull request against the `staging` branch, NOT `main`
- Ensure your branch is up to date with the `develop` branch before creating a pull request

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
    import react from 'eslint-plugin-react'
    export default tseslint.config({
      // Set the react version
      settings: { react: { version: '18.3' } },
      plugins: {
        // Add the react plugin
        react,
      },
      rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
      },
    })
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
1. Ensure you're on the `develop` branch
2. Pull the latest changes
3. Create a new branch following the naming conventions
4. Make your changes and commit with the specified commit message format
5. Push to the branch:
    ```sh
    git push origin feature/your_feature_name
    ```
6. Create a pull request targeting the `staging` branch

## License
This project is licensed under the MIT License.

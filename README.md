# DefiFundr - Decentralized Payroll & Invoice Management Platform

**DefiFundr** is a secure, blockchain-powered platform that streamlines payroll and invoice management for modern businesses. Built with React, TypeScript, and integrated with multiple blockchain networks including Solana, Ethereum, and StarkNet.

## 🌟 Features

- **Automated Payroll Processing** - Smart contract-based salary disbursements
- **Multi-Currency Support** - Crypto (USDC, SOL, ETH) and fiat payments
- **Invoice Management** - Transparent, blockchain-verified invoicing system
- **Employee Dashboard** - Real-time payment tracking and history
- **Multi-Signature Security** - Enterprise-grade wallet integrations
- **KYC/KYB Verification** - Compliant business onboarding
- **Cross-Chain Compatibility** - Support for multiple blockchain networks

## 🛠 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Web3.js/ethers.js** for blockchain interactions
- **WalletConnect** for wallet integrations

### Backend Integration

- **Go APIs** for business logic
- **PostgreSQL & Redis** for data management
- **gRPC/Kafka** for event-driven architecture

### Blockchain

- **Solidity** (Ethereum/StarkNet smart contracts)
- **Cairo** (StarkNet for scalability)
- **Rust** (Solana programs)
- **USDC/USDT** stablecoin support

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) and npm installed
- **Git** for version control
- Code editor (Visual Studio Code recommended)
- Access to the private DefiFundr repository
- **MetaMask** or compatible Web3 wallet for testing

## 🚀 Installation

1. **Clone the private repository:**

   ```sh
   git clone https://github.com/defifundr/defifundr-web-app.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd defifundr-web-app
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Set up environment variables:**
   ```sh
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your configuration:
   ```env
   REACT_APP_API_BASE_URL=https://api.defifundr.com
   REACT_APP_SOLANA_RPC_URL=your_solana_rpc_url
   REACT_APP_ETHEREUM_RPC_URL=your_ethereum_rpc_url
   REACT_APP_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
   ```

## 🎨 Tailwind CSS Styling Guidelines

### 🚨 Important Styling Rules

- **Always use Tailwind's predefined classes**
- **Avoid arbitrary values (square bracket notation)**
- **Maintain design system consistency**

#### ✅ Correct Usage Examples:

```jsx
// Correct: Use predefined Tailwind classes
<div className="w-full h-64 text-lg p-4 m-2 bg-blue-500 rounded-lg shadow-md">
  <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
    Connect Wallet
  </button>
</div>

// For DefiFundr brand colors
<div className="bg-indigo-600 text-white border-indigo-500">
  Brand Elements
</div>
```

#### ❌ Incorrect Usage Examples:

```jsx
// Incorrect: Avoid arbitrary values
<div className="w-[345px] h-[200px] text-[17px] p-[15px] bg-[#4F46E5]">
  Content
</div>
```

#### 🔧 Handling Non-Standard Sizes

When a specific size isn't available in Tailwind:

1. **Use the closest predefined class**
2. **Combine multiple classes if needed**
3. **Consult the team for design system updates**

#### 📏 Common Conversions

| Instead of     | Use                      |
| -------------- | ------------------------ |
| `w-[345px]`    | `w-80` or `w-96`         |
| `text-[17px]`  | `text-base` or `text-lg` |
| `p-[15px]`     | `p-4`                    |
| `h-[200px]`    | `h-48` or `h-52`         |
| `bg-[#4F46E5]` | `bg-indigo-600`          |

## 🌿 Branch and Commit Conventions

### Branch Naming Convention

Always create branches from the `main` branch:

**For new features:**

```sh
git checkout main
git pull origin main
git checkout -b feature/descriptive_feature_name
```

Examples:

- `git checkout -b feature/wallet_integration`
- `git checkout -b feature/payroll_dashboard`
- `git checkout -b feature/invoice_creation`

**For bug fixes:**

```sh
git checkout main
git pull origin main
git checkout -b fix/descriptive_fix_name
```

Examples:

- `git checkout -b fix/wallet_connection_error`
- `git checkout -b fix/payroll_calculation_bug`

**For urgent hotfixes:**

```sh
git checkout main
git checkout -b hotfix/critical_issue_name
```

### 📝 Commit Message Convention

Use descriptive commit messages following this format:

**For features:**

```sh
git commit -m "feature: brief description of the feature"
```

Examples:

- `git commit -m "feature: add MetaMask wallet connection"`
- `git commit -m "feature: implement payroll scheduling interface"`
- `git commit -m "feature: add multi-signature approval flow"`

**For fixes:**

```sh
git commit -m "fix: brief description of the fix"
```

Examples:

- `git commit -m "fix: resolve wallet disconnection issue"`
- `git commit -m "fix: correct payroll amount calculation"`

**For documentation:**

```sh
git commit -m "docs: update API documentation"`
```

**For styling:**

```sh
git commit -m "style: improve responsive design for mobile"`
```

### 🔄 Pull Request Guidelines

- **Always target the `main` branch**
- **Ensure your branch is up to date before creating PR**
- **Include description of changes and testing performed**
- **Request review from at least one team member**
- **Ensure all CI checks pass**

#### Pull Request Template:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Wallet Integration Testing

- [ ] MetaMask connection tested
- [ ] Phantom wallet tested (for Solana)
- [ ] Transaction signing verified
```

## ⚙️ ESLint Configuration

1. **Install ESLint and TypeScript ESLint:**

   ```sh
   npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
   ```

2. **Install React ESLint plugin:**

   ```sh
   npm install eslint-plugin-react --save-dev
   ```

3. **Create or update `eslint.config.js`:**

   ```js
   import react from "eslint-plugin-react";
   import tseslint from "typescript-eslint";

   export default tseslint.config({
     settings: {
       react: { version: "18.3" },
     },
     plugins: {
       react,
     },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs["jsx-runtime"].rules,
       // DefiFundr specific rules
       "no-console": "warn",
       "no-unused-vars": "error",
       "prefer-const": "error",
     },
   });
   ```

## 🏃‍♂️ Running the Project

### Development Mode

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

### Production Build

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## 🧪 Testing

### Run All Tests

```sh
npm test
```

### Run Tests in Watch Mode

```sh
npm run test:watch
```

### Run Tests with Coverage

```sh
npm run test:coverage
```

### Blockchain Integration Tests

```sh
npm run test:blockchain
```

## 🔒 Security Guidelines

- **Never commit private keys or sensitive data**
- **Use environment variables for API keys**
- **Validate all user inputs**
- **Implement proper error handling for wallet connections**
- **Regular dependency updates for security patches**

### Environment Variables Security

```sh
# Add to .gitignore
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## 🚀 Deployment

### Staging Environment

```sh
npm run deploy:staging
```

### Production Environment

```sh
npm run deploy:production
```

## 🤝 Contributing

### For Team Members:

1. **Ensure you're on the `main` branch**

   ```sh
   git checkout main
   git pull origin main
   ```

2. **Create a new branch following naming conventions**

   ```sh
   git checkout -b feature/your_feature_name
   ```

3. **Make your changes and commit with proper format**

   ```sh
   git add .
   git commit -m "feature: descriptive commit message"
   ```

4. **Push to the branch**

   ```sh
   git push origin feature/your_feature_name
   ```

5. **Create a pull request targeting the `main` branch**

### Code Review Process

- All PRs require at least **one approval**
- **Blockchain-related changes** require review from senior developer
- **UI/UX changes** should include screenshots
- **API integrations** must include testing documentation

## 📚 Additional Resources

- [DefiFundr API Documentation](https://docs.defifundr.com)
- [Blockchain Integration Guide](./docs/blockchain-integration.md)
- [UI Component Library](./docs/components.md)
- [Testing Guidelines](./docs/testing.md)

## 🆘 Troubleshooting

### Common Issues

**Wallet Connection Failed:**

- Ensure MetaMask is installed and unlocked
- Check network configuration
- Verify RPC endpoints in environment variables

**Build Errors:**

- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

**API Connection Issues:**

- Verify API endpoints in `.env.local`
- Check network connectivity
- Confirm authentication tokens

## 📄 License

This project is proprietary and confidential. Unauthorized copying, distribution, or modification is strictly prohibited.

© 2024 DefiFundr. All rights reserved.

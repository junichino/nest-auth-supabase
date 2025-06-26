# Contributing to NestJS Supabase Auth API

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Supabase account (for testing)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nest-auth-supabase.git
   cd nest-auth-supabase
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

5. **Run the application**
   ```bash
   npm run start:dev
   ```

6. **Verify setup**
   - Visit `http://localhost:3000/api/docs` for Swagger UI
   - Check `http://localhost:3000/api/health` for health status

## 🔄 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-description
# or
git checkout -b docs/update-readme
```

### 2. Make Your Changes
- Write clear, readable code
- Follow existing code style and patterns
- Add comments for complex logic
- Update tests if needed
- Update documentation if needed

### 3. Test Your Changes
```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Check linting
npm run lint

# Format code
npm run format
```

### 4. Commit Your Changes
Use conventional commit messages:
```bash
# Features
git commit -m "feat: add password strength validation"

# Bug fixes
git commit -m "fix: resolve token expiration issue"

# Documentation
git commit -m "docs: update API examples"

# Refactoring
git commit -m "refactor: improve error handling"
```

### 5. Push and Create Pull Request
```bash
git push origin feature/amazing-feature
```
Then create a Pull Request on GitHub.

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### NestJS Patterns
- Follow NestJS architectural patterns
- Use dependency injection properly
- Create proper DTOs for request/response
- Use guards, pipes, and filters appropriately

### Code Formatting
- Use Prettier for code formatting
- Follow ESLint rules
- Use meaningful commit messages
- Add JSDoc comments for public APIs

### Example Code Style
```typescript
// Good
interface UserCreateRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async createUser(userData: UserCreateRequest): Promise<User> {
    this.logger.log(`Creating user with email: ${userData.email}`);
    // Implementation
  }
}

// Bad
export class AuthService {
  async createUser(data: any): Promise<any> {
    // Implementation without logging or types
  }
}
```

## 🧪 Testing Guidelines

### Unit Tests
- Write unit tests for new services and utilities
- Mock external dependencies (Supabase, etc.)
- Aim for good test coverage
- Use descriptive test names

### Integration Tests
- Test API endpoints end-to-end
- Test authentication flows
- Test error scenarios

### Example Test
```typescript
describe('AuthService', () => {
  it('should create user successfully', async () => {
    const userData: UserCreateRequest = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await authService.createUser(userData);
    
    expect(result).toBeDefined();
    expect(result.email).toBe(userData.email);
  });
});
```

## 📚 Documentation

### README Updates
- Update README.md if you add new features
- Include usage examples
- Update API documentation table
- Add troubleshooting steps if needed

### Code Documentation
- Add JSDoc comments for public methods
- Document complex algorithms
- Explain business logic decisions
- Update interface documentation

### API Documentation
- Update Swagger decorators
- Add example requests/responses
- Document error codes
- Update DTOs with proper descriptions

## 🐛 Reporting Issues

### Bug Reports
Use the bug report template and include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node.js version, OS, etc.)
- Error messages and stack traces

### Feature Requests
- Describe the use case
- Explain why the feature would be useful
- Provide examples if possible
- Consider implementation complexity

## 🔍 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No unnecessary files included

### PR Description
- Describe what changes you made
- Explain why you made these changes
- Link to related issues
- Include screenshots if relevant
- List any breaking changes

### Review Process
- Maintainers will review your PR
- Address feedback promptly
- Be open to suggestions
- Update PR based on feedback

## 🏷️ Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- `MAJOR`: Breaking changes
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes (backward compatible)

### Release Notes
Include in releases:
- New features
- Bug fixes
- Breaking changes
- Migration instructions (if needed)

## 🤝 Community Guidelines

### Be Respectful
- Use inclusive language
- Be constructive in feedback
- Help newcomers
- Follow the code of conduct

### Communication
- Use GitHub issues for bugs and features
- Use discussions for questions
- Be patient with responses
- Provide context in communications

## 📞 Getting Help

If you need help:
1. Check existing issues and discussions
2. Read the documentation
3. Create a new issue with details
4. Join community discussions

## 🎯 Areas for Contribution

We welcome contributions in:
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🧪 Test coverage
- 🎨 UI/UX improvements
- 🔧 DevOps and tooling
- 🌐 Internationalization
- ♿ Accessibility improvements

Thank you for contributing! 🙏

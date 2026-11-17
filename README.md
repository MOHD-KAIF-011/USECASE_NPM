# USECASE_NPM

Real-world application showcase demonstrating the [`str-craft-kit`](https://www.npmjs.com/package/str-craft-kit) npm package in production scenarios.

---

## What is Demonstrated

This project demonstrates practical business logic using `str-craft-kit` utilities:

1. **CMS Publishing & SEO Pipeline:**
   - Converts raw user titles to Title Case using `titleCase()`.
   - Generates SEO-friendly URLs using `slugify()`.
   - Strips dangerous HTML / scripts for excerpts using `stripHtml()`.
   - Truncates excerpts cleanly at word boundaries using `truncate()`.
   - Computes reading statistics (`wordCount()` and `readingTime()`).

2. **User Registration & Privacy Audit Logging:**
   - Validates user input (`isEmail()`, `isUrl()`, `isNumeric()`, `isEmpty()`).
   - Masks sensitive user data for secure audit logs (`mask()` with email & generic strategies).
   - Escapes HTML entities to prevent XSS in text nodes using `escapeHtml()`.

3. **Schema & Identifier Normalization:**
   - Converts identifiers across casing conventions (`camelCase()`, `pascalCase()`, `kebabCase()`, `snakeCase()`).

---

## Installation & Running

### 1. Install Dependencies
```bash
npm install
```
*(This installs `str-craft-kit` directly from the public npm registry)*

### 2. Run Showcase
```bash
npm start
```

### 3. Run Automated Tests
```bash
npm test
```

---

## Package Information
- **Package Name:** `str-craft-kit`
- **NPM URL:** [https://www.npmjs.com/package/str-craft-kit](https://www.npmjs.com/package/str-craft-kit)
- **GitHub Repository (Package):** [https://github.com/MOHD-KAIF-011/NPM_ASD](https://github.com/MOHD-KAIF-011/NPM_ASD)
- **Author:** Mohd Kaif

---

## License
MIT

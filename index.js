/**
 * Real-world Use Case Showcase for `str-craft-kit` npm package.
 *
 * Demonstrates:
 * 1. Content Publishing Pipeline (slug generation, word count, reading time, excerpt truncation)
 * 2. User Data Validation & Privacy Audit Logging (email/URL validation, PII masking, HTML escaping)
 * 3. Schema & Identifier Case Normalization (camelCase, snake_case, kebab-case, PascalCase)
 */

const {
  slugify,
  titleCase,
  truncate,
  stripHtml,
  escapeHtml,
  mask,
  wordCount,
  readingTime,
  isEmail,
  isUrl,
  isNumeric,
  isEmpty,
  camelCase,
  snakeCase,
  kebabCase,
  pascalCase,
} = require('str-craft-kit');

console.log('='.repeat(60));
console.log('🚀 DEMO: str-craft-kit Real-World Use Case Pipeline');
console.log('='.repeat(60));

// ============================================================================
// USE CASE 1: CMS Article Publishing & SEO Pipeline
// ============================================================================
console.log('\n[1] CMS Article Publishing Pipeline:');

const rawArticle = {
  rawTitle: '  the 10 BEST node.js & cloud architectures for 2026!  ',
  rawContentHtml: `
    <article>
      <h2>Modern Microservices</h2>
      <p>Building high-speed Node.js backends requires careful API design,
      efficient algorithms, and zero-dependency utility libraries that prevent
      unnecessary supply-chain risks and bloat.</p>
      <script>console.log("analytics tracking injection");</script>
      <p>By leveraging native runtime capabilities like modern ECMAScript standards
      and robust validation toolkits, development teams can deliver lightning-fast
      serverless and containerized microservices with high reliability.</p>
    </article>
  `,
};

function processArticlePublishing(article) {
  // 1. Generate canonical Title Case
  const formattedTitle = titleCase(article.rawTitle.trim());

  // 2. Generate SEO-friendly, URL-safe slug
  const slug = slugify(formattedTitle);

  // 3. Extract plain text for indexing & preview
  const plainText = stripHtml(article.rawContentHtml);

  // 4. Generate clean teaser excerpt preserving whole words
  const excerpt = truncate(plainText, 110, { preserveWords: true });

  // 5. Calculate reading metrics
  const words = wordCount(plainText);
  const readStats = readingTime(plainText, 200);

  return {
    title: formattedTitle,
    slug: slug,
    excerpt: excerpt,
    metrics: {
      totalWords: words,
      estimatedTime: readStats.formatted,
      timeInMs: readStats.timeMs,
    },
  };
}

const publishedArticle = processArticlePublishing(rawArticle);
console.log('✔ Formatted Title :', publishedArticle.title);
console.log('✔ SEO Slug        :', publishedArticle.slug);
console.log('✔ Clean Excerpt   :', publishedArticle.excerpt);
console.log('✔ Word Count      :', publishedArticle.metrics.totalWords);
console.log('✔ Reading Time    :', publishedArticle.metrics.estimatedTime);

// ============================================================================
// USE CASE 2: User Onboarding, Privacy Masking & Security
// ============================================================================
console.log('\n[2] User Profile Validation & Privacy Audit Logging:');

const userSubmissions = [
  {
    name: 'Mohd Kaif',
    email: 'mohd.kaif@engineering.org',
    website: 'https://github.com/MOHD-KAIF-011',
    apiKey: 'sk-live-99482716382947192',
    bio: 'Software engineer passionate about <b>Node.js</b> & performance. <script>stealCookies()</script>',
    age: '24',
  },
  {
    name: '   ',
    email: 'invalid-email-address',
    website: 'ftp://insecure-host',
    apiKey: 'secret',
    bio: 'Tester',
    age: 'not-a-number',
  },
];

function processUserRegistration(user) {
  const errors = [];

  // Validation
  if (isEmpty(user.name)) errors.push('Name cannot be empty.');
  if (!isEmail(user.email)) errors.push('Valid email address is required.');
  if (!isUrl(user.website)) errors.push('Valid HTTP/HTTPS website URL is required.');
  if (!isNumeric(user.age)) errors.push('Age must be a valid numeric value.');

  if (errors.length > 0) {
    return { success: false, errors };
  }

  // Privacy Masking for Audit Logging (Prevents PII leakage in logs)
  const auditSafeLog = {
    user: user.name,
    maskedEmail: mask(user.email, { type: 'email' }),
    maskedApiKey: mask(user.apiKey, { unmaskedStart: 4, unmaskedEnd: 4 }),
    escapedBio: escapeHtml(user.bio),
  };

  return { success: true, auditSafeLog };
}

userSubmissions.forEach((submission, idx) => {
  console.log(`\nProcessing Submission #${idx + 1}:`);
  const result = processUserRegistration(submission);
  if (result.success) {
    console.log('  Status       : SUCCESS');
    console.log('  Masked Email :', result.auditSafeLog.maskedEmail);
    console.log('  Masked Key   :', result.auditSafeLog.maskedApiKey);
    console.log('  Escaped Bio  :', result.auditSafeLog.escapedBio);
  } else {
    console.log('  Status       : REJECTED');
    console.log('  Errors       :', result.errors.join(' | '));
  }
});

// ============================================================================
// USE CASE 3: Database & API Case Normalizer
// ============================================================================
console.log('\n[3] Schema & Multi-Standard Identifier Normalization:');

const rawField = 'user_account_billing_address';
console.log('Original Input   :', rawField);
console.log('  -> camelCase   :', camelCase(rawField));
console.log('  -> PascalCase  :', pascalCase(rawField));
console.log('  -> kebab-case  :', kebabCase(rawField));
console.log('  -> snake_case  :', snakeCase(rawField));

console.log('\n' + '='.repeat(60));
console.log('✨ All showcase workflows executed successfully!');
console.log('='.repeat(60));

module.exports = {
  processArticlePublishing,
  processUserRegistration,
};

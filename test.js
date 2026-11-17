const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const {
  processArticlePublishing,
  processUserRegistration,
} = require('./index.js');

describe('USECASE_NPM test suite', () => {
  test('CMS publishing pipeline processes article accurately', () => {
    const article = {
      rawTitle: 'the modern javascript guide',
      rawContentHtml: '<p>JavaScript is a versatile language for web and backend development.</p>',
    };

    const result = processArticlePublishing(article);
    assert.equal(result.title, 'The Modern Javascript Guide');
    assert.equal(result.slug, 'the-modern-javascript-guide');
    assert.equal(result.metrics.totalWords, 10);
    assert.equal(result.metrics.estimatedTime, '1 min read');
  });

  test('User registration pipeline validates valid submissions and masks data', () => {
    const validUser = {
      name: 'Test User',
      email: 'tester@example.com',
      website: 'https://example.com',
      apiKey: 'SECRET_API_TOKEN_12345',
      bio: '<b>Hello</b>',
      age: '30',
    };

    const result = processUserRegistration(validUser);
    assert.equal(result.success, true);
    assert.equal(result.auditSafeLog.maskedEmail, 't****r@example.com');
    assert.equal(result.auditSafeLog.escapedBio, '&lt;b&gt;Hello&lt;/b&gt;');
  });

  test('User registration pipeline rejects invalid submissions', () => {
    const invalidUser = {
      name: '',
      email: 'not-an-email',
      website: 'ftp://invalid',
      apiKey: 'key',
      bio: '',
      age: 'abc',
    };

    const result = processUserRegistration(invalidUser);
    assert.equal(result.success, false);
    assert.equal(result.errors.length, 4);
  });
});

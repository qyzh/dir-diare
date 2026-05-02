import PostRenderer from '@/components/post-renderer'

const dummyPost = {
  title: 'Lorem Ipsum Dolor Sit Amet',
  slug: 'lorem-ipsum-test',
  content: `# Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Subheading Example

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Code Example

\`\`\`javascript
const greeting = 'Hello, World!'
console.log(greeting)

function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}
\`\`\`

## Lists

### Unordered
- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Sed do eiusmod tempor incididunt

### Ordered
1. First item
2. Second item
3. Third item

## Blockquote

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Table

| Name | Description | Status |
|------|-------------|--------|
| Feature A | Lorem ipsum | Active |
| Feature B | Dolor sit | Draft |
| Feature C | Amet consectetur | Done |

## Links and Emphasis

This is **bold text** and this is *italic text*. Visit [Google](https://google.com) for more information.

---

## Conclusion

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
`,
  publishedAt: new Date('2026-05-01'),
  updatedAt: new Date('2026-05-02'),
  summary:
    'A test article with lorem ipsum content for testing the PostRenderer component.',
  tags: ['test', 'lorem-ipsum', 'demo'],
}

export default function TestArticlePage() {
  return <PostRenderer post={dummyPost} type="writing" />
}

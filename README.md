# Next.js pageProps empty client-side for `_error` page reproduction

Issue: 
- `pageProps = {}` client-side for `_error`

Bisect:
- Last working version: 12.2.0, see [error-serverside-props-next-12.2.0](./error-serverside-props-next-12.2.0)
  - `cd error-serverside-props-next-12.2.0 && yarn build && yarn start`
  - open the Next.js URL
  - Expected behaviour `Next stars: <starCount>`
- First broken version: 12.2.1, see [error-serverside-props-next-12.2.1](./error-serverside-props-next-12.2.1)
  - `cd error-serverside-props-next-12.2.1 && yarn build && yarn start`
  - open the Next.js URL
  - Expected behaviour `Next stars: <starCount>`
  - Actual behaviour: `Next stars: <starCount>` populated properly on SSR pass, but when the page JavaScript kicks in, it gets replaced with `Next stars:` (no more star count)
- issue is also present in latest version (12.3.1), see [error-serverside-props-next-latest](./error-serverside-props-next-latest)
- Comparison between working and broken: https://github.com/vercel/next.js/compare/v12.2.0...v12.2.1
- likely breaking PR/commit:
  - https://github.com/vercel/next.js/pull/21240/files
  - https://github.com/vercel/next.js/commit/69f8024aa1cdef3125113c0e6e3cb4ec7c44fe8a
  - key change https://github.com/vercel/next.js/commit/69f8024aa1cdef3125113c0e6e3cb4ec7c44fe8a#diff-2433946f9a058f1b070138d12c20f10a9128e46408033629181f9f7fc3b9b9b2
  - change description: replacing the props (including pageProps) with the output of `Error.getInitialProps` unless the error was a "throw during render"
  - effect: we don't have getInitialProps on App or Error component, props are being set to `{}` (see here https://github.com/vercel/next.js/blob/92254d137ad87f7b48d3305ebf50751e8c68f8e6/packages/next/shared/lib/utils.ts#L367-L375)
# prpx ![NodeJS CI](https://github.com/ed-software/prpx/actions/workflows/ci.yml/badge.svg)

Utility for intelligently merging React component props using TailwindCSS classes. Merges as many props objects as you give it. Intelligently combines TailwindCSS classes, merges refs, chains event handlers and merges styles.

Built on top of [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) and [react-merge-refs](https://www.npmjs.com/package/react-merge-refs).

## Authors

- [@ed-software](https://www.github.com/ed-software)

## Installation

Install with npm

```bash
npm i prpx
```

## Examples

```TSX
import { prpx } from "prpx";

export function Checkbox(props: JSX.IntrinsicElements["input"]) {
  return (
    <input
      {...prpx(props, {
        type: "checkbox",
        className:
          "h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700",
      })}
    />
  );
}
```

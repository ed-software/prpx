import { twMerge } from "tailwind-merge";

/** Function that merges multiple props objects together.
 *
 *  Merges tailwind classes using tailwind-merge. Merges styles. Merges event handlers.
 */
export default function mergeTWProps<T extends Record<string, unknown>>(
  ...allProps: T[]
): T {
  /** Merge props objects */
  const props = Object.assign({}, ...allProps);

  /** Merge class names */
  if (typeof props.className === "string") {
    const classNames = allProps.reduce(
      (prev, curr) =>
        typeof curr.className === "string"
          ? twMerge(prev, curr.className)
          : prev,
      ""
    );

    /** Remove duplicate class names */
    const uniqueClassNames = [...new Set(classNames.split(" "))].join(" ");

    props.className = uniqueClassNames;
  }

  /** Merge styles */
  if (typeof props.style === "object") {
    props.style = Object.assign({}, ...allProps.map((p) => p.style));
  }

  /** Merge event handlers */
  for (const prop in props) {
    if (prop.startsWith("on") && typeof props[prop] === "function") {
      props[prop] = allProps.reduce(
        (prev, curr) => (e?: Event) => {
          prev(e);
          const fn = curr[prop];
          typeof fn === "function" && fn(e);
        },
        (e?: Event) => {}
      );
    }
  }

  return props;
}

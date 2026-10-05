"use client";

import { memo } from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { normalizeCitations } from "@/lib/citations";

/**
 * A citation arrives as bare text, which remark reads as prose rather than a
 * link. Rewriting it to a `cite:` link gives us a real inline node to hang an
 * interactive chip off, without needing a custom remark plugin.
 *
 * The transform runs over the whole accumulated answer on every render, so a
 * citation split across two streamed deltas simply fails to match until its
 * closing bracket lands, then resolves.
 */
const CITE_TEXT = /\[page\s+(\d+)\]/g;
const toCiteLink = (_: string, page: string) => `[@p${page}](cite:${page})`;

/** Keep `cite:` links alive; the default transform drops unknown protocols. */
function urlTransform(url: string): string {
  if (url.startsWith("cite:")) return url;
  return defaultUrlTransform(url);
}

export interface MarkdownProps {
  children: string;
  onCite?: (page: number) => void;
  className?: string;
}

function Cite({ page, onCite }: { page: number; onCite?: (page: number) => void }) {
  if (!onCite) {
    return (
      <span className="mx-0.5 inline-flex h-5 translate-y-[-1px] items-center rounded-full bg-accent px-1.5 align-middle font-mono text-[11px] font-medium text-accent-foreground">
        p{page}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onCite(page)}
      title={`Show page ${page} in the evidence panel`}
      className="mx-0.5 inline-flex h-5 translate-y-[-1px] cursor-pointer items-center gap-1 rounded-full bg-accent px-1.5 align-middle font-mono text-[11px] font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      p{page}
    </button>
  );
}

export const MarkdownView = memo(function MarkdownView({
  children,
  onCite,
  className,
}: MarkdownProps) {
  return (
    <div className={className}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        urlTransform={urlTransform}
        components={{
          a: ({ href, children, ...props }) => {
            if (href?.startsWith("cite:")) {
              return <Cite page={Number(href.slice(5))} onCite={onCite} />;
            }
            return (
              <a
                {...props}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                {children}
              </a>
            );
          },
          p: ({ children, ...props }) => (
            <p {...props} className="leading-relaxed [&:not(:first-child)]:mt-3">
              {children}
            </p>
          ),
          h1: ({ children, ...props }) => (
            <h1 {...props} className="mt-5 text-lg font-semibold first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 {...props} className="mt-5 text-base font-semibold first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 {...props} className="mt-4 text-sm font-semibold first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 {...props} className="mt-4 text-sm font-semibold first:mt-0">
              {children}
            </h4>
          ),
          ul: ({ children, ...props }) => (
            <ul {...props} className="my-2 list-disc space-y-1.5 pl-5 marker:text-muted-foreground/60">
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol {...props} className="my-2 list-decimal space-y-1.5 pl-5 marker:text-muted-foreground/60">
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li {...props} className="leading-relaxed">
              {children}
            </li>
          ),
          // Inline code arrives with no language class; fenced blocks do.
          code: ({ className, children, ...props }) => {
            const isBlock = typeof className === "string" && className.includes("language-");
            if (isBlock) {
              return (
                <code {...props} className={`${className} font-mono text-xs`}>
                  {children}
                </code>
              );
            }
            return (
              <code
                {...props}
                className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground"
              >
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <pre
              {...props}
              className="my-3 overflow-x-auto rounded-lg border border-border bg-muted/60 p-3 text-xs leading-relaxed"
            >
              {children}
            </pre>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              {...props}
              className="my-3 border-l-2 border-primary/40 pl-3 text-muted-foreground italic"
            >
              {children}
            </blockquote>
          ),
          strong: ({ children, ...props }) => (
            <strong {...props} className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          hr: (props) => <hr {...props} className="my-5 border-border" />,
          table: ({ children, ...props }) => (
            <div className="my-3 overflow-x-auto">
              <table {...props} className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead {...props} className="border-b border-border">
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th {...props} className="px-2 py-1.5 text-left align-bottom font-semibold">
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td {...props} className="border-t border-border/60 px-2 py-1.5 align-top">
              {children}
            </td>
          ),
        }}
      >
        {normalizeCitations(children).replace(CITE_TEXT, toCiteLink)}
      </Markdown>
    </div>
  );
});
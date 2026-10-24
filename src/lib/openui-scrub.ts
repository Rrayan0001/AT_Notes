/**
 * Removes OpenUI/generative-UI markup from a text stream.
 *
 * The OpenUI canvas is reserved for explicitly requested long-form answers;
 * the system prompt is the first gate, but the model can still emit its DSL
 * (fenced ```openui-lang blocks or the ]]><marker> wrapper) on its own. The
 * scrubber drops those blocks from a token stream so ordinary answers never
 * render the canvas.
 *
 * Usage: feed every delta to push(); collect push's return value; at stream
 * end, push the flush() output. push may hold a few characters that could
 * still resolve into the start of an OpenUI fence — flush() releases them.
 */
type ScrubMode = "copy" | "skip-to-fence" | "skip-to-close";

const FENCE = "```";
const MARKER = "]]>openui";
const OPENUI_LANG = /^openui(-lang)?\b/;

export interface OpenuiScrubber {
  /** Feed the next text delta; returns text that is safe to emit now. */
  push(chunk: string): string;
  /** Stream ended: release held text (dropped entirely inside an OpenUI block). */
  flush(): string;
}

export function createOpenuiScrubber(): OpenuiScrubber {
  let mode: ScrubMode = "copy";
  let buffer = "";

  return {
    push(chunk: string): string {
      buffer += chunk;
      let out = "";

      while (true) {
        if (mode === "skip-to-close") {
          // Inside an OpenUI block: drop everything up to the closing fence.
          const closeAt = buffer.indexOf(FENCE);
          if (closeAt === -1) return out;
          buffer = buffer.slice(closeAt + FENCE.length);
          mode = "copy";
          continue;
        }
        if (mode === "skip-to-fence") {
          // Dropping from a marker up to (and through) its opening fence.
          const fenceAt = buffer.indexOf(FENCE);
          if (fenceAt === -1) return out; // still inside the dropped prelude
          buffer = buffer.slice(fenceAt);
          mode = "copy";
          continue;
        }

        // copy: emit until the next token that could open an OpenUI block.
        const fenceAt = buffer.indexOf(FENCE);
        const markerAt = buffer.indexOf(MARKER);
        const tokens = [fenceAt, markerAt].filter((i) => i >= 0);
        if (tokens.length === 0) {
          // Hold a trailing fragment that could grow into a fence or marker
          // ("``", "]]>op") rather than emitting text we may need to retract;
          // SSE deltas cannot be unsent.
          let hold = 0;
          for (let k = Math.min(buffer.length, MARKER.length); k > hold; k--) {
            if (
              buffer.endsWith(FENCE.slice(0, k)) ||
              buffer.endsWith(MARKER.slice(0, k))
            ) {
              hold = k;
              break;
            }
          }
          out += buffer.slice(0, buffer.length - hold);
          buffer = buffer.slice(buffer.length - hold);
          break;
        }
        const next = Math.min(...tokens);
        if (buffer.startsWith(MARKER, next)) {
          out += buffer.slice(0, next);
          buffer = buffer.slice(next + MARKER.length);
          // The marker is followed by its own DSL fence; everything up to it
          // is dropped too.
          mode = "skip-to-fence";
          continue;
        }
        // next is a fence start; needs the language tag to decide.
        const langHead = buffer.slice(next + FENCE.length, next + FENCE.length + 12);
        if (langHead.length < 12 && "openui-lang".startsWith(langHead.replace(/\s.*$/, ""))) {
          // Could still resolve into "openui-lang" — hold and wait for more.
          break;
        }
        out += buffer.slice(0, next);
        buffer = buffer.slice(next);
        if (OPENUI_LANG.test(langHead)) {
          buffer = buffer.slice(FENCE.length);
          mode = "skip-to-close";
          continue;
        }
        // An ordinary fenced block — keep it.
        out += FENCE;
        buffer = buffer.slice(FENCE.length);
      }

      return out;
    },

    flush(): string {
      // Mid-block: everything held is OpenUI markup — drop it.
      const held = mode === "copy" ? buffer : "";
      buffer = "";
      mode = "copy";
      return held;
    },
  };
}

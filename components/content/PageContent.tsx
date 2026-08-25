import type { ContentBlock } from "@/lib/data/pages";

/**
 * Setzt die importierten Bloecke in der Haustypografie.
 *
 * Maximal 68 Zeichen Zeilenlaenge: die Vereinsgeschichte ist an manchen
 * Stellen ein langer Fliesstext, und ueber die volle Containerbreite von
 * 1240px waere sie unlesbar.
 */
export function PageContent({ blocks }: { blocks: readonly ContentBlock[] }) {
  if (blocks.length === 0) return null;

  return (
    <div className="max-w-[68ch] space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={index} className="text-h3 wdth-100 pt-6 first:pt-0">
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="space-y-2">
              {block.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-ui border-hairline-on-page border-l-2 pl-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-ui leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

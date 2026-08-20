import { inter } from "@/app/fonts";
import parse from "html-react-parser";

const HtmlCode = ({ data }) => {
  const cssCode = data?.chunks?.css || "";
  const rawHtml = data?.chunks?.body || "";

  // Process HTML (Server Side)
  let html = rawHtml
    .replace(/<\s*html[^>]*>/gi, "")
    .replace(/<\s*\/\s*html\s*>/gi, "")
    .replace(/<\s*head[^>]*>[\s\S]*?<\s*\/\s*head\s*>/gi, "")
    .replace(/<\s*body[^>]*>/gi, "")
    .replace(/<\s*\/\s*body\s*>/gi, "")
    .trim();

  html = html.replace(
    /<h([1-6])([^>]*)>(.*?)<\/h\1>/gi,
    (match, level, attrs, content) => {
      const text = content.replace(/<[^>]+>/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");

      if (/id\s*=/i.test(attrs))
        return `<h${level}${attrs}>${content}</h${level}>`;
      return `<h${level} id="${id}"${attrs}>${content}</h${level}>`;
    }
  );

  const htmlBody = parse(html);

  // --- THE FIX: SCOPING ---
  // 1. Replace 'body' selectors with '&' (referencing the parent wrapper)
  // 2. Wrap everything in .html-safe-wrapper { ... } for CSS Nesting
  const safeCss = cssCode
    ? `
      .html-safe-wrapper {
        ${cssCode.replace(/body/g, "&")}
      }
      /* Force images/tables to respect container width */
      .html-safe-wrapper img, 
      .html-safe-wrapper table, 
      .html-safe-wrapper iframe {
        max-width: 100% !important;
        height: auto !important;
      }
    `
    : "";

  return (
    <>
      {safeCss && <style dangerouslySetInnerHTML={{ __html: safeCss }} />}

      <div className={inter.className}>
        {/* Added overflow-hidden to prevent horizontal scrollbars if content is too wide */}
        <div
          className="html-safe-wrapper"
          style={{ overflowX: "auto", maxWidth: "100%" }}
        >
          {htmlBody}
        </div>
      </div>
    </>
  );
};

export default HtmlCode;

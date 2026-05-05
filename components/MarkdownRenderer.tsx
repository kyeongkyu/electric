"use client";

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-blue dark:prose-invert max-w-none 
      text-[#1f2937] dark:text-[#e5f3ff] text-[16px] leading-[1.85] tracking-[-0.015em]
      prose-headings:font-bold prose-headings:text-[#1f2937] dark:prose-headings:text-white 
      prose-h1:text-[24px] prose-h2:text-[20px] prose-h2:mt-[28px] prose-h2:mb-[10px] prose-h2:tracking-[-0.04em]
      prose-h3:text-[18px] 
      prose-p:mb-[16px] prose-p:leading-[1.85]
      prose-strong:text-[#b45309] dark:prose-strong:text-[#60a5fa] prose-strong:font-black
      prose-blockquote:border-l-[4px] prose-blockquote:border-[#b45309] dark:prose-blockquote:border-[#22d3ee]
      prose-blockquote:bg-[#fff7ed] dark:prose-blockquote:bg-[#08111f]
      prose-blockquote:rounded-r-[18px] prose-blockquote:py-[14px] prose-blockquote:px-[15px]
      prose-blockquote:not-italic prose-blockquote:text-[#573214] dark:prose-blockquote:text-[#e5f3ff]
      prose-blockquote:my-[20px]
      prose-pre:bg-[#1f2937] dark:prose-pre:bg-[#08111f] prose-pre:text-[#fef3c7] dark:prose-pre:text-[#22d3ee]
      prose-pre:rounded-[24px] prose-pre:p-[18px] prose-pre:border prose-pre:border-[#111827] dark:prose-pre:border-[#17314a]
      prose-pre:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
      prose-li:my-1
    ">
      <ReactMarkdown 
        remarkPlugins={[remarkMath]} 
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

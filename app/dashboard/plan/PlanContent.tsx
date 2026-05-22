"use client";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => <h2 className="text-indigo-400 font-bold text-base mt-5 first:mt-0">{children}</h2>,
  h2: ({ children }) => <h3 className="text-indigo-400 font-semibold text-sm mt-4 first:mt-0">{children}</h3>,
  h3: ({ children }) => <p className="text-indigo-300 font-semibold text-sm mt-3 first:mt-0">{children}</p>,
  strong: ({ children }) => <strong className="text-gray-200 font-semibold">{children}</strong>,
  hr: () => <hr className="border-gray-700 my-4" />,
  p: ({ children }) => <p className="text-gray-300 text-sm leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="space-y-1 my-1">{children}</ul>,
  ol: ({ children }) => <ol className="space-y-1 my-1">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-2 text-gray-300 text-sm">
      <span className="text-gray-500 shrink-0 mt-0.5">•</span>
      <span>{children}</span>
    </li>
  ),
};

export default function PlanContent({ content }: { content: string }) {
  return (
    <div className="space-y-1">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}

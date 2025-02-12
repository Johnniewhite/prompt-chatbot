import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownMessageProps {
  content: string;
}

export default function MarkdownMessage({ content }: MarkdownMessageProps) {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              // @ts-expect-error - type mismatch in library
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-100 rounded px-1 py-0.5 text-black" {...props}>
              {children}
            </code>
          );
        },
        ul: ({ children }) => (
          <ul className="list-disc ml-4 my-2 text-black">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal ml-4 my-2 text-black">{children}</ol>
        ),
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold my-3 text-black">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold my-2 text-black">{children}</h2>
        ),
        p: ({ children }) => <p className="my-2 text-black">{children}</p>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
} 
import Link from "next/link";
import { useState } from "react";
import { Copy, HelpCircle, Edit } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { serializeCode } from "@/lib/utils";

interface Props {
  code: string;
}

export const CodeBlock: React.FC<Props> = ({ code }) => {
  const [label, setLabel] = useState<string>("Copy code");
  const copyToClipboard = (text: string) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleCopyClick = () => {
    copyToClipboard(code);
    setLabel("Copied!");

    setTimeout(() => {
      setLabel("Copy code");
    }, 1000);
  };

  return (
    <pre>
      <div className="bg-black rounded-md mb-4">
        <div className="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
          <div className="flex">
            <span>mermaid</span>
            <HoverCard>
              <HoverCardTrigger>
                <HelpCircle className="mx-2 h-4 w-4 cursor-pointer" />
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">
                    Learn more about{" "}
                    <Link
                      href="https://mermaid.js.org/config/Tutorials.html"
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Mermaid.JS
                    </Link>
                    .
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex">
            <Link
              href={`https://mermaid.live/edit#pako:${serializeCode(code)}`}
              target="_blank"
              rel="noreferrer"
              className="flex ml-auto gap-1 mr-4"
            >
              <Edit className="h-4 w-4" /> Edit
            </Link>
            <button className="flex ml-auto gap-1" onClick={handleCopyClick}>
              <Copy className="h-4 w-4" />
              {label}
            </button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto">
          <code className="!whitespace-pre text-white">{code}</code>
        </div>
      </div>
    </pre>
  );
};

import { User } from "lucide-react";

interface ChatMessageProps {
  message: string;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="group w-full text-gray-800 border-b border-black/10">
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-1 md:py-2 flex lg:px-0 m-auto">
        <div className="w-[30px] flex flex-col relative items-end">
          <div className="flex">
            <User className="h-5 w-5" />
          </div>
        </div>
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          <div className="flex flex-grow flex-col gap-3">
            <div
              className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap px-2"
              key={message}
            >
              {message}
            </div>
          </div>
          <div className="flex justify-between lg:block" />
        </div>
      </div>
    </div>
  );
}

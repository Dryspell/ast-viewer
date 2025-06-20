import { Component, For } from "solid-js";

export interface Log {
  type: "info" | "error" | "success";
  message: string;
  timestamp: Date;
  details?: any;
}

interface LogViewerProps {
  logs: Log[];
}

const LogViewer: Component<LogViewerProps> = (props) => {
  const getLogColor = (type: Log["type"]) => {
    switch (type) {
      case "error": return "text-red-500";
      case "success": return "text-green-500";
      default: return "text-blue-500";
    }
  };

  return (
    <div class="space-y-2">
      <For each={props.logs}>
        {(log) => (
          <div class="bg-[#1e1e1e] p-3 rounded">
            <div class="flex items-center justify-between">
              <span class={`font-semibold ${getLogColor(log.type)}`}>
                {log.type.toUpperCase()}
              </span>
              <span class="text-gray-400 text-sm">
                {log.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p class="text-white mt-1">{log.message}</p>
            {log.details && (
              <pre class="mt-2 text-gray-400 text-sm overflow-x-auto">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            )}
          </div>
        )}
      </For>
    </div>
  );
};

export default LogViewer; 
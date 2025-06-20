import { Component, Show, createSignal } from "solid-js";
import * as CollapsiblePrimitive from "@kobalte/core/collapsible";
import { cn } from "~/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-solid";

interface CollapsiblePanelProps {
  title: string;
  side: "left" | "right";
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultCollapsed?: boolean;
  children: any;
}

const CollapsiblePanel: Component<CollapsiblePanelProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = createSignal(props.defaultCollapsed || false);
  const [width, setWidth] = createSignal(props.defaultWidth || 300);
  const [isDragging, setIsDragging] = createSignal(false);

  const handleDragStart = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDrag = (e: MouseEvent) => {
    if (!isDragging()) return;
    
    const newWidth = props.side === "left" 
      ? e.clientX 
      : window.innerWidth - e.clientX;
    
    if (newWidth >= (props.minWidth || 200) && newWidth <= (props.maxWidth || 800)) {
      setWidth(newWidth);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  return (
    <CollapsiblePrimitive.Root
      defaultOpen={!props.defaultCollapsed}
      class={cn(
        "fixed top-0 h-full bg-[#2d2d2d] flex transition-all duration-300 ease-in-out z-10",
        props.side === "left" ? "left-0 flex-row" : "right-0 flex-row-reverse"
      )}
      style={{
        width: `${isCollapsed() ? "40px" : width() + "px"}`,
        transform: `translateX(${
          isCollapsed() ? (props.side === "left" ? "-100%" : "100%") : "0"
        })`
      }}
    >
      <div 
        class={cn(
          "absolute top-0 bottom-0 w-1 cursor-col-resize",
          props.side === "left" ? "right-0" : "left-0"
        )}
        onMouseDown={handleDragStart}
      />
      
      <CollapsiblePrimitive.Trigger
        class={cn(
          "absolute top-1/2 -translate-y-1/2 bg-[#2d2d2d] text-white p-2 rounded-full hover:bg-[#3d3d3d] transition-colors",
          props.side === "left" ? "-right-10" : "-left-10"
        )}
        onClick={() => setIsCollapsed(!isCollapsed())}
      >
        {props.side === "left" 
          ? (isCollapsed() ? <ChevronRight size={16} /> : <ChevronLeft size={16} />)
          : (isCollapsed() ? <ChevronLeft size={16} /> : <ChevronRight size={16} />)
        }
      </CollapsiblePrimitive.Trigger>

      <CollapsiblePrimitive.Content class="flex-1 overflow-hidden">
        <Show when={!isCollapsed()}>
          <div class="flex flex-col h-full">
            <div class="p-4 border-b border-gray-700">
              <h3 class="text-white text-lg font-semibold">{props.title}</h3>
            </div>
            <div class="p-4 h-[calc(100%-60px)] overflow-auto">
              {props.children}
            </div>
          </div>
        </Show>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
};

export default CollapsiblePanel; 
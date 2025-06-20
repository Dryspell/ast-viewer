import { Component, For, createSignal } from "solid-js";
import * as TabsPrimitive from "@kobalte/core/tabs";
import { cn } from "~/lib/utils";

interface Tab {
  id: string;
  title: string;
  active: boolean;
}

interface TabsProps {
  initialTabs?: Tab[];
  onTabChange?: (tabId: string) => void;
}

const Tabs: Component<TabsProps> = (props) => {
  const [tabs, setTabs] = createSignal<Tab[]>(props.initialTabs || []);

  const handleTabChange = (tabId: string) => {
    setTabs(prev => prev.map(tab => ({
      ...tab,
      active: tab.id === tabId
    })));
    props.onTabChange?.(tabId);
  };

  return (
    <TabsPrimitive.Root
      class="w-full"
      value={tabs().find(t => t.active)?.id}
      onChange={handleTabChange}
    >
      <TabsPrimitive.List class="inline-flex h-12 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
        <For each={tabs()}>
          {(tab) => (
            <TabsPrimitive.Trigger
              value={tab.id}
              class={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                tab.active ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-400 hover:text-gray-300"
              )}
            >
              {tab.title}
            </TabsPrimitive.Trigger>
          )}
        </For>
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
};

export default Tabs; 
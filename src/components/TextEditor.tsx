import { Component } from "solid-js";
import { SolidEditorContent, useEditor } from "@vrite/tiptap-solid";
import { Show } from "solid-js";
import { Node } from "@tiptap/core";

// Create the required doc node
const CustomDoc = Node.create({
  name: 'doc',
  topNode: true,
  content: 'paragraph+',
});

// Create the required text node
const CustomText = Node.create({
  name: 'text',
  group: 'inline',
});

// Create a basic paragraph node
const CustomParagraph = Node.create({
  name: 'paragraph',
  group: 'block',
  content: 'text*',
  parseHTML() {
    return [{ tag: 'p' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['p', HTMLAttributes, 0];
  },
});

const TextEditor: Component = () => {
  const editor = useEditor({
    extensions: [
      CustomDoc,
      CustomText,
      CustomParagraph,
    ],
    content: '<p>Hello World!</p>',
    editable: true,
  });

  return (
    <div style={{ padding: "20px" }}>
      <h3>Rich Text Editor</h3>
      <div style={{
        "border": "1px solid #ccc",
        "border-radius": "4px",
        "min-height": "200px",
        "padding": "1rem",
        "background-color": "white"
      }}>
        <Show when={editor()} fallback={<div>Loading editor...</div>}>
          <SolidEditorContent editor={editor()!} />
        </Show>
      </div>
    </div>
  );
};

export default TextEditor; 
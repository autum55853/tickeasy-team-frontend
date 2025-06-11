import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState, FORMAT_TEXT_COMMAND, TextFormatType } from "lexical";
import { Button } from "../ui/button";

const theme = {
  paragraph: "mb-2",
};

interface LexicalEditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
  placeholder?: string;
  className?: string;
}

function InitialContentPlugin({ content }: { content?: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (content) {
      editor.update(() => {
        try {
          const editorState = editor.parseEditorState(content);
          editor.setEditorState(editorState);
        } catch (error) {
          console.warn("Failed to parse initial content:", error);
        }
      });
    }
  }, [editor, content]);

  return null;
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex gap-1 border-b p-2">
      <Button variant="ghost" size="sm" onClick={() => formatText("bold")} className="font-bold">
        B
      </Button>
      <Button variant="ghost" size="sm" onClick={() => formatText("italic")} className="italic">
        I
      </Button>
      <Button variant="ghost" size="sm" onClick={() => formatText("underline")} className="underline">
        U
      </Button>
    </div>
  );
}

export default function LexicalEditor({
  onChange,
  initialContent,
  placeholder = "Start typing...",
  className = "border p-4 rounded min-h-[150px]",
}: LexicalEditorProps) {
  const editorConfig = {
    namespace: "MyEditor",
    theme,
    onError: (error: Error) => {
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={className}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none" />}
          placeholder={<div className="text-gray-400">{placeholder}</div>}
          ErrorBoundary={({ children }) => <div>{children}</div>}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState: EditorState) => {
            editorState.read(() => {
              const json = editorState.toJSON();
              onChange(JSON.stringify(json));
            });
          }}
        />
        <InitialContentPlugin content={initialContent} />
      </div>
    </LexicalComposer>
  );
}

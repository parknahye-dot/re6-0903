import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

function App() {
  const editorRef = useRef();

  const handleSave = () => {
    const editorInstance = editorRef.current.getInstance();
    const markdown = editorInstance.getMarkdown();
    alert(markdown);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">TUI Web Editor + React</h1>
        <Editor
          ref={editorRef}
          initialValue="여기에 내용을 작성하세요 ✨"
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default App;

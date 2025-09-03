// App.jsx
import React, { useRef, useMemo, useCallback, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

function App() {
  const editorRef = useRef();
  const [toastMsg, setToastMsg] = useState("");

  // 저장 로직: 에디터의 마크다운을 읽어 처리
  const handleSave = useCallback(() => {
    const editorInstance = editorRef.current?.getInstance();
    const markdown = editorInstance?.getMarkdown() || "";
    // 사용자의 선호에 맞춰 alert 대신 토스트로 알림, 콘솔에도 출력
    console.log(`[SAVE] Markdown length=${markdown.length}\n---\n${markdown}`);
    setToastMsg("저장 완료! (콘솔에서 내용 확인)");
    // 토스트 1.5초 뒤 자동 닫힘
    setTimeout(() => setToastMsg(""), 1500);
  }, []);

  // 커스텀 툴바 '저장' 버튼 생성
  const saveToolbarItem = useMemo(() => {
    if (typeof document === "undefined") return null;
    const button = document.createElement("button");
    // 기본 아이콘 스타일 클래스를 주되, 텍스트로 '저장' 표시
    button.className = "toastui-editor-toolbar-icons";
    button.style.backgroundImage = "none";
    button.style.fontSize = "12px";
    button.style.padding = "0 8px";
    button.textContent = "저장";
    button.addEventListener("click", () => {
      handleSave();
    });

    return {
      type: "button",
      options: {
        el: button,
        name: "save",
        tooltip: "저장",
      },
    };
  }, [handleSave]);

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
          // 원하는 툴바 구성 + 커스텀 저장 버튼 추가
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "link"],
            ["code", "codeblock"],
            // 오른쪽 끝: 스크롤 동기화 + 저장(커스텀)
            ["scrollSync", saveToolbarItem].filter(Boolean),
          ]}
        />

        {/* 바깥쪽에도 '저장' 버튼 유지 */}
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          저장
        </button>

        {/* 간단 토스트 */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg">
            {toastMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

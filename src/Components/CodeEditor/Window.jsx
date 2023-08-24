import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const Window = ({ defaultValue, setCode, language, theme }) => {
  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        defaultValue={defaultValue}
        theme={theme}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default Window;

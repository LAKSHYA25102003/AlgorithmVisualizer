import React, { useEffect, useState } from "react";
import Window from "./Window";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import Context from "../../Context/Context";
import Footer from "../Footer";
import Select from "react-select";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import CustomInput from "./CustomInput";
import axios from "axios";

const javascriptDefault = `// some comment`;

const Editor = () => {
  const context = useContext(Context);
  const { languageOptions, themes } = context;
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [fontSize, setFontSize] = useState(20);
  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  const classnames = (...args) => {
    return args.join(" ");
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async () => {
    setProcessing(true);
    let data = {
      lang: language.value,
      source: code,
      input: customInput,
    };
    let response = await fetch(
      "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
          "client-secret": "7373e9baadb276d12ba6fd15c34864a8b75656e0",
        },
        body: JSON.stringify(data),
      }
    );
    response = await response.json();
    let compile_status = null;
    let status_update_url = null;
    while (compile_status === null) {
      let result = await fetch(response.status_update_url, {
        method: "get",
        headers: {
          "content-type": "application/json",
          "client-secret": "7373e9baadb276d12ba6fd15c34864a8b75656e0",
        },
      });
      result = await result.json();
      status_update_url = result.status_update_url;
      compile_status = result.result.compile_status;
    }
    if (compile_status !== "OK") {
      setOutputDetails(compile_status);
      setProcessing(false);
      return;
    }
    let run_status = null;
    let runResult = null;
    while (run_status === null) {
      let result = await fetch(status_update_url, {
        method: "get",
        headers: {
          "content-type": "application/json",
          "client-secret": "7373e9baadb276d12ba6fd15c34864a8b75656e0",
        },
      });
      result = await result.json();
      run_status = result.result.run_status.status_detail;
      runResult = result;
    }
    if (runResult.result.run_status.status !== "AC") {
      setOutputDetails(runResult.result.run_status.status);
      return ;
    }
    const outputURL = runResult.result.run_status.output;
    let result=await fetch('https://algo-proxy.onrender.com/proxy?url=' + encodeURIComponent(outputURL));
    result=await result.text();
    setOutputDetails(result);
    setProcessing(false);
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const LanguagesDropdown = ({ onSelectChange }) => {
    return (
      <>
        <div className="w-[150px]">
          <Select
            placeholder={language}
            value={language}
            options={languageOptions}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="text-center text-lg font-bold text-[20px] text-black mb-5">
        Practice Algorithm
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start ">
          <div className="flex justify-between items-center flex-row">
            <div className="px-4 py-2">
              <LanguagesDropdown onSelectChange={onSelectChange} />
            </div>
            <div className="px-4 py-2">
              <Select
                placeholder={theme}
                value={theme}
                options={themes}
                onChange={(e) => setTheme(e.value)}
              />
            </div>
            <input
              type="range"
              min="18"
              max="30"
              value={fontSize}
              step="2"
              onChange={(e) => {
                setFontSize(e.target.value);
              }}
            />
          </div>
          <Window
            setCode={setCode}
            defaultValue="# Enter your code here"
            language={language}
            theme={theme}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;

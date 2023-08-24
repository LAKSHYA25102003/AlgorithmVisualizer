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

  const handleCompile = () => {
    setProcessing(true);
    let data = {
      code: code,
      language: language,
      input: customInput,
    };
    let config = {
      method: "post",
      url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      setProcessing(false);
  };

  const statuses = [
    {
      id: 1,
      description: "In Queue",
    },
    {
      id: 2,
      description: "Processing",
    },
    {
      id: 3,
      description: "Accepted",
    },
    {
      id: 4,
      description: "Wrong Answer",
    },
    {
      id: 5,
      description: "Time Limit Exceeded",
    },
    {
      id: 6,
      description: "Compilation Error",
    },
    {
      id: 7,
      description: "Runtime Error (SIGSEGV)",
    },
    {
      id: 8,
      description: "Runtime Error (SIGXFSZ)",
    },
    {
      id: 9,
      description: "Runtime Error (SIGFPE)",
    },
    {
      id: 10,
      description: "Runtime Error (SIGABRT)",
    },
    {
      id: 11,
      description: "Runtime Error (NZEC)",
    },
    {
      id: 12,
      description: "Runtime Error (Other)",
    },
    {
      id: 13,
      description: "Internal Error",
    },
    {
      id: 14,
      description: "Exec Format Error",
    },
  ];

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
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
        <Select
          placeholder={language}
          value={language}
          options={languageOptions}
          onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
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
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  );
};

export default Editor;

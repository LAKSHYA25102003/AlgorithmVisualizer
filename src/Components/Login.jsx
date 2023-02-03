import React from "react";

function Login() {
  return (
    <div className="w-[100%] min-h-screen  flex justify-center items-center">
      <form className="w-[90%] md:w-[40%] bg-white rounded-sm p-[5px]">
        <div>
            <div className="pt-[3px] pb-[3px] font-bold text-[18px] text-blue-600">Email</div>
            <div className="border-[2px] border-gray-300  rounded-sm" ><input placeholder="abc@mail.com" className="w-[100%] p-[3px] pl-[5px] pr-[5px] outline-none" type="email"  /></div>
        </div>
        <div>
            <div className="pt-[3px] pb-[3px] font-bold text-[18px] text-blue-600">Password</div>
            <div className="border-[2px] border-gray-300  rounded-sm"><input className="w-[100%] p-[3px] pl-[5px] pr-[5px] outline-none" type="email"  /></div>
        </div>
      </form>
    </div>
  );
}

export default Login;

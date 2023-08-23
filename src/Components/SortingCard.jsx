import React from "react";

function SortingCard({algo}) {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-[80%] hover:scale-[1.03] ease-in-out duration-300 cursor-pointer">
        <div class="block  rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div
            class="relative overflow-hidden bg-cover bg-no-repeat"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <img
              class="rounded-t-lg"
              src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
              alt=""
            />
          </div>
          <div class="p-6">
            <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {algo.name}
            </h5>
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {algo.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortingCard;

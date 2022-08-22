import React from "react";

const CourseCard = () => {
  return (
    <>
      <div class="bg-white w-72 shadow-lg rounded-lg">
        <img
          src="https://bigeye.ug/wp-content/uploads/2016/05/Couple-travel.jpg"
          alt=""
          class="w-full h-44 object-cover rounded-t-lg"
        />
        <div class="px-6 py-3">
          <p class="text-gray-800 pt-3 pb-2">March 3 2021</p>
          <h1 class="font-bold text-[20px]">Planning your final summer trip</h1>
          <p class="pt-2 mb-5 text-[15px] text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            labore sint, natus temporibus quas vel.
          </p>
          <a href="" class="py-2 text-red-600 text-[15px]">
            Find out more
          </a>
          <div class="p-1"></div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;

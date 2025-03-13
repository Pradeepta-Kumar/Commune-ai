import React from "react";
import Hero from "@/components/main/Hero";
import Features from "@/components/main/Features";
import Limitations from "@/components/main/Limitations";

const Main = () => {
  // codes to fetch
  return (
    <main className="bg-black text-white px-auto py-4 w-[100%] h-full">
      <Hero />
      <Features />
      <Limitations />
    </main>
  );
};

export default Main;

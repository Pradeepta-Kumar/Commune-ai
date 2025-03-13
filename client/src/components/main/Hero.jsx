import React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Hero = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChat = async () => {
    if (user) {
      navigate("/chat");
    } else {
      toast.error("Not Authenticated!!", {
        description: "Sign-in to use Commune-ai",
      });
    }
  };
  return (
    <div className={`flex flex-col px-20 py-4 items-center justify-center`}>
      <h2 className="text-sm text-gray-200 font-semibold">
        Developed in March 1, 2025
      </h2>
      <h1 className="text-6xl py-8 font-semibold">
        Introducing the Commune-ai
      </h1>
      <div className="text-lg text-gray-100 font-medium w-[45%] gap-3 pt-8">
        We’ve trained a model called Commune-ai which interacts in a
        conversational way. The dialogue format makes it possible for Commune-ai
        to answer followup questions, admit its mistakes, challenge incorrect
        premises, and reject inappropriate requests. <br /> <br /> Commune-ai is
        a sibling model to Gemini-ai⁠, which is trained to follow an instruction
        in a prompt and provide a detailed response. <br /> <br /> We are
        excited to introduce Commune-ai to get users’ feedback and learn about
        its strengths and weaknesses. During the research preview, usage of
        Commune-ai is free. Try it now at Commune-ai.com⁠(opens in a new
        window). <br /> <br />
      </div>
      <div className="flex gap-4 justify-between w-[45%]">
        <p className="bg-white text-black px-3 py-2 rounded-full font-semibold mt-6">
          Login or Sign-up now to get started
        </p>
        <Button
          onClick={handleChat}
          className="bg-white text-black px-3 py-2 rounded-full text-md font-semibold mt-6 flex items-center gap-2"
        >
          Try Commune-ai now <ArrowUp />
        </Button>
      </div>
    </div>
  );
};

export default Hero;

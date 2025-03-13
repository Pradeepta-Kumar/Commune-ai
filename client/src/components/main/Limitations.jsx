import React from "react";
import { ArrowBigRightDash } from "lucide-react";

const Limitations = () => {
  return (
    <div className="bg-black text-white w-full flex flex-col items-center py-10">
      <p className="py-8 text-3xl font-semibold underline">Limitations</p>
      <ul className="w-[50%] mx-auto flex flex-col gap-4 text-lg font-light">
        <li className="flex gap-5">
          <ArrowBigRightDash size={108} />
          ChatGPT sometimes writes plausible-sounding but incorrect or
          nonsensical answers. Fixing this issue is challenging, as: (1) during
          RL training, there’s currently no source of truth; (2) training the
          model to be more cautious causes it to decline questions that it can
          answer correctly; and (3) supervised training misleads the model
          because the ideal answer depends on what the model knows⁠(opens in a
          new window), rather than what the human demonstrator knows.
        </li>
        <li className="flex gap-5">
          <ArrowBigRightDash size={60} />
          ChatGPT is sensitive to tweaks to the input phrasing or attempting the
          same prompt multiple times. For example, given one phrasing of a
          question, the model can claim to not know the answer, but given a
          slight rephrase, can answer correctly.
        </li>
        <li className="flex gap-5">
          <ArrowBigRightDash size={80} />
          The model is often excessively verbose and overuses certain phrases,
          such as restating that it’s a language model trained by OpenAI. These
          issues arise from biases in the training data (trainers prefer longer
          answers that look more comprehensive) and well-known over-optimization
          issues.1, 2
        </li>
        <li className="flex gap-5">
          <ArrowBigRightDash size={40} />
          Ideally, the model would ask clarifying questions when the user
          provided an ambiguous query. Instead, our current models usually guess
          what the user intended.
        </li>
        <li className="flex gap-5">
          <ArrowBigRightDash size={95} />
          While we’ve made efforts to make the model refuse inappropriate
          requests, it will sometimes respond to harmful instructions or exhibit
          biased behavior. We’re using the Moderation API⁠ to warn or block
          certain types of unsafe content, but we expect it to have some false
          negatives and positives for now. We’re eager to collect user feedback
          to aid our ongoing work to improve this system.
        </li>
      </ul>
    </div>
  );
};

export default Limitations;

import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const Features = () => {
  return (
    <div className="bg-black px-20 py-8 mt-8 flex flex-col gap-4 px-auto">
      <h2 className="mx-auto text-4xl font-bold">
        Features to explore with Commune-ai
      </h2>
      <div className="gap-2 justify-between bg-white rounded-5xl p-2 rounded-4xl grid grid-cols-3">
        <Card className="px-4 bg-black text-white">
          <CardTitle className="mx-auto text-xl font-semibold underline">
            Get your codes done
          </CardTitle>
          <CardDescription>
            Fixing code using AI involves using artificial intelligence tools to
            automatically detect, analyze, and resolve issues in software.
            AI-powered systems, like GitHub Copilot or ChatGPT, leverage machine
            learning to identify bugs, suggest fixes, and optimize code quality.
            They can automate repetitive tasks such as refactoring or formatting
            while improving performance and security. By understanding the
            context of the codebase, AI provides accurate and relevant
            recommendations, saving developers time and reducing errors.
          </CardDescription>
        </Card>
        <Card className="px-4 bg-black text-white">
          <CardTitle className="mx-auto text-xl font-semibold underline">
            Get response!
          </CardTitle>
          <CardDescription>
            Getting automated responses using AI involves generating instant,
            contextually relevant replies to user queries through systems like
            chatbots or virtual assistants. AI uses natural language processing
            (NLP) to understand user intent and deliver accurate answers. These
            systems can operate on predefined rules or advanced machine learning
            models like GPT, enabling dynamic and personalized interactions. By
            integrating with databases or APIs, AI provides precise information,
            ensuring efficient and scalable communication.
          </CardDescription>
        </Card>
        <Card className="px-4 bg-black text-white">
          <CardTitle className="mx-auto text-xl font-semibold underline">
            Image and File recognition
          </CardTitle>
          <CardDescription>
            File and image recognition using AI involves the use of advanced
            machine learning and computer vision techniques to identify,
            classify, and analyze files and images. AI models, such as
            convolutional neural networks (CNNs), are trained on large datasets
            to recognize patterns, objects, and features within images or file
            types. For example, image recognition can detect objects, faces, or
            text in photos, while file recognition can classify documents,
            audio, or video based on their content or metadata.
          </CardDescription>
        </Card>
      </div>
    </div>
  );
};

export default Features;

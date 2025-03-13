import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  upload_file,
  add_message,
  fetch_all_messages,
} from "../store/chat-slice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MinusCircle, Search, Smile, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Chat = () => {
  const dispatch = useDispatch();
  const { query, results, file, loading } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadFileURL, setUploadFileURL] = useState("");
  const inputRef = useRef(null);
  const user = useSelector((state) => state.auth);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    let fileSelected = e.target.files[0];
    if (fileSelected) setSelectedFile(fileSelected);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const uploadFileToCloudinary = async () => {
    if (!selectedFile) return;
    dispatch(upload_file(selectedFile)).then((data) => {
      if (data?.payload?.success) {
        setUploadFileURL(data?.payload?.result?.secure_url);
        toast.success("Upload successful!", {
          description: "Successfully uploaded files.",
        });
      } else {
        toast.error("Upload failed!", {
          description: "Failed to upload the files.",
        });
      }
    });
  };

  const handleAddMessage = async () => {
    dispatch(
      add_message({
        userId: user?.user.id,
        query: message,
        file: uploadFileURL,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Message successful!", {
          description: "Successfully added new message.",
        });
        setMessage("");
        dispatch(fetch_all_messages(user?.user?.id));
      } else {
        toast.error("Message failed!", {
          description: "Failed to send new message files.",
        });
      }
    });
  };

  const handleGetMessage = async () => {
    dispatch(fetch_all_messages(user?.user?.id)).then((data) => {
      if (data?.payload?.success) {
        console.log("previous messages:", data);
        toast.success("Fetching successful!", {
          description: "Successfully fetched all messages.",
        });
        setMessage("");
      } else {
        toast.error("Fetching failed!", {
          description: "Failed to fetch all message files.",
        });
      }
    });
  };

  useEffect(() => {
    if (user) handleGetMessage();
  }, [user]);

  return (
    <div className="text-white bg-black w-full h-[100%] relative">
      <div className="flex-grow p-4 overflow-y-auto w-[75%] mx-auto py-24">
        {loading && <p className="text-center">Loading...</p>}
        {query?.map((q, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-end">
              <div className="text-black bg-gray-200 rounded-full px-4 py-2 font-semibold w-fit self-start">
                You: {q}
              </div>
            </div>
            <div className="text-black flex items-start justify-start bg-gray-200 rounded-lg p-2 font-semibold max-w-[60%] w-fit self-end my-6">
              <p><Smile size={20} className="mt-1 mr-1"/> </p>
              {results[index]
                ? results[index]
                    .toString()
                    .replace(/\*/g, "")
                    .split("\n")
                    .map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                : "Waiting for response..."}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center my-4 rounded-full items-center gap-2 border border-white p-1 w-2/3 mx-auto fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white text-black">
        <Label className="bg-black text-white p-2 rounded-full border-white cursor-pointer font-sm">
          <Upload />
          <Input
            type="file"
            className="w-19 bg-black text-white hidden rounded-full border-none"
            ref={inputRef} 
            onChange={handleFileUpload}
            name="file-Upload"
          />
        </Label>
        {selectedFile && (
          <Button
            className="text-white bg-red-500 rounded-full w-10"
            onClick={handleFileRemove}
          >
            <MinusCircle />
          </Button>
        )}
        <Input
          value={message}
          ref={inputRef}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="border-none text-black font-semibold rounded-full"
        />
        <Button
          className="text-white bg-black rounded-full font-light"
          onClick={uploadFileToCloudinary}
        >
          Upload
        </Button>
        <Button
          className="text-white bg-black rounded-full"
          onClick={handleAddMessage}
        >
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default Chat;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sign_in_user } from "@/store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    dispatch(sign_in_user(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Sign-in successful!", {
          description: "Welcome back to Commune-ai.",
        });
        navigate("/chat");
      } else {
        toast.error("Sign-in failed!", {
          description: "Couldn't sign-in to Commune-ai.",
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black gap-20 py-">
      <div className="hidden lg:flex justify-center items-center bg-black w-1/3 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <img
            src="https://img.freepik.com/premium-vector/vision-scope-document-abstract-concept-vector-illustration_107173-25589.jpg"
            alt="Sign-in"
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 py-12 px-8 max-w-md border rounded-lg w-1/3 my-auto h-[75%] gap-5 text-white "
      >
        <h1 className="text-center font-bold text-black text-3xl underline bg-white py-2 border border-black rounded-full">
          Commune-ai
        </h1>
        <div className="text-center text-xl text-gray-300 font-semibold">
          <h2>Welcome back!</h2>
          <p>Sign-in to experience Commune-ai</p>
        </div>

        <Label className="bg-white text-black px-2 py-1 rounded-full flex w-1/5">
          Email I'd
        </Label>
        <Input
          type="email"
          placeholder="Enter your email here"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Label className="bg-white text-black px-2 py-1 rounded-full flex w-1/5">
          Password
        </Label>
        <Input
          type="password"
          placeholder="Enter your password here"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="flex items-center justify-between gap-4">
          <Button
            type="submit"
            className="bg-white text-black px-2 py-1 rounded-full flex w-2/5 cursor-pointer"
          >
            Login
          </Button>
          <p
            className="cursor-pointer text-gray-200 text-sm font-bold"
            onClick={() => navigate("/auth/sign-up")}
          >
            New to Commune-ai ?? Sign-up
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthLogin;

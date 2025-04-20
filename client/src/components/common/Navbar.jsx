import { LogOut, Smile, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, signout_user } from "@/store/auth-slice";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { delete_all_messages } from "@/store/chat-slice";

const Navbar = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(signout_user()).then((data) => {
      if (data?.payload?.success) {
        toast.success("Signed-out successful!", {
          description: "logged out of Commune-ai.",
        });
        navigate("/");
      } else {
        toast.error("Sign-out failed!", {
          description: "Couldn't sign-out of Commune-ai.",
        });
      }
    });
  }

  const handleDeleteMessages = async() => {
    dispatch(delete_all_messages(user?.id)).then(data => {
      if(data?.payload?.success) {
        toast.success("Deletion Successful", {
          description: "All messages deleted successfully!",
        });
      } else {
        toast.error("Deletion Failed", {
          description: "Failed to delete all messages!",
        });
      }
    })
  }

  console.log("User name = ", user?.name);

  return (
    <nav className="bg-black text-white w-full px-4 py-3 top-0 sticky z-50">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={() => naviagte("/")}>
          <Smile size={32} />
          <h1 className="text-xl font-bold">Commune-ai</h1>
        </div>
        {!isAuthenticated ? <Button className="bg-gray-800 font-medium rounded-full hover:bg-white hover:text-black" onClick={() => naviagte("/auth/sign-in")}>
          Sign in
        </Button> :
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-white text-white cursor-pointer">
            <AvatarFallback className=" text-black bg-white font-extrabold">
              {user?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-50 bg-white text-black shadow-lg cursor-none" side="right">
          <DropdownMenuLabel>Logged-in as {user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDeleteMessages} className="cursor-pointer">
            <Trash className="mr-2 h-4 w-4" /> Delete all messages
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>}
      </div>
    </nav>
  );
};

export default Navbar;

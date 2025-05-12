import { FaSpinner } from "react-icons/fa";
import { cn } from "@/lib/utils";

const Loader = ({ size = 24, color = "text-gray-500", className }) => {
  return (
    <div className={cn("flex justify-center items-center min-h-screen", className)}>
      <FaSpinner className={cn(`animate-spin ${color}`)} size={size} />
    </div>
  );
};

export default Loader;
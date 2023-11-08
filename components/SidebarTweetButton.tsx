import useLoginModel from "@/hooks/useLoginModel";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/Fa";


const SidebarTweetButton = () => {

    const router = useRouter();
    const LoginModel = useLoginModel();

    const onClick = useCallback(() => {
        LoginModel.onOpen();
    },[LoginModel]);

    return (
        <div onClick={() => router.push('/')}>
            {/* ye wala to is for mobile first approach */}
            <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover: bg-opacity-80 transition cursor-pointer">
                <FaFeather size={24} color="white" />
            </div>
            <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover: bg-opacity-80 transition cursor-pointer">
               <p className="hidden lg:block text-center font-semibold text-white text-[20px]">

               </p>
            </div>


        </div>
    )
}

export default SidebarTweetButton;
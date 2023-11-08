import useLoginModel from "@/hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "./Input";
import Model from "./Model";
import useRegisterModel from "@/hooks/useRegisterModel";
import { signIn } from "next-auth/react";



const LoginModel = () => {


    const LoginModel = useLoginModel();
    const RegisterModel = useRegisterModel();

    // always remember that we use SQUARE BRACKETS HERE
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);


    
    const onToggle = useCallback(() => {

        RegisterModel.onOpen();
        LoginModel.onClose();

    }, [RegisterModel,LoginModel]);
    

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);


            await signIn('credentials', {
                email, password
            });


            LoginModel.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [LoginModel, email, password]);



    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading} />

            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading} />

        </div>
    )


    
    const FooterContent = (
        <div className="text-neutral-600 text-center mt-4">
            <p>First time?
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline">
                 Create an account
                </span>

            </p>
        </div>

    )




    return (
        <Model disabled={isLoading} isOpen={LoginModel.isOpen} title="Login" actionLabel="Sign in" onClose={LoginModel.onClose} onSubmit={onSubmit} body={bodyContent} />
    )
}

export default LoginModel;
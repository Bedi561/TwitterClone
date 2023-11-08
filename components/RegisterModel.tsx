import useLoginModel from "@/hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "./Input";
import Model from "./Model";
import useRegisterModel from "@/hooks/useRegisterModel";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn} from "next-auth/react";



const RegisterModel = () => {


    const LoginModel = useLoginModel();
    const RegisterModel = useRegisterModel();

    // always remember that we use SQUARE BRACKETS HERE
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);


    const onToggle = useCallback(() => {

        RegisterModel.onClose();
        LoginModel.onOpen();

    }, [RegisterModel,LoginModel]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            
            await axios.post('/api/register', {
                email, password, username, name
            });

            toast.success('Account created');

            signIn('credentials', {
                email, password
            });

            RegisterModel.onClose();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [RegisterModel, email, password, username, name]);



    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading} />
            <Input
                placeholder="Name"
                onChange={(e) => setEmail(e.target.value)}
                value={name}
                disabled={isLoading} />
            <Input
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
                value={username}
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
            <p>Already have an account?
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline">
                 Sign in
                </span>

            </p>
        </div>

    )



    return (
        <Model disabled={isLoading} isOpen={RegisterModel.isOpen} title="Create an account" actionLabel="Register" onClose={RegisterModel.onClose} onSubmit={onSubmit} body={bodyContent} />
    )
}

export default RegisterModel;
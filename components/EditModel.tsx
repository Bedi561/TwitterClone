import { useCallback, useEffect, useState } from "react";

import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModel from "@/hooks/useEditModel";
import useUser from "@/hooks/useUsers";
import Input from "./Input";
import Model from "./Model";
import axios from "axios";
import toast from "react-hot-toast";



const EditModel = () => {
    const {data: currentUser} = useCurrentUser();
    const {mutate: mutateFetchedUser} = useUser(currentUser ?.id);
    const editModel = useEditModel();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser ?.profileImage);
        setCoverImage(currentUser ?.coverImage);
        setName(currentUser ?.name);
        setUsername(currentUser ?.username);
        setBio(currentUser ?.bio);
    }, [currentUser]);


    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true);
            await axios.patch('/api/edit', {
                name, username, bio, profileImage, coverImage
            });

            mutateFetchedUser();

            toast.success('Updated');
          
        } catch(error){
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    },[bio, profileImage, coverImage, username, name, mutateFetchedUser]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder='Name' onChange={(e) =>setName(e.target.value)} value={name} disabled={isLoading} />
            
            <Input placeholder='Username' onChange={(e) =>setUsername(e.target.value)} value={username} disabled={isLoading} />

            <Input placeholder='Bio' onChange={(e) =>setBio(e.target.value)} value={bio} disabled={isLoading} />

        </div>
    )
    return(
        <Model 
            disabled={isLoading}
            isOpen={editModel.isOpen}
            title='Edit your profile'
            actionLabel='Save'
            onSubmit={onSubmit}
            body={bodyContent} 
            onClose={function (): void {
                throw new Error("Function not implemented.");
            } }        
        />
    )
}

export default EditModel;
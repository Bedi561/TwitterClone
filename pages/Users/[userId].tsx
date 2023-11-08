// first do a npm install react spinners
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';


import Header from '@/components/Header';
import useUser from '@/hooks/useUsers';
import UserHero from '@/components/UserHero';
import UserBio from '@/components/UserBio';


const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;

    const { data: fetchedUser, isLoading } = useUser(userId as string);
    if (isLoading || !fetchedUser) {
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color='Lightblue' size={80} />
            </div>
        )
    }


    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userId as string}/>
            <UserBio userId={userId as string}/>
        </>
    );
}

export default UserView;

import {BsBellFill, BsHouseFill} from 'react-icons/bs';
import {FaUser} from 'react-icons/Fa'; 
import SidebarLogo from "./SidebarLogo";
import SidebarItem from './SidebarItem';
import {BiLogOut} from 'react-icons/bi';
import { IconBaseProps } from 'react-icons';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';



const Sidebar = () => {
    
    const {data: currentUser} = useCurrentUser();
    const items =[
        {
            label: 'home',
            href: '/',
            icons: BsHouseFill
        },
        {
            label: 'Notifications',
            href: '/',
            icon: BsBellFill
        },
        {
            label: 'Profile',
            href: '/',
            icon: FaUser
        }

    ];
    return (
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <SidebarLogo/>
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon} auth={false}/>
                    ))}
                    {currentUser && (
                    <SidebarItem onClick={() => signOut} icon={BiLogOut} label='Logout' href={''} auth={false}/>
                    )}
                    <SidebarTweetButton/>

                </div>

            </div>

        </div>
    );
}

export default Sidebar;
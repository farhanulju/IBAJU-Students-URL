import Link from "next/link";
import * as Dialog from '@radix-ui/react-dialog';
import { Wand, Link2, BarChart, CircleDot, Settings2 } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import UserAccountNav from "@/components/utils/usernavbutton";
import ShareButton from "@/components/utils/share-button";
import SiteHeader from "./main-nav";
import ShareModal from "@/components/shared/modals/share-modal";

const items = [
    {
        title: "Links",
        href: "/admin",
        icon: <Link2 color="black" size={18} />  
    },

    {
        title: "Customize",
        href: "/customize",
        icon: <CircleDot size={18} />
    },

    {
        title: "Analytics",
        href: "/analytics",
        icon: <BarChart color="black" size={18} />  
    },
    {
        title: "Settings",
        href: "/settings",
        icon: <Settings2 color="black" size={18} />  
    },
]

const Navbar = ({ showName = false }) => {

    const session  = useSession();

    return (    

        <>
            <header className="sticky top-0 w-[100vw] border-b border-b-slate-200 bg-white">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-6 items-center">
                        <Wand color="black" size={30} />
                        <div className="hidden sm:flex sm:items-center sm:space-x-6">
                            {
                                !showName ? items.map((item) => (
                                    <>
                                        <nav key={item.title} className="rounded-xl">
                                            <Link href={item.href} >
                                                <div className="bg-transparent p-2 flex space-x-2 items-center hover:bg-slate-100 rounded-xl">
                                                    {item.icon} 
                                                    <span className="">{item.title}</span>
                                                </div>
                                            </Link>
                                        </nav>
                                    </>
                                )) : <SiteHeader />                   
                            }
                        </div>
                    </div>
                       
                    <div className="flex items-center">
                            {
                                 session.status === "authenticated" ? (
                                        <div className="flex items-center gap-2">
                                            <Dialog.Root>
                                                <Dialog.Trigger >
                                                    <ShareButton />
                                                </Dialog.Trigger>
                                                <ShareModal />
                                            </Dialog.Root>
                                            <UserAccountNav  />
                                        </div>
                                ) : (
                                    <div className="">
                                        <Link href="/register">
                                            <button className="flex items-center justify-center gap-2 text-white 
                                                bg-slate-900 h-11 px-8 rounded-md hover:bg-slate-700 
                                                "> 
                                                Sign In <ArrowRight size={18} color="white" />
                                            </button>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                </div>
            </header>

        </>
    );
}
 
export default Navbar;
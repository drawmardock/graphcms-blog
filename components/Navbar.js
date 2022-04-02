import React, {useState} from 'react'
import { Transition } from "@headlessui/react";
import localLogo from "../public/logo.png";
import HomeLogo from "../public/home.png";
import TwiterLogo from "../public/twitter.png";
import FacebookLogo from "../public/facebook.png";
import InstagramLogo from "../public/instagram.png";
import Image from "next/image";
import Link from 'next/link';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>





        
            <nav className=" relative
    w-full
    items-center
    justify-between
    py-2
    px-8
    bg-gray-100
    text-gray-500
    hover:text-gray-700
    focus:text-gray-700
    shadow-lg
    navbar navbar-expand-lg navbar-light">
            <div className="">
                <div className="flex items-center px-20  py-4 justify-between w-full flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="flex px-8 items-center justify-between w-full ">
                        <div className="text-sm lg:flex-grow">
                            <Link href="/">
                            <Image className="cursor-pointer" src={localLogo}
                            width="146.8"
                            height="41.8"
                            alt="logo" />

                            </Link >

                        </div>
                        <div className=" space-x-8 mx-auto  float-right hidden  md:flex lg:flex space-between">
                            <div className="px-4">
                            <Link  href="/">
                            <Image className="cursor-pointer my-3" src={HomeLogo}
                            width="40"
                            height="40"
                            alt="Home logo" />
                            </Link >
                            </div> 

                            <div className="px-4">
                                <Link  href="/">
                            <Image className="cursor-pointer" src={TwiterLogo}
                            width="40"
                            height="40"
                            alt="twitter" />
                            </Link >
                            </div>

                            <div className="px-4">
                            <Link  href="/">
                            <Image className="cursor-pointer" src={FacebookLogo}
                            width="40"
                            height="40"
                            alt="facebook" />
                            </Link >
                            </div>

                            <div className="px-4">
                            <Link  href="/">
                            <Image className="cursor-pointer" src={InstagramLogo}
                            width="40"
                            height="40"
                            alt="instagram" />
                            </Link >
                            </div>

                        </div>

                    </div>
                    <div className="block md:hidden float-right">
                    <button
								onClick={() => setIsOpen(!isOpen)}
								type="button"
								className=""
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								{!isOpen ? (
									<svg
										className="block h-6 w-6 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								) : (
									<svg
										className="block h-6 w-6 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								)}
							</button>

                    </div>


                </div>
            </div>
            <Transition show={isOpen}
            enter="transition ease-out duration-100 transform" 
            enterForm="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveForm="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="md:hidden flex items-center id=mobile-menu">
                        <div ref={ref} className="flex sm:px-3 space-x-8 mx-auto md:block float-right">
                        <div className="px-4">
                            <Link  href="/">
                            <Image className="cursor-pointer my-3" src={HomeLogo}
                           width="60"
                           height="60"
                            alt="Home logo" />
                            </Link >
                            </div> 

                            <div className="px-4">
                                <Link  href="/">
                            <Image className="cursor-pointer" src={TwiterLogo}
                           width="60"
                           height="60"
                            alt="twitter" />
                            </Link >
                            </div>

                            <div className="px-4">
                            <Link  href="/">
                            <Image className="cursor-pointer" src={FacebookLogo}
                            width="60"
                            height="60"
                            alt="facebook" />
                            </Link >
                            </div>

                            <div className="px-4">
                            <Link  href="/">
                            <Image className="cursor-pointer" src={InstagramLogo}
                            width="60"
                            height="60"
                            alt="instagram" />
                            </Link >
                            </div>
                            </div>

                    </div>
                )

                }

            </Transition>

        </nav>
    </div>
  )
}

export default Navbar
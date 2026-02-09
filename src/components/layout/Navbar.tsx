"use client";

import { CircleUser, Loader2, Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "/" },

    {
      title: "Meals",
      url: "/meals",
    },
    {
      title: "Providers",
      url: "/providers",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const [trigger, setTrigger] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const userData = session?.user;

  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <span className="text-2xl font-bold">Food</span>
              <span className="text-[#e95393] -m-2 text-3xl font-bold">
                Hub
              </span>
            </a>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu?.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            {userData && (
              <div className="flex items-center gap-1">
                <Image
                  src="https://img.icons8.com/?size=64&id=23392&format=png"
                  width={25}
                  height={20}
                  alt=""
                />

                <DropdownMenu onOpenChange={setTrigger}>
                  <DropdownMenuTrigger asChild>
                    <Button className="-m-4 cursor-pointer text-[18px] focus-visible:ring-0">
                      {userData && userData?.name}

                      <IoIosArrowDown
                        className={`transform transition-transform duration-300 text-[#FF4F00] ${trigger ? " rotate-180" : "rotate-0 "}`}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-5 bg-[#ffff] border-0">
                    <DropdownMenuGroup className="space-y-3">
                      <DropdownMenuLabel className="cursor-pointer hover:bg-[#ffdddd] rounded px-5 text-lg font-semibold flex items-center gap-2">
                        <CircleUser />
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuLabel className="cursor-pointer hover:bg-[#ffdddd] rounded px-5 text-lg font-semibold flex items-center gap-2">
                        <FaRegEdit />
                        Edit Profile
                      </DropdownMenuLabel>
                      <DropdownMenuLabel className="hover:bg-[#ffdddd] rounded px-5 flex items-center gap-2">
                        <MdLogout className="text-lg font-semibold" />
                        <Button
                          onClick={async () => {
                            await authClient.signOut();
                          }}
                          className="text-lg font-semibold cursor-pointer"
                        >
                          Logout
                        </Button>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>
        {isPending && (
          <div className="py-20 flex justify-center items-center">
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            ) : (
              ""
            )}
          </div>
        )}
        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                     
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu?.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {userData && (
                    <div className="flex items-center gap-1">
                      <Image
                        src="https://img.icons8.com/?size=64&id=23392&format=png"
                        width={25}
                        height={20}
                        alt=""
                      />

                      <DropdownMenu onOpenChange={setTrigger}>
                        <DropdownMenuTrigger asChild>
                          <Button className="-m-4 cursor-pointer text-[18px] focus-visible:ring-0">
                            {userData && userData?.name}

                            <IoIosArrowDown
                              className={`transform transition-transform duration-300 text-[#FF4F00] ${trigger ? " rotate-180" : "rotate-0 "}`}
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-5 bg-[#ffdddd]">
                          <DropdownMenuGroup className="space-y-3">
                            <DropdownMenuLabel className="cursor-pointer hover:bg-[#ffdddd] rounded px-5 text-lg font-semibold flex items-center gap-2">
                              <CircleUser />
                              My Account
                            </DropdownMenuLabel>
                            <DropdownMenuLabel className="cursor-pointer hover:bg-[#ffdddd] rounded px-5 text-lg font-semibold flex items-center gap-2">
                              <FaRegEdit />
                              Edit Profile
                            </DropdownMenuLabel>
                            <DropdownMenuLabel className="hover:bg-[#ffdddd] rounded px-5 flex items-center gap-2">
                              <MdLogout className="text-lg font-semibold" />
                              <Button
                                onClick={async () => {
                                  await authClient.signOut();
                                }}
                                className="text-lg font-semibold cursor-pointer"
                              >
                                Logout
                              </Button>
                            </DropdownMenuLabel>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}> {item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

export { Navbar };

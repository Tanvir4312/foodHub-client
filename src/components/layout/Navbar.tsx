"use client";

import { Menu, ShoppingCart } from "lucide-react";
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
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdDashboardCustomize, MdLogout } from "react-icons/md";
import { getCartCountAction } from "@/action/addToCart.action";
import CartData from "../modules/cartData/cartData";
import { RoutesType } from "@/types/routes.type";
import { Roles } from "@/constrants/roles";
import { adminRoute } from "@/routes/adminRoute";
import { providerRoute } from "@/routes/providerRoute";
import { customerRoute } from "@/routes/customerRoute";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
    { title: "Meals", url: "/meals" },
    { title: "Restaurants", url: "/restaurant" },
    { title: "Review", url: "/reviews" },
    { title: "Blogs", url: "/blogs" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const [trigger, setTrigger] = useState(false);
  const { data: session } = authClient.useSession();
  const [count, setCount] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const router = useRouter();

  const userData = session?.user;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sessionRole = (session?.user as any)?.role;

  useEffect(() => {
    const fetchCount = async () => {
      const { data: cartCount } = await getCartCountAction();
      setCount(typeof cartCount === "object" ? cartCount?.count : cartCount);
    };

    fetchCount();
    window.addEventListener("cartUpdated", fetchCount);
    return () => window.removeEventListener("cartUpdated", fetchCount);
  }, []);

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    }


    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);
  useEffect(() => {
    const checkMediumScreen = () => {
      setIsMedium(window.innerWidth < 1024);
    }


    checkMediumScreen();
    window.addEventListener("resize", checkMediumScreen);

    return () => {
      window.removeEventListener("resize", checkMediumScreen);
    };
  }, []);


  let routes: RoutesType = [];

  if (sessionRole === Roles.admin) {
    routes = adminRoute;
  } else if (sessionRole === Roles.provider) {
    routes = providerRoute;
  } else if (sessionRole === Roles.customer) {
    routes = customerRoute;
  } else {
    routes = [];
  }

  return (
    <div className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-50 py-0 dark:bg-[#0a0a0a] dark:border-slate-800 transition-colors duration-300">
      <section
        className={cn(
          "max-w-7xl mx-auto px-4 lg:px-0",
          className
        )}
      >
        <div className="container">
          {/* Desktop Menu */}
          <nav className="hidden items-center justify-between lg:flex h-[68px]">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <a href={logo.url} className="flex items-center gap-0">
                <span className="text-2xl font-bold tracking-tight text-gray-900">
                  Food
                </span>
                <span className="text-2xl font-bold tracking-tight text-[#f54a00]">
                  Hub
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f54a00] mb-0.5 ml-0.5 self-end" />
              </a>

              <div className="flex items-center gap-5">
                <NavigationMenu>
                  <NavigationMenuList>
                    {menu?.map((item) => renderMenuItem(item))}
                    <div className="flex gap-8 items-center text-sm opacity-90">


                      <div className="ml-3">
                        {
                          sessionRole === Roles.customer &&
                          <div className="flex gap-6 items-center">
                            <Link href="/customer-dashboard">My Orders</Link>
                            <Link href="/customer-dashboard/my-reviews">My Reviews</Link>
                          </div>
                        }
                        {
                          sessionRole === Roles.provider &&
                          <div className="flex gap-6 items-center">
                            <Link href="/provider-dashboard/incoming-order">Incoming Order</Link>
                            <Link href="/provider-dashboard/stats">Stats</Link>
                          </div>
                        }
                        {
                          sessionRole === Roles.admin &&
                          <div className="flex gap-6 items-center">
                            <Link href="/admin-dashboard">Dashboard</Link>
                          </div>
                        }
                      </div>
                    </div>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              {userData && (
                <div className="flex items-center gap-1">
                  <Image
                    src="https://img.icons8.com/?size=64&id=23392&format=png"
                    width={25}
                    height={20}
                    alt=""
                    unoptimized
                  />

                  <DropdownMenu onOpenChange={setTrigger}>
                    <DropdownMenuTrigger asChild>
                      <Button className="cursor-pointer text-[15px] font-semibold text-gray-800 dark:text-slate-200 bg-transparent hover:bg-orange-50 dark:hover:bg-slate-800 border border-transparent hover:border-orange-200 dark:hover:border-slate-700 rounded-xl px-3 h-9 focus-visible:ring-0 shadow-none gap-1.5">
                        {userData && userData?.name}
                        <IoIosArrowDown
                          className={`transform transition-transform duration-300 text-[#f54a00] ${trigger ? "rotate-180" : "rotate-0"
                            }`}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-3 bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 shadow-lg rounded-2xl min-w-[200px]">
                      <DropdownMenuGroup className="space-y-1">
                        <DropdownMenuLabel className="cursor-pointer hover:bg-orange-50 hover:text-[#f54a00] rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 text-gray-700 transition-colors">
                          <Link
                            href={`/profile`}
                            className="flex items-center gap-2 w-full"
                          >
                            <ImProfile className="text-[#f54a00]" />
                            My Profile
                          </Link>
                        </DropdownMenuLabel>

                        {sessionRole === Roles.provider && (
                          <DropdownMenuLabel className="cursor-pointer hover:bg-orange-50 hover:text-[#f54a00] rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 text-gray-700 transition-colors">
                            <Link
                              href={`/providerProfile`}
                              className="flex items-center gap-2 w-full"
                            >
                              <ImProfile className="text-[#f54a00]" />
                              Provider's Profile
                            </Link>
                          </DropdownMenuLabel>
                        )}

                        <DropdownMenuLabel className="cursor-pointer hover:bg-orange-50 hover:text-[#f54a00] rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 text-gray-700 transition-colors">
                          <MdDashboardCustomize className="text-[#f54a00]" />
                          {routes.map((item, idx) => {
                            if (idx === 0) {
                              return (
                                <Link key={idx} href={item.url}>
                                  Dashboard
                                </Link>
                              );
                            }
                            return null;
                          })}
                        </DropdownMenuLabel>


                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              <ThemeToggle />

              {userData ? (
                <Button
                  className="cursor-pointer bg-[#f54a00] hover:bg-[#d93e00] text-white rounded-xl h-9 px-4 text-sm font-semibold shadow-sm hover:shadow-orange-200 hover:shadow-md transition-all"
                  size="sm"
                  onClick={async () => {
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.refresh();
                        },
                      },
                    });
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-gray-200 hover:border-[#f54a00] hover:text-[#f54a00] rounded-xl h-9 px-4 text-sm font-semibold transition-all"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
              )}

              {/* Cart Button */}

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="relative border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#f54a00] dark:hover:border-[#f54a00] hover:bg-orange-50 dark:hover:bg-slate-800 w-10 h-10 rounded-xl p-0 flex items-center justify-center text-gray-700 dark:text-slate-300 hover:text-[#f54a00] transition-all shadow-none">
                    <ShoppingCart size={20} />
                    {count ? (
                      <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-[#f54a00] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {count}
                      </span>
                    ) : null}
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col h-full p-0 dark:bg-[#0a0a0a] dark:border-slate-800">
                  <SheetHeader className="p-6 border-b dark:border-slate-800 shrink-0">
                    <SheetTitle className="flex items-center gap-2">
                      <ShoppingCart className="text-[#f54a00]" /> Your Cart ({count})
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-50/30 dark:bg-[#0a0a0a]">
                    <CartData />
                  </div>
                </SheetContent>
              </Sheet>

            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between h-[60px]">
              <Sheet open={(isOpenCart && isMobile) || (isOpenCart && isMedium)} onOpenChange={setIsOpenCart}>
                <SheetTrigger asChild>
                  <Button className="relative border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#f54a00] hover:bg-orange-50 dark:hover:bg-slate-800 w-10 h-10 rounded-xl p-0 flex items-center justify-center text-gray-700 dark:text-slate-300 hover:text-[#f54a00] transition-all shadow-none">
                    <ShoppingCart size={20} />
                    {count ? (
                      <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-[#f54a00] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {count}
                      </span>
                    ) : null}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="dark:bg-[#0a0a0a] dark:border-slate-800">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <ShoppingCart className="text-[#f54a00]" /> Your Cart ({count})
                    </SheetTitle>
                    <div>

                      <CartData />
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              {/* Mobile Logo */}
              <a href={logo.url} className="flex items-center gap-0">
                <span className="text-xl font-bold tracking-tight text-gray-900">Food</span>
                <span className="text-xl font-bold tracking-tight text-[#f54a00]">Hub</span>
                <span className="w-1 h-1 rounded-full bg-[#f54a00] mb-0.5 ml-0.5 self-end" />
              </a>


              <div className="flex items-center gap-3">
                <div className="flex justify-start">
                  <ThemeToggle />
                </div>
                <Sheet open={(isOpen && isMobile) || (isOpen && isMedium)} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-200 hover:border-[#f54a00] hover:text-[#f54a00] rounded-xl transition-all"
                    >
                      <Menu className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto dark:bg-[#0a0a0a] dark:border-slate-800">
                    <SheetHeader>
                      <SheetTitle>
                        <a href={logo.url} className="flex items-center gap-0">
                          <span className="text-xl font-bold text-gray-900">Food</span>
                          <span className="text-xl font-bold text-[#f54a00]">Hub</span>
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
                        <div className="font-semibold text-[14px]">




                          {
                            sessionRole === Roles.customer &&
                            <div className="flex flex-col gap-6">
                              <Link href="/customer-dashboard">My Orders</Link>
                              <Link href="/customer-dashboard/my-reviews">My Reviews</Link>
                            </div>
                          }
                          {
                            sessionRole === Roles.provider &&
                            <div className="flex flex-col gap-6">
                              <Link href="/provider-dashboard/incoming-order">Incoming Order</Link>
                              <Link href="/provider-dashboard/stats">Stats</Link>
                            </div>
                          }
                          {
                            sessionRole === Roles.admin &&
                            <div className="flex flex-col gap-6">
                              <Link href="/admin-dashboard">Dashboard</Link>
                            </div>
                          }
                        </div>

                      </Accordion>

                      {userData && (
                        <div className="flex items-center">
                          <Image
                            src="https://img.icons8.com/?size=64&id=23392&format=png"
                            width={25}
                            height={20}
                            alt=""
                          />

                          <DropdownMenu onOpenChange={setTrigger}>
                            <DropdownMenuTrigger asChild>
                              <Button className="cursor-pointer text-[15px] font-semibold text-gray-800 dark:text-slate-200 bg-transparent hover:bg-orange-50 dark:hover:bg-slate-800 border border-transparent hover:border-orange-200 dark:hover:border-slate-700 h-9 focus-visible:ring-0 shadow-none px-0 py-0">
                                {userData && userData?.name}
                                <IoIosArrowDown
                                  className={`transform transition-transform duration-300 text-[#f54a00] ${trigger ? "rotate-180" : "rotate-0"
                                    }`}
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="p-3 bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 shadow-lg rounded-2xl min-w-[200px]">
                              <DropdownMenuGroup className="space-y-1">
                                <DropdownMenuLabel className="cursor-pointer hover:bg-orange-50 hover:text-[#f54a00] rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 text-gray-700 transition-colors">
                                  <Link
                                    href={`/profile`}
                                    className="flex items-center gap-2 w-full"
                                  >
                                    <FaRegEdit className="text-[#f54a00]" />
                                    My Profile
                                  </Link>
                                </DropdownMenuLabel>

                                {sessionRole === Roles.provider && (
                                  <DropdownMenuLabel className="cursor-pointer hover:bg-orange-50 hover:text-[#f54a00] rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 text-gray-700 transition-colors">
                                    <Link
                                      href={`/providerProfile`}
                                      className="flex items-center gap-2 w-full"
                                    >
                                      <ImProfile className="text-[#f54a00]" />
                                      Provider's Profile
                                    </Link>
                                  </DropdownMenuLabel>
                                )}

                                <DropdownMenuLabel className="cursor-pointer hover:bg-orange-50 hover:text-[#f54a00] rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 text-gray-700 transition-colors">
                                  {userData && (
                                    <>
                                      <MdDashboardCustomize className="text-[#f54a00]" />
                                      {routes.map((item, idx) => {
                                        if (idx === 0) {
                                          return (
                                            <Link key={idx} href={item.url}>
                                              Dashboard
                                            </Link>
                                          );
                                        }
                                        return null;
                                      })}
                                    </>
                                  )}
                                </DropdownMenuLabel>

                              </DropdownMenuGroup>
                              <DropdownMenuSeparator />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}



                      <div className="flex flex-col gap-3">
                        {userData ? (
                          <Button
                            className="cursor-pointer bg-[#f54a00] hover:bg-[#d93e00] text-white rounded-xl h-9 px-4 text-sm font-semibold shadow-sm hover:shadow-orange-200 hover:shadow-md transition-all"
                            size="sm"
                            onClick={async () => {
                              await authClient.signOut({
                                fetchOptions: {
                                  onSuccess: () => {
                                    router.refresh();
                                  },
                                },
                              });
                            }}
                          >
                            Logout
                          </Button>
                        ) : (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-gray-200 dark:border-slate-700 dark:bg-transparent dark:text-slate-300 hover:border-[#f54a00] hover:text-[#f54a00] rounded-xl h-9 px-4 text-sm font-semibold transition-all"
                          >
                            <Link href={auth.login.url}>{auth.login.title}</Link>
                          </Button>
                        )}


                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        href={item.url}
        className="group inline-flex h-9 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 transition-all hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#f54a00]"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <a
      key={item.title}
      href={item.url}
      className="text-sm font-semibold text-gray-700 dark:text-slate-300 hover:text-[#f54a00] dark:hover:text-[#f54a00] transition-colors py-1"
    >
      {item.title}
    </a>
  );
};

export { Navbar };

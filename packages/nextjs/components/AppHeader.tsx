import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaucetButton, RainbowKitCustomConnectButton } from "./scaffold-eth";
import { Button } from "./shad/ui/button";
import { useSidebar } from "./shad/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { NextPage } from "next";
import { hardhat } from "viem/chains";
import { Bars3Icon, BugAntIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { useIsMobile } from "~~/hooks/shad/use-mobile";

type AppHeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const menuLinks: AppHeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },

  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      <Link href="/" passHref className="flex items-center gap-2 mr-2 shrink-0">
        <div className="flex relative w-10 h-10">
          <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold leading-tight">Scaffold-ETH</span>
          <span className="text-xs">Ethereum dev stack</span>
        </div>
      </Link>

      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href}>
            <Button variant={isActive ? "default" : "outline"}
            className={isActive ? "bg-secondary" : ""}
            >
              {icon}
              <span>{label}</span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

// Site header
const AppHeader: NextPage = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <header className="border-b p-4 flex justify-between bg-base-100">
      {isMobile ? (
        <Button onClick={toggleSidebar} className="bg-secondary">
          <Bars3Icon className="h-1/2" />
        </Button>
      ) : (
        <HeaderMenuLinks />
      )}

      <div className="flex justify-center gap-2">
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={toggleSidebar}>tu cuenta</Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}

        <RainbowKitCustomConnectButton />
        {isLocalNetwork && <FaucetButton />}
      </div>
    </header>
  );
};

export default AppHeader;

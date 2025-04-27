import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { hardhat } from "viem/chains";
import { FaucetButton, RainbowKitCustomConnectButton } from "./scaffold-eth";
import { Button } from "./shad/ui/button";
import { useSidebar } from "./shad/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { NextPage } from "next";
import { BugAntIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

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
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href}>
            <Button>
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

  const { open, toggleSidebar } = useSidebar();


  //states
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));

    return () => window.removeEventListener("resize", () => setScreenWidth(window.innerWidth));
  }, []);

  return (
    <header className="border-b p-4 flex justify-between">
      {screenWidth <= 800 && <Button onClick={toggleSidebar}>Abre el sidebar</Button>}
      <HeaderMenuLinks />

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

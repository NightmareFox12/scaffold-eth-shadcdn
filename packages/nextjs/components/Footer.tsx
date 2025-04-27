import Link from "next/link";
import { Button } from "./shad/ui/button";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <Button variant="outline" className="flex items-center gap-2 cursor-default">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span>{nativeCurrencyPrice.toFixed(2)}</span>
              </Button>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Link href="/blockexplorer" passHref className="btn btn-primary btn-sm font-normal gap-1">
                  <Button className="flex items-center gap-2">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <span>Block Explorer</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          <SwitchTheme />
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-center items-center gap-2 text-sm w-full">
          <a href="https://github.com/scaffold-eth/se-2" target="_blank" rel="noreferrer" className="underline">
            Fork me
          </a>

          <span>·</span>

          <div className="flex justify-center items-center gap-2">
            <p className="m-0 text-center">
              Built with <HeartIcon className="inline-block h-4 w-4" /> at
            </p>
            <a
              className="flex justify-center items-center gap-1"
              href="https://buidlguidl.com/"
              target="_blank"
              rel="noreferrer"
            >
              <BuidlGuidlLogo className="w-4 h-4" />
              <span className="underline">BuidlGuidl</span>
            </a>
          </div>
          <span>·</span>
          <div className="text-center">
            <a
              href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

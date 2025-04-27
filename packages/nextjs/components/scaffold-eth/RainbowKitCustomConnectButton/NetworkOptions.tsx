import { useTheme } from "next-themes";
import { useAccount, useSwitchChain } from "wagmi";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "~~/components/shad/button";
import { getNetworkColor } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const allowedNetworks = getTargetNetworks();

type NetworkOptionsProps = {
  hidden?: boolean;
};

export const NetworkOptions = ({ hidden = false }: NetworkOptionsProps) => {
  const { switchChain } = useSwitchChain();
  const { chain } = useAccount();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <>
      {allowedNetworks
        .filter(allowedNetwork => allowedNetwork.id !== chain?.id)
        .map(allowedNetwork => (
          <li key={allowedNetwork.id} className={`${hidden ? "hidden" : ""} list-none`}>
            <Button
              variant="ghost"
              className="w-full"
              // className="menu-item btn-sm !rounded-xl flex gap-3  whitespace-nowrap"
              onClick={() => {
                switchChain?.({ chainId: allowedNetwork.id });
              }}
            >
              <div className="flex flex-1 items-center gap-3">
                <ArrowsRightLeftIcon className="h-4 w-4" />
                <span>
                  Switch to{" "}
                  <span
                    style={{
                      color: getNetworkColor(allowedNetwork, isDarkMode),
                    }}
                  >
                    {allowedNetwork.name}
                  </span>
                </span>
              </div>
            </Button>
          </li>
        ))}
    </>
  );
};

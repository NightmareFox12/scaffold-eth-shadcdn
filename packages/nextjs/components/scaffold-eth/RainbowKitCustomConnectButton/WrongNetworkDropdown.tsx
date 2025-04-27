import { NetworkOptions } from "./NetworkOptions";
import { LogOut } from "lucide-react";
import { useDisconnect } from "wagmi";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/shad/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~~/components/shad/ui/popover";

export const WrongNetworkDropdown = () => {
  const { disconnect } = useDisconnect();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="destructive" className="w-full">
          <span>Wrong network</span>
          <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="p-2  me-4">
        <NetworkOptions />

        <Button variant="ghost" className="w-full" onClick={() => disconnect()}>
          <div className="flex flex-1 items-center gap-2">
            <LogOut className="h-4 w-4 stroke-error" />
            <span className="text-error">Disconnect</span>
          </div>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

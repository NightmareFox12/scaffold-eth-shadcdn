import { NetworkOptions } from "./NetworkOptions";
import { LogOut } from "lucide-react";
import { useDisconnect } from "wagmi";
import { ArrowLeftOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/shad/button";
import { Popover, PopoverContent, PopoverTrigger } from "~~/components/shad/popover";

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

    // <div className="dropdown dropdown-end mr-2">
    //   <label tabIndex={0} className="btn btn-error btn-sm dropdown-toggle gap-1">
    //     <span>Wrong network</span>
    //     <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
    //   </label>
    //   <ul
    //     tabIndex={0}
    //     className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
    //   >
    //     <NetworkOptions />
    //     <li>
    //       <button
    //         className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
    //         type="button"
    //         onClick={() => disconnect()}
    //       >
    //         <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />
    //         <span>Disconnect</span>
    //       </button>
    //     </li>
    //   </ul>
    // </div>
  );
};

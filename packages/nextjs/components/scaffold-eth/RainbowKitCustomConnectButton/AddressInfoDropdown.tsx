import { useRef, useState } from "react";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { NetworkOptions } from "./NetworkOptions";
import { LogOut } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { getAddress } from "viem";
import { Address } from "viem";
import { useDisconnect } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { BlockieAvatar, isENS } from "~~/components/scaffold-eth";
import { Button } from "~~/components/shad/button";
import { Popover, PopoverContent, PopoverTrigger } from "~~/components/shad/popover";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const allowedNetworks = getTargetNetworks();

type AddressInfoDropdownProps = {
  address: Address;
  blockExplorerAddressLink: string | undefined;
  displayName: string;
  ensAvatar?: string;
};

export const AddressInfoDropdown = ({
  address,
  ensAvatar,
  displayName,
  blockExplorerAddressLink,
}: AddressInfoDropdownProps) => {
  const { disconnect } = useDisconnect();
  const checkSumAddress = getAddress(address);

  //states
  const [addressCopied, setAddressCopied] = useState<boolean>(false);
  const [selectingNetwork, setSelectingNetwork] = useState<boolean>(false);
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    setSelectingNetwork(false);
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  return (
    <>
      <AddressQRCodeModal address={address} qrCodeModalOpen={qrCodeModalOpen} setQrCodeModalOpen={setQrCodeModalOpen} />

      <Popover>
        <PopoverTrigger asChild>
          <Button className="">
            <BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar} />
            <span className="ml-2 mr-1">
              {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
            </span>
            <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="p-2  me-4">
          <NetworkOptions hidden={!selectingNetwork} />

          <Button variant="ghost" className="w-full">
            <CopyToClipboard
              text={checkSumAddress}
              onCopy={() => {
                setAddressCopied(true);
                setTimeout(() => {
                  setAddressCopied(false);
                }, 800);
              }}
            >
              <div className="flex flex-1 items-center gap-2">
                {!addressCopied ? (
                  <>
                    <DocumentDuplicateIcon className=" h-4 w-4 cursor-pointer ml-2 sm:ml-0" aria-hidden="true" />
                    <span className=" whitespace-nowrap">Copy address</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className=" h-4 w-4 cursor-pointer ml-2 sm:ml-0" aria-hidden="true" />
                    <span className=" whitespace-nowrap">Copied</span>
                  </>
                )}
              </div>
            </CopyToClipboard>
          </Button>

          <Button variant="ghost" className="w-full" onClick={() => setQrCodeModalOpen(true)}>
            <div className="flex flex-1 items-center gap-2">
              <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">View QR Code</span>
            </div>
          </Button>

          <Button variant="ghost" className="w-full" onClick={() => disconnect()}>
            <div className="flex flex-1 items-center gap-2">
              <LogOut className="h-4 w-4 stroke-error" />
              <span className="text-error">Disconnect</span>
            </div>
          </Button>

          <Button variant="ghost" className="w-full" onClick={() => disconnect()}>
            <div className="flex flex-1 items-center gap-2">
              <LogOut className="h-4 w-4 stroke-error" />
              <span className="text-error">Disconnect</span>
            </div>
          </Button>
        </PopoverContent>
      </Popover>

      {/* <details ref={dropdownRef} className="dropdown dropdown-end leading-3">
        <summary tabIndex={0} className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 !h-auto">
          <BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar} />
          <span className="ml-2 mr-1">
            {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
          </span>
          <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1"
        >
          <NetworkOptions hidden={!selectingNetwork} />
          <li className={selectingNetwork ? "hidden" : ""}>
            {addressCopied ? (
              <div className="btn-sm !rounded-xl flex gap-3 py-3">
                <CheckCircleIcon
                  className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                  aria-hidden="true"
                />
                <span className=" whitespace-nowrap">Copy address</span>
              </div>
            ) : (
              <CopyToClipboard
                text={checkSumAddress}
                onCopy={() => {
                  setAddressCopied(true);
                  setTimeout(() => {
                    setAddressCopied(false);
                  }, 800);
                }}
              >
                <div className="btn-sm !rounded-xl flex gap-3 py-3">
                  <DocumentDuplicateIcon
                    className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                    aria-hidden="true"
                  />
                  <span className=" whitespace-nowrap">Copy address</span>
                </div>
              </CopyToClipboard>
            )}
          </li>

          <li className={selectingNetwork ? "hidden" : ""}>
            <label htmlFor="qrcode-modal" className="btn-sm !rounded-xl flex gap-3 py-3">
              <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">View QR Code</span>
            </label>
          </li>

          <li className={selectingNetwork ? "hidden" : ""}>
            <button className="menu-item btn-sm !rounded-xl flex gap-3 py-3" type="button">
              <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <a
                target="_blank"
                href={blockExplorerAddressLink}
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                View on Block Explorer
              </a>
            </button>
          </li>
          {allowedNetworks.length > 1 ? (
            <li className={selectingNetwork ? "hidden" : ""}>
              <button
                className="btn-sm !rounded-xl flex gap-3 py-3"
                type="button"
                onClick={() => {
                  setSelectingNetwork(true);
                }}
              >
                <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Switch Network</span>
              </button>
            </li>
          ) : null}
      */}
    </>
  );
};

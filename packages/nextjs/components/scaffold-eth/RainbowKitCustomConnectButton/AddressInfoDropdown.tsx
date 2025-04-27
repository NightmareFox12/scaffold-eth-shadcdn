import { useState } from "react";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { NetworkOptions } from "./NetworkOptions";
import { LogOut } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { getAddress } from "viem";
import { Address } from "viem";
import { useDisconnect } from "wagmi";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { BlockieAvatar, isENS } from "~~/components/scaffold-eth";
import { Button } from "~~/components/shad/button";
import { Popover, PopoverContent, PopoverTrigger } from "~~/components/shad/popover";
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

  return (
    <>
      <AddressQRCodeModal address={address} qrCodeModalOpen={qrCodeModalOpen} setQrCodeModalOpen={setQrCodeModalOpen} />

      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar} />
            <span className="ml-2 mr-1">
              {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
            </span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent side="bottom" className="p-2 me-4 max-w-56 flex flex-col justify-start items-start">
          <NetworkOptions hidden={!selectingNetwork} />

          {!selectingNetwork && (
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
                      <DocumentDuplicateIcon className=" h-4 w-4" aria-hidden="true" />
                      <span>Copy address</span>
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className=" h-4 w-4" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  )}
                </div>
              </CopyToClipboard>
            </Button>
          )}

          {!selectingNetwork && (
            <Button variant="ghost" className="w-full" onClick={() => setQrCodeModalOpen(true)}>
              <div className="flex flex-1 items-center gap-2">
                <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
                <span>View QR Code</span>
              </div>
            </Button>
          )}
          {!selectingNetwork && (
            <Button variant="ghost" className="w-full">
              <div className="flex flex-1 items-center justify-start gap-2">
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                <a
                  target="_blank"
                  href={blockExplorerAddressLink}
                  rel="noopener noreferrer"
                  className="block"
                >
                  View on Block Explorer
                </a>
              </div>
            </Button>
          )}

          {allowedNetworks.length > 1 && (
            <Button variant="ghost" className="w-full" onClick={() => setSelectingNetwork(true)}>
              <div className="flex flex-1 items-center gap-2">
                <ArrowsRightLeftIcon className="h-4 w-4" />
                <span>Switch Network</span>
              </div>
            </Button>
          )}

          <Button variant="ghost" className="w-full" onClick={() => disconnect()}>
            <div className="flex flex-1 items-center gap-2">
              <LogOut className="h-4 w-4 stroke-error" />
              <span className="text-error">Disconnect</span>
            </div>
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};

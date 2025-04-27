import { Dispatch, SetStateAction } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Address as AddressType } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~~/components/shad/ui/dialog";

type AddressQRCodeModalProps = {
  address: AddressType;
  qrCodeModalOpen: boolean;
  setQrCodeModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddressQRCodeModal = ({ address, qrCodeModalOpen, setQrCodeModalOpen }: AddressQRCodeModalProps) => {
  return (
    <Dialog open={qrCodeModalOpen} onOpenChange={setQrCodeModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">QR Code</DialogTitle>
          <DialogDescription className="flex flex-col items-center gap-6 p-2">
            <QRCodeSVG value={address} size={256} />
            <Address address={address} format="long" disableAddressLink onlyEnsOrAddress />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

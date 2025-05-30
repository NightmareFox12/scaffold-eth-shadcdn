import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { TransactionReceipt } from "viem";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { ObjectFieldDisplay } from "~~/app/debug/_components/contract";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~~/components/shad/ui/collapsible";
import { replacer } from "~~/utils/scaffold-eth/common";

export const TxReceipt = ({ txResult }: { txResult: TransactionReceipt }) => {
  const [txResultCopied, setTxResultCopied] = useState<boolean>(false);

  return (
    // <div className="flex text-sm rounded-3xl peer-checked:rounded-b-none min-h-0 bg-secondary py-0">

    <div className="flex text-sm rounded-3xl min-h-0 bg-secondary gap-2">
      <div className="mt-1 pl-2">
        {txResultCopied ? (
          <CheckCircleIcon
            className="ml-1.5 text-xl font-normal text-base-content h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
        ) : (
          <CopyToClipboard
            text={JSON.stringify(txResult, replacer, 2)}
            onCopy={() => {
              setTxResultCopied(true);
              setTimeout(() => {
                setTxResultCopied(false);
              }, 800);
            }}
          >
            <DocumentDuplicateIcon className="ml-1.5 text-xl font-normal h-5 w-5 cursor-pointer" aria-hidden="true" />
          </CopyToClipboard>
        )}
      </div>

      <Collapsible className="flex-1">
        <CollapsibleTrigger className="w-full flex cursor-pointer py-1">Transaction Receipt</CollapsibleTrigger>
        <CollapsibleContent className="overflow-scroll">
        
        <pre className="text-xs">
            {Object.entries(txResult).map(([k, v]) => (
              <ObjectFieldDisplay name={k} value={v} size="xs" leftPad={false} key={k} />
            ))}
          </pre>
        </CollapsibleContent>
      </Collapsible>

      {/* <strong>Transaction Receipt </strong> */}

      {/* <div className="flex-wrap collapse collapse-arrow">
        <input type="checkbox" className="min-h-0 peer" />
        <div className="collapse-title text-sm min-h-0 py-1.5 pl-1 after:!top-4">
          <strong>Transaction Receipt ESTOY EN TxReceipt.ts</strong>
        </div>
        <div className="collapse-content overflow-auto bg-secondary rounded-t-none rounded-3xl !pl-0">
          <pre className="text-xs">
            {Object.entries(txResult).map(([k, v]) => (
              <ObjectFieldDisplay name={k} value={v} size="xs" leftPad={false} key={k} />
            ))}
          </pre>
        </div>
      </div> */}
    </div>
  );
};

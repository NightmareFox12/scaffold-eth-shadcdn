import { useCallback, useEffect, useState } from "react";
import { parseEther } from "viem";
import { CommonInputProps, InputBase, IntegerVariant, isValidInteger } from "~~/components/scaffold-eth";
import { Button } from "~~/components/shad/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/shad/ui/tooltip";

type IntegerInputProps = CommonInputProps<string> & {
  variant?: IntegerVariant;
  disableMultiplyBy1e18?: boolean;
};

export const IntegerInput = ({
  value,
  onChange,
  name,
  placeholder,
  disabled,
  variant = IntegerVariant.UINT256,
  disableMultiplyBy1e18 = false,
}: IntegerInputProps) => {
  const [inputError, setInputError] = useState(false);
  const multiplyBy1e18 = useCallback(() => {
    if (!value) {
      return;
    }
    return onChange(parseEther(value).toString());
  }, [onChange, value]);

  useEffect(() => {
    if (isValidInteger(variant, value)) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  }, [value, variant]);

  return (
    <InputBase
      name={name}
      value={value}
      placeholder={placeholder}
      error={inputError}
      onChange={onChange}
      disabled={disabled}
      suffix={
        !inputError &&
        !disableMultiplyBy1e18 && (
          // <div
          //   className="space-x-4 flex tooltip tooltip-top tooltip-secondary before:content-[attr(data-tip)] before:right-[-10px] before:left-auto before:transform-none"
          //   data-tip="Multiply by 1e18 (wei)"
          // >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="transparent"
                    className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} font-semibold px-4 text-accent !hover: bg-transparent`}
                    onClick={multiplyBy1e18}
                    disabled={disabled}
                  >
                    ∗
                  </Button>
                </TooltipTrigger>

                <TooltipContent className="bg-secondary fill-secondary">
                  <p >Multiply by 1e18 (wei)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          // </div>
        )
      }
    />
  );
};

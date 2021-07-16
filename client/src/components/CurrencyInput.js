import React from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

/**
 *
 * @PageLocation Dashboard
 * @Component CurrencyInput
 * @Description Formats and handles price inputting when editing/adding items
 *
 */

const defaultMaskOptions = {
  prefix: "$",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: false,
  allowLeadingZeroes: false,
};
const CurrencyInput = ({ ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });

  return <MaskedInput mask={currencyMask} {...inputProps} />;
};

export default CurrencyInput;

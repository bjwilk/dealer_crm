export default function SubTotal({
  subTotal,
  taxPercent,
  licenseFee,
  taxAmount,
  grandTotal,
  borderBtm,
  textColor,
  body,
  extras
}) {
  const formattedGrandTotal = parseInt(grandTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  
  const formattedTax =   taxAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') 

  return (
    <table>
      <tbody>
        <tr>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_border_none tm_bold`}
          >
            SubTotal
          </td>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_text_right tm_border_none tm_bold`}
          >
            ${subTotal.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_border_none tm_pt0`}
          >
            Body 
          </td>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_text_right tm_border_none tm_bold`}
          >
            ${body.toLocaleString()}
          </td>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_text_right tm_border_none tm_pt0`}
          >
          </td>
        </tr>
        <tr>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_border_none tm_pt0`}
          >
            Additional
          </td>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_text_right tm_border_none tm_bold`}
          >
            ${extras.toLocaleString()}
          </td>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_text_right tm_border_none tm_pt0`}
          >
          </td>
        </tr>

        <tr>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_border_none tm_pt0`}
          >
            Tax{" "}
            <span
              className={`${
                textColor === "tm_accent_color" ? textColor : "tm_ternary_color"
              }`}
            >{`(${taxPercent}%)`}</span>
          </td>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_text_right tm_border_none tm_pt0`}
          >
            + ${formattedTax}
          </td>
        </tr>

        <tr>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_border_none tm_pt0`}
          >
            License Fee{" "}
            <span
              className={`${
                textColor === "tm_accent_color" ? textColor : "tm_ternary_color"
              }`}
            ></span>
          </td>
          <td
            className={`tm_width_3 ${
              textColor ? textColor : "tm_primary_color"
            } tm_text_right tm_border_none tm_pt0`}
          >
            + ${licenseFee.toFixed(2)}
          </td>
        </tr>

        <tr className={`tm_border_top ${borderBtm ? "tm_border_bottom" : ""}`}>
          <td
            className={`tm_width_3 tm_border_top_0 tm_bold tm_f16 ${
              textColor ? textColor : "tm_primary_color"
            }`}
          >
            Grand Total
          </td>
          <td
            className={`tm_width_3 tm_border_top_0 tm_bold tm_f16 ${
              textColor ? textColor : "tm_primary_color"
            } tm_text_right`}
          >
            ${formattedGrandTotal}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

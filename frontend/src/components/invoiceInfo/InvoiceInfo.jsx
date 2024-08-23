import { currentDate } from "../../helper/helper"


export default function InvoiceInfo({id}) {
  const date = new Date();

  const month = date.getMonth() + 1; // getMonth() returns 0-based index (0 for January)
  const day = date.getDate(); // getDate() returns the day of the month (1-31)
  const year = date.getFullYear(); // getFullYear() returns the full year (YYYY)

  return (
    <div className="tm_invoice_info tm_mb20">
      <div className="tm_invoice_seperator tm_gray_bg" />
      <div className="tm_invoice_info_list">
        <p className="tm_invoice_number tm_m0">
          Invoice No: <b className="tm_primary_color">#___________</b>
        </p>
        <p className="tm_invoice_date tm_m0">
          Date: <b className="tm_primary_color">{`${month}-${day}-${year}`}</b>
        </p>
      </div>
    </div>
  )
}

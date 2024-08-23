import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAccountOrders } from "../../store/accounts";
import Buttons from "../buttons/Buttons";
import Table from "../table/Table";
import Terms from "../termsAndConditions/Terms";
import InvoiceToPayTo from "../invoiceToPayTo/InvoiceToPayTo";
import Header from "../header/Header";
import InvoiceInfo from "../invoiceInfo/InvoiceInfo";
import PaymentInfo from "../paymentInfo/PaymentInfo";
import SubTotal from "../subTotal/SubTotal";
import { pageTitle } from "../../helper/helper";
import { csrfFetch } from "../../store/csrf";


const termsAndCondition = `
  This agreement and any documents which are part of this transaction or incorporated herein comprise the entire agreement affecting this Retail Purchase Agreement
  and no other agreement or understanding of any nature concerning the same has been made or entered into or will be recognized. I have read and accept all of the
  terms and conditions of this Agreement, and agree to them as if they were printed above my signature. I further acknowledge receipt of a copy of this Agreement. This
  Agreement shall not become binding until signed and accepted by an Authorized Dealership Representative.
`;

export default function SalesOrder() {
  const invoicePage = useRef();

  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const id = parseInt(orderId)

  const user = useSelector((state) => state.session?.user);
  const fetchAccounts = async () => {
    try {
      const response = await csrfFetch(
        `/api/accounts/orders/${id}`,
        {
          method: "GET",
        }
      );
      console.log({response})
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setOrderData(data); // Update state with fetched data
      setIsLoading(false); // Set loading to false once data is fetched
      console.log({ data });
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    if (user && !orderData) {
      fetchAccounts();
    } else {
      setIsLoading(false); // Set loading to false if there's no user or profile
    }
  }, [user, orderData]); // Add necessary dependencies

  if (isLoading) {
    return <p>Loading order details...</p>;
  }

  if (!orderData) {
    return <p>No order data available.</p>;
  }

  const tableData = [
    {
      item: `${orderData.vin}`,
      desc: `${orderData.condition}, ${orderData.model}, ${orderData.year}`,
      price: `${orderData.price}`,
      qty: "1",
    },
  ];

  pageTitle("General");
  // download page

  // calculation
  const subTotal = tableData.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const taxPercent = orderData.tax !== undefined ? `${orderData.tax}` : 0;
  const licenseFee = parseInt(orderData.license, 10) || 0;
  const taxAmount = (subTotal * taxPercent) / 100;

  let grandTotal;
   if(orderData.bodies && orderData.extras){
    grandTotal = subTotal + licenseFee + taxAmount + parseInt(orderData.bodies) + parseInt(orderData.extras)
  }else if (orderData.bodies){
   grandTotal = subTotal + licenseFee + taxAmount + parseInt(orderData.bodies)
  } else if (orderData.extras){
    grandTotal = subTotal + licenseFee + taxAmount + parseInt(orderData.extras)
  } else {
    grandTotal = subTotal + licenseFee + taxAmount
  };


  return (
    <>
      <div
        className="tm_invoice tm_style1"
        id="tm_download_section"
        ref={invoicePage}
      >
        <div className="tm_invoice_in">
          <Header logo="/public/peterson-img.png" title="Invoice" />
          <InvoiceInfo id="LL93784" />
          <div className="tm_invoice_head tm_mb10">
            <InvoiceToPayTo
              title="Invoice To"
              subTitle={orderData.account.companyName}
              address={orderData.account.address}
              city={orderData.account.city}
              state={orderData.account.state}
              zipCode={orderData.account.zipCode}
              email={orderData.account.email}
              varient="tm_invoice_left"
            />
          </div>
          <div className="tm_table tm_style1 tm_mb30">
            <div className="tm_round_border">
              <div className="tm_table_responsive">
                <Table data={tableData} itemCount={false} />
              </div>
            </div>
            <div className="tm_invoice_footer">
              <div className="tm_right_footer">
                <SubTotal
                  body={orderData.bodies ? orderData.bodies : 0}
                  extras={orderData.extras ? orderData.extras : 0}
                  subTotal={subTotal}
                  taxPercent={taxPercent}
                  licenseFee={licenseFee}
                  taxAmount={taxAmount}
                  grandTotal={grandTotal}
                  borderBtm={true}
                />
              </div>
            </div>
          </div>
          <Terms
            varient="tm_round_border"
            title="Terms & Conditions:"
            data={[termsAndCondition]}
          />
          <Buttons invoicePage={invoicePage} />
        </div>
        <div className="tm_padd_15_20">
          <h3>Purchaser's Signature_________________________</h3>
          <h4>Date___________________________</h4>
        </div>
      </div>
    </>
  );
}

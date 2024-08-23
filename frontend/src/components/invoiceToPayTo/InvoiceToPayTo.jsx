import parser from "html-react-parser";


// export default function InvoiceToPayTo({title, subTitle, varient, address, city, state, zicCode}) {
//   return (
//     <div className={`${varient ? varient : ''}`}>
//       <p className="tm_mb2">
//         <b className="tm_primary_color">{`${title ? parser(title) + ':' : ''}`}</b>
//       </p>
//       <p>{parser(subTitle)}</p>
//     </div>
//   )
// }


export default function InvoiceToPayTo({ title, subTitle, varient, address, city, state, zipCode, email }) {
  return (
    <div className={`${varient ? varient : ''}`}>
      <p className="tm_mb2">
        <b className="tm_primary_color">{`${title ? parser(title) + ':' : ''}`}</b>
      </p>
      <p>{parser(subTitle)}</p>
      {address && <p>{address}</p>}
      {(city || state || zipCode) && <p>{`${city ? city + ', ' : ''}${state ? state + ' ' : ''}${zipCode ? zipCode : ''}`}</p>}
      {email && <p>{email}</p>}
    </div>
  )
}

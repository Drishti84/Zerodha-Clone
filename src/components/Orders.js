import React from "react";
import {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import axios from "axios";
const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      // console.log(res.data);
      setAllOrders(res.data);
    });
  }, []);

  if (allOrders.length === 0) {
    return <p>No orders available.</p>
   }else{
    return (
      <>
      <h3 className="title">orders ({allOrders.length})</h3>
  
     
        <div className="order-table">
          <table>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
  
            {allOrders.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
  
              return (
                <tr key={index}>
                      <td>{stock.name}</td>
                      <td>{stock.qty}</td>
                      <td>{stock.avg ? stock.avg.toFixed(2) : "N/A"}</td>
                      <td>{stock.price ? stock.price.toFixed(2) : "N/A"}</td>
                      <td>{curValue ? curValue.toFixed(2) : "N/A"}</td>
                      <td className={profClass}>
                        {(curValue - stock.avg * stock.qty).toFixed(2)}
                      </td>
                      <td className={profClass}>{stock.net || 0}</td>
                      <td className={dayClass}>{stock.day || 0}</td>
                    </tr>
              );
            })}
          </table>
        </div>
  
    
        </>
    );
  };
   }


  

export default Orders;


 /* // <div className="orders">
    //   <div className="no-orders">
    //     <p>You haven't placed any orders today</p>

    //     <Link to={"/"} className="btn">
    //       Get started
    //     </Link>
    //   </div>
    // </div> */
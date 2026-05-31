import React from "react";
import "./New.css";

const New = ({ objhome }) => {
  return (
    <main className="container">
      {objhome.products.map((val) => (
        <div key={val.id} className="card">
          <div className="card-content">
            <h2 className="card-id">{val.id}</h2>
            <div className="card-images">
              {val.images.map((img, index) => (
                <img key={index} src={img} alt="" width="150" />
              ))}
            </div>
            <h3 className="card-title">{val.title}</h3>
            <p className="card-desc">{val.description}</p>

            <div className="card-extra">
              <div className="card-top-info">
                <span className="card-price">Price : ₹{val.price}</span>
                <span className="card-discount">
                  discountPercentage: {val.discountPercentage}
                </span>
                <span className="card-rating">⭐ {val.rating}</span>
              </div>

              <div className="card-tags">
                <span className="tag-label">tag:</span>
                {val.tags.map((tag) => (
                  <span className="tag">
                    {tag}
                    {","}{" "}
                  </span>
                ))}
              </div>

              <div className="card-meta-grid">
                <span>Stock : {val.stock}</span>
                <span>brand: {val.brand}</span>
                <span>Category : {val.category}</span>
                <span>sku: {val.sku}</span>
                <span>weight: {val.weight}</span>
              </div>

              <div className="card-dimensions">
                <p>Width : {val.dimensions.width}</p>
                <p>Height : {val.dimensions.height}</p>
                <p>Depth : {val.dimensions.depth}</p>
              </div>

              <div className="card-shipping">
                <p>warrantyInformation: {val.warrantyInformation}</p>
                <p>shippingInformation: {val.shippingInformation}</p>
                <p>availabilityStatus: {val.availabilityStatus}</p>
              </div>

              <div className="card-reviews">
                <h3>reviews</h3>
                {val.reviews.map((x, index) => (
                  <div key={index} className="review">
                    <p>rating: ⭐ {x.rating}</p>
                    <p>comment: {x.comment}</p>
                    <p>date: {x.date}</p>
                    <p>reviewerName: {x.reviewerName}</p>
                    <p>reviewerEmail: {x.reviewerEmail}</p>
                  </div>
                ))}
              </div>

              <div className="card-policy">
                <p>returnPolicy: {val.returnPolicy}</p>
                <p>minimumOrderQuantity: {val.minimumOrderQuantity}</p>
              </div>

              <div className="card-qr">
                <h3>meta:</h3>
                <p>Created At : {val.meta.createdAt}</p>
                <p>Updated At : {val.meta.updatedAt}</p>
                <p>Barcode : {val.meta.barcode}</p>
                <img src={val.meta.qrCode} alt="QR Code" width="100" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
    //  <main className="container">
    //   {objhome.products.map((val) => (
    //     <div key={val.id} className="card">
    //       <div className="card-content">
    //         <h2 className="card-id">{val.id}</h2>

    //         <h3 className="card-title">{val.title}</h3>

    //         <p className="card-desc">{val.description}</p>

    //         <div className="card-extra">
    //           <span>Price : ₹{val.price}</span>
    //           <span>discountPercentage:{val.discountPercentage}</span>
    //           <span>⭐ {val.rating}</span>
    //           <span>
    //             tag:
    //             {val.tags.map((tag) => (
    //               <span>
    //                 {tag}
    //                 {","}{" "}
    //               </span>
    //             ))}
    //           </span>{" "}
    //           <br />
    //           <span>Stock : {val.stock}</span> <br />
    //           <span>brand:{val.brand}</span> <br />
    //           <span>Category : {val.category}</span> <br />
    //           <span>sku:{val.sku}</span> <br />
    //           <span>weight:{val.weight}</span>
    //           <div>
    //             <p>Width : {val.dimensions.width}</p>

    //             <p>Height : {val.dimensions.height}</p>

    //             <p>Depth : {val.dimensions.depth}</p>
    //             <div>
    //               <p>warrantyInformation:{val.warrantyInformation}</p>
    //               <p>shippingInformation:{val.shippingInformation}</p>
    //               <p>availabilityStatus:{val.availabilityStatus}</p>
    //             </div>
    //             <div>
    //               <h3>reviews </h3>
    //               {val.reviews.map((x, index) => (
    //                 <div key={index} className="review">
    //                   <p>rating:⭐ {x.rating}</p>
    //                   <p>comment:{x.comment}</p>
    //                   <p>date:{x.date}</p>
    //                   <p>reviewerName:{x.reviewerName}</p>
    //                   <p>reviewerEmail:{x.reviewerEmail}</p>
    //                 </div>
    //               ))}
    //             </div>
    //             <div>
    //               <p>returnPolicy:{val.returnPolicy}</p>
    //               <p>minimumOrderQuantity:{val.minimumOrderQuantity}</p>
    //             </div>
    //             <div>
    //               <h3> meta:</h3>
    //               <p>Created At : {val.meta.createdAt}</p>
    //               <p>Updated At : {val.meta.updatedAt}</p>
    //               <p>Barcode : {val.meta.barcode}</p>
    //               <img src={val.meta.qrCode} alt="QR Code" width="100" />
    //             </div>
    //             <div></div>
    //             <div>
    //               {val.images.map((img, index) => (
    //                 <img key={index} src={img} alt="" width="150"></img>
    //               ))}
    //             </div>

    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </main>
  );
};

export default New;

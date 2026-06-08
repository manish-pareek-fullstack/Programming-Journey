import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const UserImage = ({ id }) => {

   const userImages = [
     { id: 1, image: "https://randomuser.me/api/portraits/men/1.jpg" },
     { id: 2, image: "https://randomuser.me/api/portraits/women/2.jpg" },
     { id: 3, image: "https://randomuser.me/api/portraits/men/3.jpg" },
     { id: 4, image: "https://randomuser.me/api/portraits/women/4.jpg" },
     { id: 5, image: "https://randomuser.me/api/portraits/men/5.jpg" },
     { id: 6, image: "https://randomuser.me/api/portraits/women/6.jpg" },
     { id: 7, image: "https://randomuser.me/api/portraits/men/7.jpg" },
     { id: 8, image: "https://randomuser.me/api/portraits/women/8.jpg" },
     { id: 9, image: "https://randomuser.me/api/portraits/men/9.jpg" },
     { id: 10, image: "https://randomuser.me/api/portraits/women/10.jpg" },

     { id: 11, image: "https://randomuser.me/api/portraits/men/11.jpg" },
     { id: 12, image: "https://randomuser.me/api/portraits/women/12.jpg" },
     { id: 13, image: "https://randomuser.me/api/portraits/men/13.jpg" },
     { id: 14, image: "https://randomuser.me/api/portraits/women/14.jpg" },
     { id: 15, image: "https://randomuser.me/api/portraits/men/15.jpg" },
     { id: 16, image: "https://randomuser.me/api/portraits/women/16.jpg" },
     { id: 17, image: "https://randomuser.me/api/portraits/men/17.jpg" },
     { id: 18, image: "https://randomuser.me/api/portraits/women/18.jpg" },
     { id: 19, image: "https://randomuser.me/api/portraits/men/19.jpg" },
     { id: 20, image: "https://randomuser.me/api/portraits/women/20.jpg" },

     { id: 21, image: "https://randomuser.me/api/portraits/men/21.jpg" },
     { id: 22, image: "https://randomuser.me/api/portraits/women/22.jpg" },
     { id: 23, image: "https://randomuser.me/api/portraits/men/23.jpg" },
     { id: 24, image: "https://randomuser.me/api/portraits/women/24.jpg" },
     { id: 25, image: "https://randomuser.me/api/portraits/men/25.jpg" },
     { id: 26, image: "https://randomuser.me/api/portraits/women/26.jpg" },
     { id: 27, image: "https://randomuser.me/api/portraits/men/27.jpg" },
     { id: 28, image: "https://randomuser.me/api/portraits/women/28.jpg" },
     { id: 29, image: "https://randomuser.me/api/portraits/men/29.jpg" },
     { id: 30, image: "https://randomuser.me/api/portraits/women/30.jpg" },
   ];
  const found = userImages.find((u) => u.id === id);
    
  return (
    <div>
      <LazyLoadImage
        src={found?.image}
        alt="User"
        effect="blur"
        width={100}
        height={100}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%",
          border: "2px solid #ddd",
        }}
      />
    </div>
  );
}

export default UserImage

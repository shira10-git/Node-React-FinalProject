// import React, { useState, useEffect } from 'react';
// import { Button } from 'primereact/button';
// import { Carousel } from 'primereact/carousel';
// import { Tag } from 'primereact/tag';
// import { ProductService } from './service/ProductService';

// import { Navigate, useNavigate } from 'react-router-dom';

// export default function Home() {
//     const navigate=useNavigate()
//     const [products, setProducts] = useState([]);
//     const responsiveOptions = [
//         {
//             breakpoint: '1400px',
//             numVisible: 2,
//             numScroll: 1
//         },
//         {
//             breakpoint: '1199px',
//             numVisible: 3,
//             numScroll: 1
//         },
//         {
//             breakpoint: '767px',
//             numVisible: 2,
//             numScroll: 1
//         },
//         {
//             breakpoint: '575px',
//             numVisible: 1,
//             numScroll: 1
//         }
//     ];

//     const getSeverity = (product) => {
//         switch (product.inventoryStatus) {
//             case 'INSTOCK':
//                 return 'success';

//             case 'LOWSTOCK':
//                 return 'warning';

//             case 'OUTOFSTOCK':
//                 return 'danger';

//             default:
//                 return null;
//         }
//     };

//     useEffect(() => {
//         ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
//     }, []);

//     const productTemplate = (product) => {
//         return (
//             <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
//                 <div className="mb-3">
//                     <img src={require(`../pics/${product.image}`)} alt={product.name} className="w-6 shadow-2" />
//                 </div>
//                 <div>
//                     <h4 className="mb-1">{product.name}</h4>
//                     <h6 className="mt-0 mb-3">${product.price}</h6>
//                     <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
//                     <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
//                         <Button icon="pi pi-search" className="p-button p-button-rounded" />
//                         <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <>
//         <div className="card">
//             <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
//             autoplayInterval={3000} itemTemplate={productTemplate} />
//         </div>
//         <div className="card flex justify-content-center">
//             <Button onClick={()=>{navigate("/HomeManager/AllWorkers")}} icon="pi pi-arrow-right" label="to add todo" link />
//             </div>
//         </>

//     )
// }
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from './service/ProductService';
import image from './building.jpg'
export default function ResponsiveDoc() {
    const [images, setImages] = useState(null);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    useEffect(() => {
        PhotoService.getImages().then(data => setImages(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />
    }

    return (
        <div  style={{ backgroundImage: `url(${image})` }}>
       
            {/* <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={7} circular style={{ maxWidth: '800px' }}
                item={itemTemplate} thumbnail={thumbnailTemplate} /> */}
                
     </div>
    )
}
        
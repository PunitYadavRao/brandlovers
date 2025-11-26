import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";
export const ShopContext=createContext();
const ShopContextProvider=(props)=>{
    const currency=' $';
    const deliveryCharge=10;
    const value={
        products,currency,deliveryCharge
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;


// import { createContext, useMemo } from "react";
// import { products } from "../assets/frontend_assets/assets";

// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => {
//     const currency = "$";
//     const deliveryCharge = 10;

//     const value = useMemo(() => ({
//         products,
//         currency,
//         deliveryCharge
//     }), []);

//     return (
//         <ShopContext.Provider value={value}>
//             {children}
//         </ShopContext.Provider>
//     );
// };

// export default ShopContextProvider;
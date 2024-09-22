import SHOP_DATA from '../shop-data.js'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'

 import { createContext, useState, useEffect } from 'react'

 export const ProductContext = createContext({
    products : []
 })

 export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
      const getCategoriesMap = async () => {
         const categoryMap = await getCategoriesAndDocuments();
         console.log(categoryMap);
      }
      getCategoriesMap();
    }, []);
   //  useEffect(() => {
   //    addCollectionAndDocuments('categories', SHOP_DATA)
   //  }, []);
    const value = {products}

    return <ProductContext.Provider value = {value}>{children}</ProductContext.Provider>
 }
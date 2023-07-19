import React, { useEffect,useState } from 'react'
import './page.css'
const Page = () => {
    const [products,setProducts]=useState([])
    const [pages,setPages]=useState(1)
    const submitHandler=(selectedpage)=>{
        if(selectedpage>=1 &&
            selectedpage<=products.length/10 &&
            selectedpage!==pages)
    setPages(selectedpage)
    }
    const fetchme=async()=>{
        try{
       const res=await fetch('https://dummyjson.com/products?limit=100')
       const data=await res.json()
       setProducts(data.products)
       
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchme()
    },[pages])
  return (
   <>
   <div className='card_prod'>
   {products.slice(pages*10-10,pages*10).map((prod)=>{
      return(
        <div className='content'>
          <img src={prod.thumbnail} alt={prod.title} />
          <h3>{prod.title}</h3>
          <p>{prod.description}</p>
          <h6>{prod.price}</h6>
          <p>{prod.rating}</p>
        </div>
      )
     })}   
   </div>
   {products.length>0 && <div className='pagination'>
    <span onClick={()=>submitHandler(pages-1)}className={pages>1?"":"hidden"}>prev</span>
    {
    [...Array(products.length/10)].map((_,i)=>{
        return(
            <span onClick={()=>submitHandler(i+1)} className={pages===i+1?"currentpage":""}>{i+1}</span>
        )
    })
    }
    <span onClick={()=>submitHandler(pages+1)}className={pages<products.length?"":"hidden"}>forward</span>
    </div>}
   </>
  )
}

export default Page
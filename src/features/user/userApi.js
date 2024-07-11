export  function fetchLoggedInUserOrders(id) {
    return new Promise ( async(resolve)=>{
        
      const response = await fetch('http://localhost:8080/orders?user='+id) ;
      const data = await response.json() ;
      resolve({data})
    }
        
    );
  } 
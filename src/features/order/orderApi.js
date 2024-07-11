export  function createOrder(order) {
    return new Promise ( async(resolve)=>{
      const response = await fetch('http://localhost:8080/orders',
        {
            method:'POST',
            body:JSON.stringify(order),
            headers:{
                'content-type':'application/JSON'
            }
        }
      ) ;
      const data = await response.json() ;
      resolve({data})
    }
        
    );
  }
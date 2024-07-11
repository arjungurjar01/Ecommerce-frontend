

export  function fetchAllProducts() {
  return new Promise ( async(resolve)=>{
    const response = await fetch('http://localhost:8080/products') ;
    const data = await response.json() ;
    resolve({data})
  }
      
  );
}


export  function fetchProductById(id) {
  return new Promise ( async(resolve)=>{
    const response = await fetch(`http://localhost:8080/products/`+id) ;
    const data = await response.json() ;
    resolve({data})
    console.log(id);
    console.log("data id",{data});
  }
      
  );
}

export  function fetchProductsByFilters(filter,sort, pagination) {
  //  sort :{_sort:"price",_order=desc}
 // filter :{"category":"smartphone"}
//  ToDo : multiple filters on checked
  let queryString = '';

 for(let key in filter){
  let categoryValues = filter[key];

  if(categoryValues.length > 0){
    const lastCategoryValue = categoryValues[categoryValues.length-1];
  queryString += `${key}=${lastCategoryValue}&`
 }}

 for(let key in sort){
    queryString += `${key}=${sort[key]}&`
 }

 console.log( pagination);
 for(let key in pagination){
  queryString += `${key}=${pagination[key]}&`
}

  return new Promise ( async(resolve)=>{
    const response = await fetch('http://localhost:8080/products?' +queryString) ;
    const data = await response.json() ;
    console.log("check err" , data);
    
    // const totalItems = await response.headers.get('X-Total-Count')
    // resolve({data:{products:data,totalItems:+totalItems}})
    resolve({data:{products:data}});
  }
      
  );
}


export  function fetchAllCategories() {
  return new Promise ( async(resolve)=>{
    const response = await fetch('http://localhost:8080/categories') ;
    const data = await response.json() ;
    resolve({data})
  }
      
  );
}

export  function fetchAllBrands() {
  return new Promise ( async(resolve)=>{
    const response = await fetch('http://localhost:8080/brands') ;
    const data = await response.json() ;
    resolve({data})
  }
      
  );
}
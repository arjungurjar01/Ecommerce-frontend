import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { fetchLoggedInUserOrdersAsync, selectUserOders } from './userSlice';

function UserOrders() {
 
  const user = useSelector(selectLoggedInUser);
 
  // console.log(user);

  const Orders =useSelector(selectUserOders);
  const dispatch = useDispatch();



  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchLoggedInUserOrdersAsync(user.id));
      // console.log("fetching");
    }
  }, [user, dispatch]);

  return (
    <div>
        { Orders.map((order)=>(
          <div> 
             <div className="mx-auto mt-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className='text-2xl text-center p-2 font-medium text-gray-900'>My Orders : {order.id}</h2>
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.href}>{item.title}</a>
                                  </h3>
                                  <p className="ml-4">${item.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                              </div>

                              <div className="flex flex-1 items-end justify-between text-sm"> 
                                <div className='flex items-center gap-2 text-sm text-gray-950'>
                                  
                                  <p className="text-gray-500">Qty : {item.quantity}</p>
                                
                                
                                </div>
                               

                                

                                <div className="flex">
                                  
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
               

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items In Bag</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                 
                {/* selected user Address */}

                {/* {console.log(order.selectedAddress)}  */}
                
                  <div key={order.index} className="flex justify-between gap-x-6 px-5 py-5 border border-gray-300 rounded-md p-2">
          <div className="flex min-w-0 gap-x-4">
        
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.email}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.phone}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">PinCode : {order.selectedAddress.pinCode}</p>
            <p className="text-sm leading-6 text-gray-500">{order.selectedAddress.street} , {order.selectedAddress.city} , {order.selectedAddress.state}</p>
            
          </div>
        </div>
                

               
                </div>
    
    </div>
            
        </div>
        ))}
    </div>
  )
}

export default UserOrders ;
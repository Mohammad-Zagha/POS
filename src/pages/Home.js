import axios from 'axios'
import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

  


const Home = () => {
  const userObj=useAuthContext();
 
  const { logout } = useLogout();
  const handleLogoutClick = () => {
    logout()
  }
  const [currentProducts, setCurrentProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
       
        const response = await axios.get('/home/All/get',
        {
          headers: {
            'Authorization' : `Bearer ${userObj.user.token}`
          }
        });
    
        setAllProducts(response.data);
     
        
      } catch (error) {
        console.log(error);
      }
    }
    if(userObj.user)
    {
      fetchData()
     
    }
  }, []);
 

 

  const searchByBarcode = (array, barcodeCode) => {
    const result = array.find(obj => {
      return obj.containers.some(container => {
        return container.barcodes.some(barcode => {
          return barcode.code === barcodeCode;
        });
      });
    });
  
    if (!result) {
      return null; // return null if the barcode is not found
    }
  
    const container = result.containers.find(c => {
      return c.barcodes.some(barcode => {
        return barcode.code === barcodeCode;
      });
    });
  
    const product = {
      barcode: container.barcodes,
      name: result.name,
      choosenContainer: container.name,
      price: container.price,
      quantity: 1,
      containers: result.containers
    };
  
    return product;
  }

  function SearchAndAddProduct(barcodeCode) {
    // Search allProducts array
    const product = searchByBarcode(allProducts, barcodeCode);

  
    if (product !== null) {
      const index = currentProducts.findIndex(product => {
        return product.barcode.some(barcodeObj => barcodeObj.code === barcodeCode);
      });
      
      // Check if product already exists in currentProducts array
 //     const index = currentProducts.findIndex(p => p.barcode === barcodeCode);
   const updatedProducts = [...currentProducts];

      if (index !== -1) {
        console.log(updatedProducts[index].choosenContainer)
        if(updatedProducts[index].choosenContainer === product.choosenContainer  )
        {
          
          updatedProducts[index].quantity += 1;
          updatedProducts[index].containers = product.containers;
          setCurrentProducts(updatedProducts);
        }
        else
        {
          setCurrentProducts([...currentProducts, product]);
        }

        // Update quantity and containers
    
      } else {
        // Add product to currentProducts array
        setCurrentProducts([...currentProducts, product]);
      }
      
    } else {
      console.log("Product not found.");
    }
   
  }

  function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
      SearchAndAddProduct(event.target.value)

    
      //  SearchArray(allProducts, event.target.value)
    }
  }

  function handleContainerClick(item,container) {
    const index = currentProducts.findIndex((p) => p.barcode === item.barcode);
  

        // Update quantity and containers
        const updatedProducts = [...currentProducts];
        updatedProducts[index].barcode=container.barcodes;
        updatedProducts[index].price =container.price;
        updatedProducts[index].choosenContainer = container.name;
        setCurrentProducts(updatedProducts);
    

  }


  return (
    <>
  
      <div className="d-flex container" dir="rtl">
        <div className="d-flex w-50">
        
          <button
            type="button"
            className="btn btn-warning mt-5 mb-1 shadow Fawater-btn"
          >
            Fawater
          </button>
          <input
            className="form-control mt-5 mb-1 mx-2 form-control-sm"
            name="barcode-input"
            id="barcode-input"
            type="text"
            placeholder="استعلام"
            onKeyDown={handleEnterKeyPress}
          />{" "}
                <p className="font-weight-bold" onClick={handleLogoutClick}>logout</p>

        </div>
      </div>

      <div className="container my-2 container-menu-btns" dir="rtl">
        <button type="button" className="btn btn-warning m-2 shadow">
          Beef
        </button>
      </div>

      <div className="container d-flex">
        <div className="container d-flex flex-column" id="info-container">
          <form dir="rtl">
            <input
              type="text"
              className="form-control m-1"
              aria-describedby="emailHelp"
              placeholder="الاسم"
            />
            <input
              type="text"
              className="form-control m-1"
              aria-describedby="emailHelp"
              placeholder="الرقم"
            />
            <input
              type="text"
              className="form-control m-1"
              aria-describedby="emailHelp"
              placeholder="العنوان"
            />
          </form>
          <div className="container d-flex flex-column">
            <div className="price-section shadow d-flex flex-column mb-3">
              <h5 className="text-center my-2">
                ID : <span id="Order-Id">3700</span>{" "}
              </h5>
              <hr />
              <h3 className="price text-center">
             
                 <span id="Price">  </span>
              </h3>
              <hr />
              <div id="Order-Status" className="shadow">
                <h6>Pending</h6>
              </div>
            </div>
            <div className="d-flex justify-content-around mb-2">
              <button type="button" className="btn btn-warning shadow">
                Save
              </button>
              <button type="button" className="btn btn-warning shadow">
                Pay
              </button>
            </div>
          </div>
        </div>
        <div className="container" id="Table-Container" dir="rtl">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">اسم المادة</th>
                <th scope="col">البيان</th>
                <th scope="col">الكمية </th>
                <th scope="col">السعر </th>
                <th scope="col">المجموع </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts &&
                currentProducts.map((item, index) => (
                  <tr key={index}>
                    <td className="ml-5">{index}</td>
                    <td>{item.name}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                          {item.choosenContainer}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {item.containers.map((container, index) =>
                            <Dropdown.Item
                            onClick={() => handleContainerClick(item,container)} 
                            key={index}>{container.name}</Dropdown.Item>
                          )}

                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity * item.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container my-3 container-menu-btns" dir="rtl">
        <button 
      
        type="button"
         className="btn btn-success m-2 shadow">
          Add Item
        </button>


      </div>
    </>
  );
}
export default Home
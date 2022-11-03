import React from "react";
import AdminLeft from "./../adminleft";
import { Link,Outlet } from "react-router-dom";
import Product from "../../../services/product";

class AdminProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
        
      }
  }
  
  componentDidMount(){
    Product.allProducts().then((response) => {
    //   console.log(response.data);
      this.setState({
        products: response.data,
      });
    }).catch(error=>{
        console.log(error);
    });
  }
  render() {
    return (
      <>
        <AdminLeft />
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-body">
                  <div className="row float-end">
                    <Link
                      to="/admin/product/create"
                      className="btn btn-primary"
                    >
                      Add Product
                    </Link>
                  </div>
                  <div className="row col-md-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.products.map((item,key) => (
                          <tr key={key}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td><img src={item.image} width="50" height="50" alt="" /></td>
                            
                            <td>
                              <Link to={`/admin/product/edit/${item._id}`}><i className="fa fa-pencil-alt"></i></Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminProduct;

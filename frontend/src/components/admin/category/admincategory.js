import React from "react";
import AdminLeft from "./../adminleft";
import { Link,Outlet } from "react-router-dom";
import Category from "../../../services/category";
// import adminCategoryEdit from "./edit";

// import { AgGridReact, AgGridColumn } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class adminCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories:[]
      }
  }

  componentDidMount(){
    Category.allCategories().then((response) => {
      // console.log(response.data);
      this.setState({
        categories: response.data,
      });
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
                      to="/admin/category/create"
                      className="btn btn-primary"
                    >
                      Add category
                    </Link>
                  </div>
                  <div className="row col-md-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Parent Id</th>
                          <th>Order</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.categories.map((item,key) => (
                          <tr key={key}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td><img src={item.image} width="50" height="50" alt="" /></td>
                            <td>{item.parent_id}</td>
                            <td>{item.order}</td>
                            <td>
                              <Link to={`/admin/category/edit/${item._id}`}><i className="fa fa-pencil-alt"></i></Link> | 
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

export default adminCategory;

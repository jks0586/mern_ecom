import React from "react";
import AdminLeft from "./adminleft";

import AdminUserAdd from "./users/register";
import AdminUserEdit from "./users/edit";
import AdminUserShow from "./users/show";
import User from "../../services/user";


class adminUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    //   alert('aaaa');
    User.allUsers().then((response) => {
      // console.log(response.data);
      this.setState({
        users: response.data,
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
                    <AdminUserAdd />
                  </div>
                  <div className="row col-md-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map((item,key) => (
                          <tr key={key}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                              <AdminUserEdit _id={item._id}/>|
                              <AdminUserShow _id={item._id}/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default adminUser;

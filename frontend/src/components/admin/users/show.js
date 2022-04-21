import React from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import User from "../../../services/user";


class AdminUserShow extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        email: "",
        password: "",
        isAdmin: "",
        show: false
      };

      this.handleShow = this.handleShow.bind(this);
      this.handleOpened = this.handleOpened.bind(this);
      this.handleClose = this.handleClose.bind(this);

    }

    handleClose(e) {
        this.setState({ show: false });
    }

    handleOpened(e){
        console.log('aaaa');
    }

    handleShow(e) {
        this.getUserDetail(this.props._id);
      }
      getUserDetail(_id) {
        User.getUserDetail(_id)
          .then((response) => {
            console.log(response.data.name, response.data.email);
            this.setState({ show: true,name:response.data.name,email:response.data.email });
          })
          .catch((error) => {
                console.log(error);
          });
      }

    render() {
        return (
          <>
            <i className="fa fa-eye mr-1" onClick={this.handleShow}></i>
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              onEntered={this.handleOpened}
            >
              <Modal.Header>
                <Modal.Title>Show User Detail <i className="fa fa-crose" onClick={this.handleClose}>Close</i></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.name}
                {this.state.email}
              </Modal.Body>
              
            </Modal>
          </>
        );
      }

}

export default AdminUserShow;
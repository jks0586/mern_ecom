import React from "react";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import User from "../../../services/user";

class AdminUserAdd extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            isAdmin:'',
            isRegister:false
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.state = {show: false};
        this.handleClose=this.handleClose.bind(this);
        this.handleShow=this.handleShow.bind(this);
    }
    
    handleShow(e){
        this.setState({show:true});
    }

    handleClose(e){
        this.setState({show:false});
    }

    handleNameChange(e){
        this.setState({
            name:e.target.value
        });
    }

    handleEmailChange(e){
        this.setState({
            email:e.target.value
        });

        e.preventDefault();
    }

    handlePasswordChange(e){
        this.setState({
            password:e.target.value
        });

        e.preventDefault();
    }

    handleSubmit(e){
        
    console.log(this.state);
      User.register(this.state).then(response=>{
        console.log(response.data);
        for (const x in response.data) {
          localStorage.setItem('user_'+x,response.data[x]);
        }
        this.setState({isRegister:true});

        if(response.data){
            console.log(this.state);
            this.handleClose();
            this.props.navigation.navigate('/admin/users');
        }
        // console.log(obj.length,response,'jkkjjkjhh');
        
      }).catch(error=>{
        console.log(error);
      });

        e.preventDefault();
    }


    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    
  render(){
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add User
        </Button>
  
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Register New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        
          <form method="POST" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter Name" onChange={this.handleNameChange} value={this.state.value}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter Email" onChange={this.handleEmailChange} value={this.state.value}/>
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="exampleInputpassword" placeholder="Enter password" onChange={this.handlePasswordChange} value={this.state.value} />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Save</button>
                        
                    </div>
                </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
}

export default AdminUserAdd;

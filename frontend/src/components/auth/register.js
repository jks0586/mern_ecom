import React from "react";
import User from "../../services/user";
class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            isAdmin:''
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);

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
        // console.log(obj.length,response,'jkkjjkjhh');
        
      }).catch(error=>{
        console.log(error);
      });

        e.preventDefault();
    }
  render() {
    return (
      
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 offset-md-3 ">
                <div className="card-box center-wrapper">
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
                        <button type="submit" className="btn btn-success">Login</button>
                        
                    </div>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    );
  }
}

export default Register;

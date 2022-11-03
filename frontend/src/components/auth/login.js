import React from "react";
import User from "../../services/user";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
    e.preventDefault();
  }

  handlePasswordChange(e){
    this.setState({
      password:e.target.value
    });

    e.preventDefault();
  }

  componentDidMount(){
    // alert('aaaa');
    
  }
  handleSubmit(e){
      console.log(this.state);
      User.login(this.state).then(response=>{
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
                  <form  method="post" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={this.state.value}
                        onChange={this.handleEmailChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputpassword"
                        placeholder="Enter password"
                        value={this.state.value}
                        onChange={this.handlePasswordChange}
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-success">
                        Login
                      </button>
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

export default Login;

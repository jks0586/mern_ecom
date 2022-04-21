import React from "react";
import AdminLeft from "./adminleft";

class AdminDashboard extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     email: "",
  //     password: "",
  //   };
  //   this.handleEmailChange = this.handleEmailChange.bind(this);
  //   this.handlePasswordChange = this.handlePasswordChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleEmailChange(e) {
  //   this.setState({
  //     email: e.target.value,
  //   });
  //   e.preventDefault();
  // }

  // handlePasswordChange(e){
  //   this.setState({
  //     password:e.target.value
  //   });

  //   e.preventDefault();
  // }

  // handleSubmit(e){
  //     console.log(this.state);
  //     User.login(this.state).then(response=>{
  //       console.log(response.data);
  //       for (const x in response.data) {
  //         localStorage.setItem('user_'+x,response.data[x]);
  //       }
  //       // console.log(obj.length,response,'jkkjjkjhh');
        
  //     }).catch(error=>{
  //       console.log(error);
  //     });
  //     e.preventDefault();
  // }

  render() {
    return (
      <AdminLeft />
      
    );
  }
}

export default AdminDashboard;

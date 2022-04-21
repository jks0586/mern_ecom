import axios from 'axios';
axios.defaults.baseURL="http://localhost:5000/api/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.get['Content-Type'] = 'application/json';
// if(localStorage.getItem('user_token')){
//     axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('user_token');
// } 
const letscmsrest=axios;
export default letscmsrest;
import letscmsrest from "./rest";
const  suburl="/users";
class User{

    login(data){
        return letscmsrest.post(suburl+'/login',data);
    }
    register(data){
        return letscmsrest.post(suburl+'/register',data);
    }
    allUsers(){ 
        return letscmsrest.get(suburl+'/all');
    }

    getUserDetail(id){ 
        return letscmsrest.get(suburl+'/'+id);
    }
}


export default new User();
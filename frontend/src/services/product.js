import letscmsrest from "./rest";
const  suburl="/product";
class Product{
    allProducts(){ 
        
        // return letscmsrest.get(suburl+'/all');
        return letscmsrest.get(suburl+'/all');
    }

    creteProduct(data){
        return letscmsrest.post(suburl+'/create',data);
    }  
    
    getProduct(id){
        return letscmsrest.get(suburl+'/get/'+id);
    } 

}


export default new Product();
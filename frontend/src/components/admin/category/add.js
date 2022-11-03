import React from "react";
import AdminLeft from "./../adminleft";
import Select from "react-select";
import Category from "../../../services/category";

const STATUSOPTION=[
    {value:0,label:'Disable'},{value:1,label:'Enable'}
]

class adminCategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      imagePreviewUrl: "",
      parent_id: "",
      order: "",
      imagePreview: "",
      parents: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.getCategoryImage = this.getCategoryImage.bind(this);
    this.handleParentChange = this.handleParentChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

  }

  handleSubmit=(e)=>{
      e.preventDefault();
      // console.log(this.state);
      const senddata={};
      senddata.name=this.state.name;
      senddata.image=this.state.imagePreviewUrl;
      senddata.order=this.state.order;
      senddata.parent_id=this.state.parent_id;
      senddata.status=this.state.status;

      Category.creteCategory(senddata).then(response=>{
        // console.log(response);
      }).catch(error=>{
        console.log(error);
      })
  }
  handleStatusChange=(status)=>{
    this.setState({ status:status.value }, () =>
      console.log(`Option selected:`, status.value)
    );
  }
  handleOrderChange = (e) => {
    this.setState({
      order: e.target.value,
    });
  };
  handleParentChange = (parent_id) => {
// console.log(parent_id);
    this.setState({ parent_id:parent_id.value }, () =>
      console.log(`Option selected:`, parent_id.value)
    );
  };
  getCategoryImage(e) {
    e.preventDefault();
    let filereader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      image: file,
    });
    // console.log(e.target.files[0]);
    filereader.onloadend = () => {
      let imagePreview = null;
      if (filereader.result) {
        imagePreview = (
          <img src={filereader.result} width="100" height="100" alt="" />
        );
      } else {
        imagePreview = (
          <div className="previewText">Please select an Image for Preview</div>
        );
      }

      this.setState({
        imagePreviewUrl: filereader.result,
        imagePreview: imagePreview,
      });
    };
    filereader.readAsDataURL(file);
  }
  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }
  componentDidMount() {
    Category.allCategories().then((response) => {
      console.log(response.data);
      let optionsdata = [];
      response.data.map((category) => {
        optionsdata.push({ value: category._id, label: category.name });
      });
      this.setState({
        parents: optionsdata,
      });
    });
  }
  render() {
    const { parent_id,order ,status} = this.state;
    return (
      <>
        <AdminLeft />
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-body">
                  <div className="row float-end"></div>
                  <div className="row col-md-12">
                    <form method="POST" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Enter Category Name"
                          onChange={this.handleNameChange}
                          value={this.state.value}
                          required={true}
                        />
                      </div>

                      <div className="form-group">
                        <label>Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          name="image"
                          placeholder="Upload File"
                          onChange={this.getCategoryImage}
                          required={true}
                        />
                        <div className="imgPreview">
                          {this.state.imagePreview}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Parent Id</label>
                        <Select
                          value={parent_id}
                          placeholder="Select Parent"
                          onChange={this.handleParentChange}
                          options={this.state.parents}
                          required={true}
                          name="parent_id"
                        />
                      </div>

                      <div className="form-group">
                        <label>Order</label>
                        <input
                          type="text"
                          className="form-control"
                          id="order"
                          placeholder="Enter Order"
                          onChange={this.handleOrderChange}
                          value={this.state.value}
                          required={true}
                          name="order"
                        />
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <Select
                          value={status}
                          placeholder="Select Status"
                          onChange={this.handleStatusChange}
                          options={STATUSOPTION}
                          required={true}
                          name="status"
                        />
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-success">
                          Save
                        </button>
                      </div>
                    </form>
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

export default adminCategoryAdd;

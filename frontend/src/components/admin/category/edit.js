import React from "react";
import AdminLeft from "./../adminleft";
import Select from "react-select";
import Category from "../../../services/category";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

const STATUSOPTION = [
  { value: 0, label: "Disable" },
  { value: 1, label: "Enable" },
];

class adminCategoryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    const senddata = {};
    senddata._id = this.state._id;
    senddata.name = this.state.name;
    senddata.image = this.state.imagePreviewUrl;
    senddata.order = this.state.order;
    senddata.parent_id = this.state.parent_id;
    senddata.status = this.state.status;
    
    console.log(senddata,'hjjhjhs');

    Category.editCategory(this.state._id,senddata)
      .then((response) => {
        console.log(response);

        MySwal.fire({
          title: <p>Hello World</p>,
          footer: 'Copyright 2018',
          didOpen: () => {
            // `MySwal` is a subclass of `Swal`
            //   with all the same instance & static methods
            MySwal.clickConfirm()
          }
        }).then(() => {
          return MySwal.fire(<p>Shorthand works too</p>)
        })

        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleStatusChange = (status) => {
    this.setState({ status:status.value }, () =>
      console.log(`Option selected:`, status.value)
    );
  };
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
    //console.log(e.target.files[0]);
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
    // console.log(this.props.params._id);
    Category.edit(this.props.params._id).then((response) => {
      console.log(response);
      if (response.data.code === 200) {
        // console.log(response.data.result);
        this.setState({
          _id: response.data.result._id,
          name: response.data.result.name,
          image: response.data.result.image,
          parent_id: response.data.result.parent_id,
          order: response.data.result.order,
          status: response.data.result.status,
          imagePreview: (
            <img
              src={response.data.result.image}
              width="100"
              height="100"
              alt=""
            />
          ),
          imagePreviewUrl: response.data.result.image,
        });
      }
    });

    Category.parent(this.props.params._id).then((response) => {
      var optionsdata = [];
      response.data.map((category) => {
        return optionsdata.push({ value: category._id, label: category.name });
      });
      this.setState({
        parents: optionsdata,
      });
    });

    // console.log(this.props.params._id);
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
                          value={this.state.name ? this.state.name : ""}
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
                        />
                        <div className="imgPreview">
                          {this.state.imagePreview}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Parent Id </label>
                        <Select
                          value={this.state.parents.filter(({value}) => value === this.state.parent_id)}
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
                          value={(this.state.order)?this.state.order:''}
                          required={true}
                          name="order"
                        />
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        {this.state.status}
                        <Select
                          value={STATUSOPTION.filter(({value}) => value === this.state.status)}
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

export default withRouter(adminCategoryEdit);

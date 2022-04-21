import React from "react";
import AdminLeft from "../adminleft";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Product from "../../../services/product";
class AdminProdcutAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      images: [],
      price: 0,
      quantity: 0,
      errors: {
        name: "",
        description: "",
        image: "",
        images: "",
        price: "",
        quantity: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
      },
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFeaturedChange = this.handleFeaturedChange.bind(this);
    this.handleNewChange = this.handleNewChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleMetaTitleChange = this.handleMetaTitleChange.bind(this);
    this.handleMetaDescriptionChange =
      this.handleMetaDescriptionChange.bind(this);
    this.handleMetaKeywordsChange = this.handleMetaKeywordsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }
  handleImageChange(e) {
    this.setState({
      image: e.target.value,
    });
  }

  handlePriceChange(e) {
    this.setState({
      price: e.target.value,
    });
  }
  handleQuantityChange(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  handleFeaturedChange(e) {
    this.setState({
      featured: e.target.value,
    });
  }
  handleCategoryChange(e) {
    this.setState({
      category: e.target.value,
    });
  }
  handleNewChange(e) {
    this.setState({
      new: e.target.value,
    });
  }
  handleStatusChange(e) {
    this.setState({
      sttaus: e.target.value,
    });
  }

  handleMetaTitleChange(e) {
    this.setState({
      meta_title: e.target.value,
    });
  }
  handleMetaDescriptionChange(e) {
    this.setState({
      meta_description: e.target.value,
    });
  }

  handleMetaKeywordsChange(e) {
    this.setState({
      meta_keywords: e.target.value,
    });
  }

  validate() {
    let errordata = {};
    if (!this.state.name) {
      errordata.name = "Name is required";
    }
    if (!this.state.description) {
      errordata.description = "Description is required";
    }
    if (!this.state.image) {
      errordata.image = "Image is required";
    }

    if (!this.state.price) {
      errordata.price = "Price is required";
    }

    if (!this.state.quantity) {
      errordata.quantity = "Quantity is required";
    }
    if (!this.state.meta_title) {
      errordata.meta_title = "Meta Title is required";
    }
    if (!this.state.meta_description) {
      errordata.meta_description = "Meta Description is required";
    }
    if (!this.state.meta_keywords) {
      errordata.meta_keywords = "Meta Keywords is required";
    }
    // console.log(Object.keys(errordata).length);
    // console.log(Object.keys(errordata));
    if (Object.keys(errordata).length ===0 ) {
      return true;
    } else {
        this.setState({
            errors: errordata,
          });
          return false;
    }
    
  }

  handleSubmit(e) {
    if (this.validate()) {
      // console.log(this.state);
      Product.creteProduct(this.state).then(response=>{
        if(response.data.code==400){
          var errordata = {};
          for (const [key, value] of Object.entries(response.data.errors)) {
            errordata[key]=value;
          }
            this.setState({
              errors: errordata,
            });
            
        } else if(response.data.code===200){
          
        }
      }).catch(errors=>{
          console.log(errors);
      })
    }

    e.preventDefault();
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
                  <div className="row">
                    <div className="col-md-12">
                      <form method="POST" onSubmit={this.handleSubmit}  encType="multipart/form-data">
                        <div className="form-group">
                          <label className="control-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            onChange={this.handleNameChange}
                            value={this.state.value}
                          />
                          {this.state.errors.name && (
                            <div className="alert alert-danger">
                              {this.state.errors.name}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="control-label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <CKEditor
                            name="description"
                            editor={ClassicEditor}
                            data=""
                            id="id"
                            onReady={(editor) => {
                              console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              this.setState({
                                description: data,
                              });
                              // console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                              const data = editor.getData();
                              this.setState({
                                description: data,
                              });
                              // console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                              const data = editor.getData();
                              this.setState({
                                description: data,
                              });
                              // console.log("Focus.", editor);
                            }}
                          ></CKEditor>
                          {this.state.errors.description && (
                            <div className="alert alert-danger">
                              {this.state.errors.description}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="control-label">
                            Image <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            placeholder="Select Image"
                            onChange={this.handleImageChange}
                            value={this.state.value}
                          />
                          {this.state.errors.image && (
                            <div className="alert alert-danger">
                              {this.state.errors.image}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label>More Images</label>
                          <input
                            type="file"
                            name="images[]"
                            id="images"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label className="control-label">
                            Price <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="price"
                            id="price"
                            onChange={this.handlePriceChange}
                            value={this.state.value}
                          />
                          {this.state.errors.price && (
                            <div className="alert alert-danger">
                              {this.state.errors.price}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="control-label">
                            Quantity <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="quantity"
                            id="quantity"
                            onChange={this.handleQuantityChange}
                            value={this.state.value}
                          />

                          {this.state.errors.quantity && (
                            <div className="alert alert-danger">
                              {this.state.errors.quantity}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label>Category</label>
                          <input
                            className="form-control"
                            type="text"
                            name="category"
                            id="category"
                            onChange={this.handleCategoryChange}
                            value={this.state.value}
                          />
                        </div>

                        <div className="form-group">
                          <label>Featured</label>
                          <input
                            className="form-control"
                            type="text"
                            name="featured"
                            id="featured"
                            onChange={this.handleFeaturedChange}
                            value={this.state.value}
                          />
                        </div>

                        <div className="form-group">
                          <label>New</label>
                          <input
                            className="form-control"
                            type="text"
                            name="new"
                            id="new"
                            onChange={this.handleNewChange}
                            value={this.state.value}
                          />
                        </div>

                        <div className="form-group">
                          <label>Status</label>
                          <input
                            className="form-control"
                            type="text"
                            name="status"
                            id="status"
                            onChange={this.handleStatusChange}
                            value={this.state.value}
                          />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">
                            Meta Title <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="meta_title"
                            id="meta_title"
                            onChange={this.handleMetaTitleChange}
                            value={this.state.value}
                          />
                          {this.state.errors.meta_title && (
                            <div className="alert alert-danger">
                              {this.state.errors.meta_title}
                            </div>
                          )}
                        </div>
                        <div className="form-group required">
                          <label className="control-label">
                            Meta Description <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="meta_description"
                            id="meta_description"
                            onChange={this.handleMetaDescriptionChange}
                            value={this.state.value}
                          />
                          {this.state.errors.meta_description && (
                            <div className="alert alert-danger">
                              {this.state.errors.meta_description}
                            </div>
                          )}
                        </div>
                        <div className="form-group required">
                          <label className="control-label">
                            Meta Keywords <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="meta_keywords"
                            id="meta_keywords"
                            onChange={this.handleMetaKeywordsChange}
                            value={this.state.value}
                          />

                          {this.state.errors.meta_keywords && (
                            <div className="alert alert-danger">
                              {this.state.errors.meta_keywords}
                            </div>
                          )}
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
        </div>
      </>
    );
  }
}

export default AdminProdcutAdd;

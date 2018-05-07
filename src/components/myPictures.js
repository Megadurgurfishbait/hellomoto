import React, { Component } from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import './myPictures.scss';

class MyPictures extends Component {
      constructor() {
            super();
            this.state = {
                  selectedImages: []
            }
      }
      handleCheckboxChange =(e) => {
            if(e.target.checked){
                  this.setState({selectedImages: [...this.state.selectedImages, e.target.id]});
            }else{
                  let newArray = this.state.selectedImages.filter(m => m!== e.target.id);
                  this.setState({selectedImages: newArray});
            }     
      }
      seeState = () =>{
            console.log("ButtonPush", this.state.selectedImages);
            
            this.state.selectedImages.map(values => {
                  this.props.deleteImage(values, callback => {
                        console.log("Mynd eytt");
                  });
                  this.props.deleteImageChunks(values, callback => {
                        console.log("Gögnum eytt");
                  });
                 window.location.reload();
            })
      }

      onClose = (e) => {
            browserHistory.push("/");
      }

      componentWillMount() {
            this.props.fetchImages();
      }
      render() {
        
            const ROOT_URL = "https://fierce-plateau-26257.herokuapp.com/image"
            const {images} = this.props;
            if(!images){
                  return <div> Er að hugsa, bíddu í augnablik.  </div>
            }
            console.log(this.state.selectedImages);
            return (
                  <div className="myPictures">
                         <h1>Yfirlit yfir myndir í myndasafni.</h1>
                        <p> Hakaðu við þær myndir sem að þú vilt eyða. </p>
                        <div className="myPictures--container">
                              {images.map((values) => {
                                    return (
                                    <div className="myPictures--container__card" key={values._id}>
                                    <input className="myPictures--container__card--input" type="checkbox" id={values._id} onChange={this.handleCheckboxChange} />
                                          <label htmlFor={values._id} className="myPictures--container__card--label"></label>
                                                <img className = "myPictures--container__card--image"src={`${ROOT_URL}/${values.filename}`}/> 
                                          
                                    </div>
                                    )
                              })}
                              
                        </div>
                        <button type="button" className="feature--btn" onClick={this.seeState}>Eyða mynd úr myndasafni</button>
                        <button className="feature--btn" onClick={(e) => {this.onClose(e)}}> Loka </button>
                  </div>
            );
      }
}

function mapStateToProps(state){
      return ({images: state.img.data})
}
export default connect(mapStateToProps, actions)(MyPictures);
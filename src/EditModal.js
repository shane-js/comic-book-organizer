import React, { Component } from 'react';
import './App.css';
import { Modal, Input, InputNumber,  Row, Col, Icon, Button, Spin, Table, notification } from 'antd';
import { connect } from 'react-redux'
import { updateEditComicBookProp, closeEditComicModal, editComicBook} from './reducers/home/actions'
import {isNumber, isNullOrUndefined, isNullUndefinedOrEmptyString} from './bound.js'


class EditModal extends Component {
  handleCancel = () =>{
      this.props.closeEditComicModal();
    }

  handleEditComicBook = (e) => {
    if(!this.props.comicBookToEdit){
      notification.open({
        className: 'errorNotification',
        message: 'Error Editing Comic',
        description: 'All fields are required to edit a comic book.'
      });
      return
    }
    
    if(this.props.comicBookToEdit.comicBookName::isNullUndefinedOrEmptyString() || this.props.comicBookToEdit.publisherName::isNullUndefinedOrEmptyString()){
      notification.open({
        className: 'errorNotification',
        message: 'Error Submitting Comic',
        description: 'Comic Book Name and Publisher Name are required.'
      });
      return
    }

    if(!this.props.comicBookToEdit.volume::isNumber() || this.props.comicBookToEdit.volume::isNullOrUndefined() || !this.props.comicBookToEdit.issue::isNumber() || this.props.comicBookToEdit.issue::isNullOrUndefined()){
      notification.open({
        className: 'errorNotification',
        message: 'Error Submitting Comic',
        description: 'Volume and Issue input fields must be numbers.'
      });
      return
    }

    this.props.editComicBook();
  }
    
  render() {  
    return (
        <Modal
          title="Edit Comic Book"
          visible={this.props.editModalvisible}
          onOk={this.handleEditComicBook}
          okText="Edit Record"
          onCancel={this.handleCancel}
          cancelText="Cancel"
          width={600}
        >
          <Row>
            <Row className="inputRow">
                <Row><span className="inputLabel">Comic Book Name</span></Row>
                <Row><Input placeholder="Comic Book Name" value={this.props.comicBookToEdit.comicBookName} onChange={(e) => {this.props.updateEditComicBookProp({prop:'comicBookName', value:e.target.value})}}/></Row>
            </Row>
            <Row className="inputRow">
                <Row><span className="inputLabel">Publisher Name</span></Row>
                <Row><Input placeholder="Publisher Name" value={this.props.comicBookToEdit.publisherName} onChange={(e) => {this.props.updateEditComicBookProp({prop:'publisherName', value:e.target.value})}}/></Row>
            </Row>
            <Row className="inputRow">
              <Col span={6}>
                <Row><span className="inputLabel">Volume #</span></Row>
                <Row><InputNumber placeholder="Volume #" min={1} value={this.props.comicBookToEdit.volume} onChange={(e) => {this.props.updateEditComicBookProp({prop:'volume', value:e})}}/></Row>
              </Col>
              <Col span={6}>
                <Row><span className="inputLabel">Issue #</span></Row>
                <Row><InputNumber placeholder="Issue #" min={1} value={this.props.comicBookToEdit.issue} onChange={(e) => {this.props.updateEditComicBookProp({prop:'issue', value:e})}}/></Row>
              </Col>
            </Row>
          </Row>
        </Modal>
    );
  }
}

const mapDispatchToProps = {
  updateEditComicBookProp,
  closeEditComicModal,
  editComicBook
};

function mapStateToProps(state, ownProps){
  return {...state.homeReducer, ...ownProps}
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);

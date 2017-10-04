import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { Table, Spin, Button, Icon, Row, Col, Modal, notification  } from 'antd';
import { connect } from 'react-redux'
import { getCurrentComics, openAddComicModal, closeAddComicModal, openEditComicModal, closeEditComicModal, addComicBook, deleteComicBook } from './reducers/home/actions'
import AddModal from './AddModal.js'
import EditModal from './EditModal.js'
import {isNumber, isNullOrUndefined, isNullUndefinedOrEmptyString} from './bound.js'

class App extends Component {
  componentDidMount(){
    this.props.getCurrentComics();
  }

  showModal = () => {
    this.props.openAddComicModal();
  }
  handleAddComicBook = (e) => {
    if(!this.props.comicBookToAdd){
      notification.open({
        className: 'errorNotification',
        message: 'Error Submitting Comic',
        description: 'All fields are required to add a comic book to your collection tracker.'
      });
      return
    }
    
    if(this.props.comicBookToAdd.comicBookName::isNullUndefinedOrEmptyString() || this.props.comicBookToAdd.publisherName::isNullUndefinedOrEmptyString()){
      notification.open({
        className: 'errorNotification',
        message: 'Error Submitting Comic',
        description: 'Comic Book Name and Publisher Name are required.'
      });
      return
    }

    if(!this.props.comicBookToAdd.volume::isNumber() || this.props.comicBookToAdd.volume::isNullOrUndefined() || !this.props.comicBookToAdd.issue::isNumber() || this.props.comicBookToAdd.issue::isNullOrUndefined()){
      notification.open({
        className: 'errorNotification',
        message: 'Error Submitting Comic',
        description: 'Volume and Issue input fields must be numbers.'
      });
      return
    }

    this.props.addComicBook();
  }
  handleCancel = () => {
    this.props.closeAddComicModal();
  }

  render() {
    const columns = [{
        title: 'Comic Book',
        dataIndex: 'comicBookName',
        key: 'comicBookName',
        render: text => <a href="/">{text}</a>,
      }, {
        title: 'Publisher',
        dataIndex: 'publisherName',
        key: 'publisherName',
      }, {
        title: 'Volume #',
        dataIndex: 'volume',
        key: 'volume',
      }, 
       {
        title: 'Issue #',
        dataIndex: 'issue',
        key: 'issue',
      },{
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="default" size="small" onClick={() => this.props.openEditComicModal(record)}><Icon type="edit" /> Edit</Button>
            <span className="ant-divider" />
            <Button type="danger" size="small" onClick={() => {this.props.deleteComicBook(record._id)}}><Icon type="delete" /> Remove</Button>
          </span>
        ),
      }];

  
    return (
      <div className="App">
        <AddModal handleCancel={this.handleCancel} handleAddComicBook={this.handleAddComicBook}/>
        <EditModal />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Kapow Comic Book Organizer</h1>
        </header>
        <Row style={{marginTop:'10px'}} type="flex" justify="end">
          <Col span={3}   pull={2}>
            <Button type="primary" size="large" onClick={this.showModal}><Icon type="file-add" /> Add Comic</Button>
          </Col>
        </Row>
        <Row style={{marginTop:'30px'}}>
          <Col span={20} offset={2}>
           {this.props.currentComicsLoading ?
              <Row type="flex" justify="center"><Spin tip="Loading..."></Spin></Row>
              :
            <Table rowKey="id" columns={columns} dataSource={this.props.currentComics} />
           }
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = {  
  getCurrentComics,
  openAddComicModal,
  closeAddComicModal,
  openEditComicModal, 
  closeEditComicModal,
  addComicBook,
  deleteComicBook
};

function mapStateToProps(state, ownProps){
  return {...state.homeReducer, ...ownProps}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

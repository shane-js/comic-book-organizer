import React, { Component } from 'react';
import './App.css';
import { Modal, Input, InputNumber,  Row, Col, Icon, Button, Spin, Table } from 'antd';
import { connect } from 'react-redux'
import { updateAddComicBookProp, updateSearchComicBookProp, searchComicBook, selectSearchedComicBookVolume} from './reducers/home/actions'

class AddModal extends Component {
  render() {  
    const searchResultColumns = [
        {
            title: '',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: imageUrl => <img src={imageUrl}/>
          },    
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="/">{text}</a>
          }, {
            title: 'Publisher',
            dataIndex: 'publisherName',
            key: 'publisherName'
          }
          ,{
            title: '',
            key: 'action',
            render: (text, record) => (
              <span>
                <Button type="primary" size="medium" onClick={() => this.props.selectSearchedComicBookVolume(record)}><Icon type="select" /> Select</Button>
              </span>
            ),
          }];

    return (
        <Modal
          title="Add Comic Book"
          visible={this.props.addModalvisible}
          onOk={this.props.handleAddComicBook}
          okText="Add Comic Book"
          onCancel={this.props.handleCancel}
          cancelText="Cancel"
          width={600}
        >
          <Row>
            <Row className="inputRow">
                <Row><span className="inputLabel">Comic Book Name</span></Row>
                <Row><Input placeholder="Comic Book Name" value={this.props.comicBookToAdd.comicBookName} onChange={(e) => {this.props.updateAddComicBookProp({prop:'comicBookName', value:e.target.value})}}/></Row>
            </Row>
            <Row className="inputRow">
                <Row><span className="inputLabel">Publisher Name</span></Row>
                <Row><Input placeholder="Publisher Name" value={this.props.comicBookToAdd.publisherName} onChange={(e) => {this.props.updateAddComicBookProp({prop:'publisherName', value:e.target.value})}}/></Row>
            </Row>
            <Row className="inputRow">
              <Col span={6}>
                <Row><span className="inputLabel">Volume #</span></Row>
                <Row><InputNumber placeholder="Volume #" min={1} value={this.props.comicBookToAdd.volume} onChange={(e) => {this.props.updateAddComicBookProp({prop:'volume', value:e})}}/></Row>
              </Col>
              <Col span={6}>
                <Row><span className="inputLabel">Issue #</span></Row>
                <Row><InputNumber placeholder="Issue #" min={1} value={this.props.comicBookToAdd.issue} onChange={(e) => {this.props.updateAddComicBookProp({prop:'issue', value:e})}}/></Row>
              </Col>
            </Row>
          </Row>
          <Row style={{marginTop:"15px"}}>
            <hr/>
            <Row style={{marginTop:"10px"}}>
              <Icon type="search"/> Search ComicVine.com:
            </Row>
            {this.props.comicBookSearch && this.props.comicBookSearch.isSearching ?
              <Row type="flex" justify="center"><Spin tip="Searching..."></Spin></Row>
              :
              <div>
                <Row>
                  <Row className="inputRow">
                      <Row><span className="inputLabel">Comic Book Volume Name</span></Row>
                      <Row><Input placeholder="Comic Book Name" value={this.props.comicBookSearch.comicBookVolumeName} onChange={(e) => {this.props.updateSearchComicBookProp({prop:'comicBookVolumeName', value:e.target.value})}}/></Row>
                  </Row>
                </Row>
                <Row style={{marginTop:'10px'}} type="flex" justify="end">
                  <Col span={3}   pull={2}>
                    <Button type="primary" size="large" onClick={this.props.searchComicBook}><Icon type="search" /> Search</Button>
                  </Col>
                </Row>
                <Row>
                    {
                    this.props.comicBookSearch.results.length > 0 ?
                    <Table rowKey="resultIndex" columns={searchResultColumns} dataSource={this.props.comicBookSearch.results} pagination={false} />
                    : <span>No results found.</span>
                    }
                </Row>
              </div>}
          </Row>
        </Modal>
    );
  }
}

const mapDispatchToProps = {
  updateAddComicBookProp,
  updateSearchComicBookProp,
  searchComicBook,
  selectSearchedComicBookVolume
};

function mapStateToProps(state, ownProps){
  return {...state.homeReducer, ...ownProps}
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);

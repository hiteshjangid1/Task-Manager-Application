import React, { Component } from "react";
import '../CSS/List.css';
import InnerBlock from "./InnerBlock";
import ModalEle from "./ModalEle";

class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalEleOpen: false
        }
    }

    toggleModalEle = () => {
        this.setState({
            ModalEleOpen: !this.state.ModalEleOpen
        });
    }

    deleteThisList = () => {
        this.props.deleteThisList(this.props.list.listName);
    }

    addElements = (listName, content) => {
        this.props.addElementsInList(listName, content);
    }

    deleteThisItem = (listName, content) => {
        this.props.deleteCard(listName, content);
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.setData("index", ev.target.className);
    }

    drop = (ev) => {
        ev.preventDefault();

        var data = ev.dataTransfer.getData("text");
        var index = ev.dataTransfer.getData("index");
        var obj = JSON.parse(data);
        if (obj.listName != ev.target.id && ev.target.id != "") {
            this.props.deleteCard(obj.listName, obj.listItemContent[index]);
            this.props.addElementsInList(ev.target.id, obj.listItemContent[index]);
        }
    }



    render() {
        return (
            <div >
                <div className='grid-container'>
                    <div className='grid-item'>
                        <div >{this.props.list.listName}</div>
                    </div>
                    <div className='grid-item'>
                        <a onClick={this.deleteThisList}>
                            X
                        </a>
                    </div>
                </div>
                <div className='minimumHeight' id={this.props.list.listName} onDrop={this.drop} onDragOver={this.allowDrop}>
                    {this.props.list.listItemContent.map((member, index) => (
                        <div id={JSON.stringify(this.props.list)} className={index} onDragStart={this.drag} draggable="true">
                            <InnerBlock list={member} index={index} listName={this.props.list.listName} card={member} deleteThisItem={this.deleteThisItem}> </InnerBlock>
                        </div>
                    ))
                    }
                </div>
                <div className='grid-container2'>
                    <a className='grid-item' onClick={this.toggleModalEle}>+</a>
                </div>

                <ModalEle show={this.state.ModalEleOpen}
                    onCloseEle={this.toggleModalEle} list={this.props.list.listName} addElements={this.addElements}></ModalEle>
            </div >
        );
    }


}

export default Block;
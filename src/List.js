import React, { Component } from "react";
import './List.css'
import Modal from './Modal';
import Block from './Block';

class List extends React.Component {
    constructor(props) {
        super(props);
        const p = JSON.parse(localStorage.getItem('list'));
        this.state = {
            listContent: (p != null && p != undefined) ? p : [],
            isModalOpen: false,
        }
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    submitModal = (newValue) => {
        const ls = this.state.listContent;

        let len = ls.length;
        let i = 0;
        let flag = true;
        for (i = 0; i < len; i++) {
            if (ls[i].listName.trim().toLowerCase() == newValue.trim().toLowerCase()) {
                alert('particular list already exists!');
                flag = false;
                break;
            }
        }
        if (flag) {
            ls.push({ listName: newValue, listItemContent: [] });

            this.setState({
                listContent: ls
            });
        }

        localStorage.setItem('list', JSON.stringify(ls));
        this.toggleModal();

    }

    deleteList = (listName) => {
        const ls = this.state.listContent;
        const newLs = ls.filter((lsName) => (lsName.listName !== listName));
        this.setState({
            listContent: newLs
        });
        localStorage.setItem('list', JSON.stringify(newLs));

    }

    addElementsInList = (listName, content) => {
        const ls = this.state.listContent;
        let i = 0;
        for (i = 0; i < ls.length; i++) {
            if (ls[i].listName == listName) {
                ls[i].listItemContent.push(content);
                ls[i].listItemContent.sort((a, b) => a.creationDate < b.creationDate);
                ls[i].listItemContent.reverse();
                break;
            }
        }

        this.setState({
            listContent: ls
        });

        localStorage.setItem('list', JSON.stringify(ls));

    }


    deleteCard = (listName, content) => {
        const ls = this.state.listContent;
        let i = 0;
        for (i = 0; i < ls.length; i++) {
            if (ls[i].listName == listName) {
                const ps = ls[i].listItemContent.filter((lsContent) => (lsContent.title != content.title || lsContent.desc != content.desc || lsContent.creationDate != content.creationDate));
                ls[i].listItemContent = ps;
                break;
            }
        }

        this.setState({
            listContent: ls
        });

        localStorage.setItem('list', JSON.stringify(ls));
    }

    render() {
        return (
            <div>
                <div className='btn'>
                    <button className='button' onClick={this.toggleModal}>
                        ADD LIST
                    </button>
                </div>
                <div className='serv'>
                    {this.state.listContent.map((member, index) => (
                        <div className='servInner'>
                            <Block list={member} index={index} deleteThisList={this.deleteList} addElementsInList={this.addElementsInList} deleteCard={this.deleteCard}> </Block>
                        </div>
                    ))}
                </div>

                <Modal show={this.state.isModalOpen}
                    onClose={this.toggleModal} onSubmit={this.submitModal}></Modal>

            </div>
        )
    }


}

export default List;
import React, { Component } from "react";
import '../CSS/List.css';
import List from './List';

class InnerBlock extends React.Component {
    constructor(props) {
        super(props);

    }

    deleteThisItem = () => {
        this.props.deleteThisItem(this.props.listName, this.props.card);
    }

    render() {
        return (
            <div>
                <div className='grid-container3'>
                    <div className='grid-item'>{this.props.card.title}</div>
                    <div className='grid-item'>
                        <a onClick={this.deleteThisItem}>
                            X
                        </a>
                    </div>
                </div>
                <div class='grid-container4'>
                    <div className='grid-item'>
                        <div>{this.props.card.desc}</div>
                        <div>{this.props.card.creationDateTime}</div>
                    </div>
                </div>
            </div>
        );
    }


}

export default InnerBlock;
import React from 'react';
import PropTypes from 'prop-types';

class ModalEle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newCardTitle: '',
            newCardDesc: '',
            creationDate: null,
            creationDateTime: null
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ newCardTitle: event.target.value });
    }

    handleDescChange(event) {
        this.setState({ newCardDesc: event.target.value });
    }

    handleSubmit() {
        var obj = {
            title: this.state.newCardTitle,
            desc: this.state.newCardDesc,
            creationDate: new Date().getTime(),
            creationDateTime: new Date().toDateString()

        }
        this.props.addElements(this.props.list, obj);

        this.setState({
            newCardTitle: '',
            newCardDesc: '',
            creationDate: null,
            creationDateTime: null
        });
        this.props.onCloseEle();
    }


    render() {

        if (!this.props.show) {
            return null;
        }

        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 200,
            minHeight: 200,
            margin: '0 auto',
            padding: 30
        };

        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>

                    <div className='grid-container2'>
                        <label className='grid-item'>
                            Add a Title
                            <input type="text" value={this.state.newCardTitle} onChange={this.handleTitleChange} />
                        </label>
                    </div>

                    <div className='grid-container2'>
                        <label className='grid-item'>
                            Add a Description
                            <input type="text" value={this.state.newCardDesc} onChange={this.handleDescChange} />
                        </label>
                    </div>

                    <div className='grid-container'>
                        <button className='grid-item' onClick={this.handleSubmit}>
                            Submit
                        </button>

                        <button className='grid-item' onClick={this.props.onCloseEle}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div >
        );
    }
}

export default ModalEle;
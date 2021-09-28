import React from 'react';

class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newListValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ newListValue: event.target.value });
    }
    handleSubmit() {
        if (this.state.newListValue != '') {
            this.props.onSubmit(this.state.newListValue);
            this.setState({ newListValue: '' });
        }
        else {
            alert("List name can't be empty");
        }
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
                            Enter List Name (Case insensitive*)
                            <input type="text" value={this.state.newListValue} onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className='grid-container'>

                        <button className='grid-item' onClick={this.handleSubmit}>
                            Submit
                        </button>

                        <button className='grid-item' onClick={this.props.onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div >
        );
    }
}

export default Modal;
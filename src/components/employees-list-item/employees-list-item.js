import { Component } from 'react';
import cn from 'classnames';
import './employees-list-item.css';

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salary: ''
        }
    }

    onUpdateSalary = (e) => {
        this.props.changeSalary(e.target.value.slice(0, e.target.value.length - 1), this.props.name);
    }

    render() {
        const { name, onDelete, onToggleProp, increase, like } = this.props;

        const className = cn({
            'list-group-item': true,
            'd-flex': true,
            'justify-content-between': true,
            increase,
            like
        })

        return (
            <li className={className}>
                <span className="list-group-item-label"
                    data-toggle='like'
                    onClick={onToggleProp}
                >{name}</span>
                <input type="text"
                    className="list-group-item-input"
                    defaultValue={this.props.salary + '$'}
                    onChange={this.onUpdateSalary} />
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        data-toggle='increase'
                        onClick={onToggleProp}>
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    }
}

export default EmployeesListItem;
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Artem A.', salary: 800, increase: false, like: true, id: 1 },
        { name: 'Elizaveta R.', salary: 78800, increase: true, like: false, id: 2 },
        { name: 'Roman A.', salary: 35800, increase: false, like: false, id: 3 }
      ],
      term: '',
      filter: 'all'
    }
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name: name,
      salary: salary,
      increase: false,
      like: false,
      id: uuidv4()
    }

    this.setState(({ data }) => {
      const newArr = [...data, newItem]
      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {

    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item;
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    })
  }

  onUpdateSearch = (term) => {
    this.setState({ term });
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'like':
        return items.filter(item => item.like);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({ filter })
  }

  changeSalary = (newSalary, name) => {
    this.setState(({ data }) => ({
      data: data.map(person => {
        if (person.name === name) {
          return { ...person, salary: newSalary };
        }
        return person;
      })
    }))
  }

  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);


    return (
      <div className="app" >
        <AppInfo
          employees={employees}
          increased={increased}
        />

        <div className="search-panel">
          <SearchPanel
            data={visibleData}
            onUpdateSearch={this.onUpdateSearch} />

          <AppFilter
            onFilterSearch={this.onFilterSearch}
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          changeSalary={this.changeSalary}
        />
        <EmployeesAddForm
          onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;

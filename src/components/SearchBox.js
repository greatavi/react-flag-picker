/**
 * Created by z on 4/9/18.
 */
import React, { Component } from 'react';
import './../App.css';
import './SearchBox.css';


class SearchBox extends Component {
    constructor(props) {
        console.log("re rendering the search box");
        super(props);
        this.state = {
            continents:props.continents,
            showMenu: false,
            display:"none",
            checkedStatus:{},
            enableOutSideClickHandling: false
        };

        this.step = props.step;
        this.message = props.message;
        this.enableCheckBox = props.enableCheckBox;
        this.arrData = props.continents;
        console.log("props are", props.enableCheckBox);

        this.handleChange = this.handleChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);

        this.showMenu = this.showMenu.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleHidingOption = this.handleHidingOption.bind(this);
        this.getCheckedStatus = this.getCheckedStatus.bind(this);
        this.isEqual = this.isEqual.bind(this);


        //this.focusedOnInput = this.focusedOnInput.bind(this);
        //this.getClassName = this.getClassName.bind(this);
        this.clickHandler = props.clickHandler;
        this.selectHandler = props.selectHandler;
    }

    handleChange(event) {
        var updatedList = this.arrData.filter(function (item) {
            return item.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
        });
        this.setState({continents: updatedList})
    }

    isEqual(a1, a2){
        return a1.length===a2.length && a1.every((v,i)=> v === a2[i]);
    }

    showMenu(event) {
        event.preventDefault();
        console.log(this.state.display);
        this.setState({
            display:"block", enableOutSideClickHandling: true
        });
    }
    handleOptionClick(event){
        this.clickHandler(event);
        this.handleHidingOption();

    }
    handleHidingOption(){
        if(this.step !== 2){
            this.setState({display:"none", enableOutSideClickHandling: false});
        }
    }

    handleSelectCheckBox(event){
        console.log("handleSelectCheckBox",event.target.name);
        var obj = this.state.checkedStatus;
        obj[event.target.name]= event.target.checked;
        console.log("handleSelectCheckBox():checkedStatus object" , obj);
        this.setState({checkedStatus:obj});
        this.selectHandler(event);
    }

    getCheckedStatus(continent){
        if(this.state.checkedStatus[continent]!== null && this.state.checkedStatus[continent]!==undefined){
            return this.state.checkedStatus[continent]
        }
        return false;
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.state.enableOutSideClickHandling && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            console.log(this.message, "handling the handleClickOutsideEvent");
         //alert('You clicked outside of me!');
            this.setState({display:"none"});
        }else{
            console.log(this.message, "not handling the handleClickOutsideEvent");
        }
    }

    /**** Life cycle methods start ********/
    componentWillReceiveProps(nextProps){
        //extract only the country names here to render the data. continents has more data
        //console.log("received: continents are ", props.continents);
        console.log("componentWillReceiveProps() called");
        console.log("this.props", this.props);
        console.log("nextProps", nextProps);
        var newCheckedStatus = this.state.checkedStatus;

        //if the continents have been updated, update them and also refresh checkedStatus
        if (!this.isEqual(this.props.continents, nextProps.continents)) {
            console.log("**** re-rendering componentWillReceiveProps() ***** ");
            console.log("newCheckedStatus", newCheckedStatus);
            Object.keys(newCheckedStatus).map(function(key, index) {
                newCheckedStatus[key] = false;
            });
            var newContinents = this.state.continents;
            newContinents.length =0;
            newContinents= nextProps.continents;
            this.setState({continents:newContinents, checkedStatus:newCheckedStatus});
            console.log(this.state.checkedStatus)
        }else if(this.props.refresh!== nextProps.refresh){ //refresh the checkedstatus
            console.log("refreshingg!!!!");
            Object.keys(newCheckedStatus).map(function(key, index) {
                newCheckedStatus[key] = false;
            });
            this.setState({checkedStatus:newCheckedStatus});
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(){
        if(this.step ===2)
            console.log("SearchBox():componentDidUpdate()", this.state.continents);
    }

    render() {
        return (
            <div className = "search-box-container">
                <h3>Step {this.step}</h3>
                <p>{this.message}</p>
                <div className="search-data-wrapper" ref={this.setWrapperRef}>
                    <div className="search-wrapper">
                        <span className="search-icon">⚲</span>
                        <input className = "input-box" type="text" onFocus = {this.showMenu} onChange={this.handleChange} ></input>
                    </div>
                    <div className= "dropdown">
                        <div className ="dropdown-content" style = {{display:this.state.display}}>
                            {
                                (this.enableCheckBox === false)?
                                    this.state.continents.map((continent, i)=> {
                                        return <option key={i} onClick={this.handleOptionClick}>{continent}</option>
                                    })
                                    :
                                    this.state.continents.map((continent, i)=> {
                                        //return <li className = "checkboxes" key={i}><input type = 'checkbox' name={continent} onChange={this.selectHandler}></input><label>{continent}</label></li>;
                                        return <li className = "checkboxes" key={i} ref="checkbox"><input type="checkbox" name={continent} checked={this.getCheckedStatus(continent)} onChange={this.handleSelectCheckBox.bind(this)}></input><label>{continent}</label></li>
                                    })

                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchBox;
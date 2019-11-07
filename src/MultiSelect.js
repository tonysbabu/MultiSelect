import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SelectContainer = styled.div(props => ({
  alignItems: "center",
  background: "#f9f9f8",
  borderRadius: "4px",
  border: "1px solid rgba(0, 0, 0, 0.15)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
  boxSizing: "border-box",
  color: "#363b3e",
  cursor: "pointer",
  display: "flex",
  fontSize: "16px",
  fontWeight: "500",
  justifyContent: "left",
  minHeight: "44px",
  padding: "5px 10px",
  position: "relative",
  transition: "all 100ms ease 0s",
  width: "100%"
}));

const Option = styled.div`
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  height: 44px;
  line-height: 25px;
  &:hover {
    background: #f9f9f8;
  }
  padding: 10px;
`;

const SelectedOption = styled.span`
  background: #5e6264;
  border-radius: 4px;
  color: #fff;
  cursor: initial;
  display: inline-block;
  margin: 5px 10px 5px 0;
  padding: 3px 7px;
  i {
    cursor: pointer;
    display: inline-block;
    margin-left: 7px;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

const SelectOptionsContainer = styled.div`
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  color: #363b3e;
  left: 0;
  max-height: 221px;
  overflow-y: scroll;
  position: absolute;
  top: calc(100% + 10px);
  width: 100%;
  z-index: 5;
`;
class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }
  state = {
    showOptions: false,
    searchKey: "",
    searchOptions: []
  };

  handleSearch = e => {
    this.setState({ searchKey: e.target.value });
    let options = [...this.props.options];
    console.log("options ", options);
    options = options.filter(option =>
      new RegExp(e.target.value, "i").test(option.label)
    );

    console.log("after filtering ", options);
    this.setState({ searchOptions: options });
  };

  handleClickOutside = event => {
    // event.persist();
    const { target } = event;
    if (this.node.current && this.node.current.contains(target)) {
      return;
    }
    this.setState({ showOptions: false });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toggleOptions = e => {
    e.stopPropagation();
    this.setState(prevState => ({ showOptions: !prevState.showOptions }));
  };

  handleOptionClick = value => {
    let selectedOptions = [...this.props.value];
    const index = selectedOptions.findIndex(
      option => option.value === value.value
    );
    if (index > -1) {
      return;
    }
    selectedOptions.push(value);
    this.props.onChange(selectedOptions);
    this.setState({ showOptions: false, searchKey: "" });
  };

  handleRemoveOption = (option, index) => {
    let selectedOptions = [...this.props.value];
    selectedOptions.splice(index, 1);
    this.props.onChange(selectedOptions);
  };

  handleClearSelectedOptions = () => {
    this.props.onChange([]);
  };

  render() {
    const { showOptions, searchKey, searchOptions } = this.state;
    const { options, value } = this.props;
    return (
      <SelectContainer ref={this.node} className="select-container">
        <div
          className="selected-options-container"
          onClick={e => {
            this.toggleOptions(e);
          }}
        >
          <span className="selected-options-wrapper">
            {value.map((option, index) => (
              <SelectedOption>
                {option.label}
                <i
                  className="fa fa-times"
                  onClick={() => this.handleRemoveOption(option, index)}
                />
              </SelectedOption>
            ))}
          </span>
          <span className="icons-container">
            <div className="icon close-icon">
              <i
                className="fa fa-times"
                onClick={this.handleClearSelectedOptions}
              />
            </div>
            <span className="vertical-seperator" />
            <div className="icon down-icon">
              <i className="fa fa-caret-down" />
            </div>
          </span>
        </div>

        {showOptions && (
          <SelectOptionsContainer top={this.node.current.offsetHeight}>
            <div className="search-input-container">
              <input
                className="select-input-box"
                value={searchKey}
                onChange={this.handleSearch}
              />
              <span className="search-icon">
                <i className="fa fa-search" />
              </span>
            </div>
            {searchKey
              ? searchOptions &&
                searchOptions.map(option => {
                  return (
                    <Option
                      key={option.value}
                      onClick={() => this.handleOptionClick(option)}
                    >
                      {option.label}
                    </Option>
                  );
                })
              : options &&
                options.length > 0 &&
                options.map(option => {
                  return (
                    <Option
                      key={option.value}
                      onClick={() => this.handleOptionClick(option)}
                    >
                      {option.label}
                    </Option>
                  );
                })}
          </SelectOptionsContainer>
        )}
      </SelectContainer>
    );
  }
}

MultiSelect.propTypes = {
  options: PropTypes.array,
  multi: PropTypes.bool,
  onChange: PropTypes.func
};

export default MultiSelect;

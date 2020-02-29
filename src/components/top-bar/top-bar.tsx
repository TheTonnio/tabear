import React, {RefObject} from 'react';
import styled from "styled-components";
import TopBarButton from "./top-bar-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch, faThLarge} from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {LayoutType} from "../../models/layout-type";
import {LAYOUT_TYPES_CODES} from "../../constants";
import Search from "./search";

// TODO: Unscribe from listeners

class TopBar extends React.Component<PropTypes, any> {
  searchInputRef: RefObject<HTMLInputElement>;

  constructor(props: PropTypes) {
    super(props);

    this.state = {
      isSearchActive: false,
      searchValue: ''
    };

    this.searchInputRef = React.createRef();

    this.activateSearchField = this.activateSearchField.bind(this);
    this.deactivateSearchField = this.deactivateSearchField.bind(this);
    this.toggleSearchFieldActivity = this.toggleSearchFieldActivity.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount(): void {
    window.addEventListener('keydown', (e: any) => {
      if (e.keyCode === 114 || ((e.ctrlKey || e.metaKey) && e.keyCode === 70)) {
        e.preventDefault();
        this.activateSearchField();
      }
    });

    if (this.searchInputRef.current) {
      this.searchInputRef.current.addEventListener('blur', () => this.deactivateSearchField())
    }
  }

  activateSearchField() {
    this.setState({ isSearchActive: true });
    this.searchInputRef.current && this.searchInputRef.current.focus();
  };

  deactivateSearchField() {
    const ref = this.searchInputRef.current;

    if (ref) {
      ref.value = '';
    }

    this.setState({ isSearchActive: false })
  };

  toggleSearchFieldActivity() {
    this.state.isSearchActive
      ? this.deactivateSearchField()
      : this.activateSearchField()
  }

  onSearch(event: any) {
    const value = event.target && event.target.value;
    this.setState({ searchValue: value });
  }

  render() {
    let { onSetLayoutType, onCreateCollectionButtonClick } = this.props;

    return (
      <Bar>
        <Search
          onSearch={this.onSearch}
          isActive={this.state.isSearchActive}
          ref={this.searchInputRef}
        />
        <TopBarButton action={() => this.toggleSearchFieldActivity()} icon={<FontAwesomeIcon icon={faSearch}/>}/>
        <TopBarButton action={() => onCreateCollectionButtonClick()} icon={<FontAwesomeIcon icon={faPlus}/>}/>
        <TopBarButton action={() => onSetLayoutType(LAYOUT_TYPES_CODES.Grid)} icon={
          <FontAwesomeIcon icon={faThLarge}/>}/>
        <TopBarButton action={() => onSetLayoutType(LAYOUT_TYPES_CODES.List)} icon={<FontAwesomeIcon icon={faList}/>}/>
      </Bar>
    );
  }
}

const Bar = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 330px 0 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface PropTypes {
  onSetLayoutType: (type: LayoutType) => void
  onCreateCollectionButtonClick: () => void
}


export default TopBar;

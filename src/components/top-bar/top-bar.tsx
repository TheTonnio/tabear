import React, {RefObject, useContext} from 'react';
import styled from "styled-components";
import TopBarButton from "./top-bar-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { LayoutType } from "../../models/layout-type";
import {defaultAccent, LAYOUT_TYPES_CODES} from "../../constants";
import Search from "./search";
import { ConfigContext } from "../../store/config-context";

class TopBar extends React.Component<PropTypes, any> {
  searchInputRef: RefObject<HTMLInputElement>;
  static contextType = ConfigContext;

  constructor(props: PropTypes) {
    super(props);

    this.state = {
      isSearchActive: false,
      searchValue: ''
    };

    this.searchInputRef = React.createRef();

    this.handleKeydown = this.handleKeydown.bind(this);
    this.activateSearchField = this.activateSearchField.bind(this);
    this.deactivateSearchField = this.deactivateSearchField.bind(this);
    this.toggleSearchFieldActivity = this.toggleSearchFieldActivity.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleKeydown);

    if (this.searchInputRef.current) {
      this.searchInputRef.current.addEventListener('blur', this.deactivateSearchField)
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleKeydown);

    if (this.searchInputRef.current) {
      this.searchInputRef.current.removeEventListener('blur', this.deactivateSearchField)
    }
  }

  handleKeydown(e: any) {
    if (e.keyCode === 114 || ((e.ctrlKey || e.metaKey) && e.keyCode === 70)) {
      e.preventDefault();
      this.activateSearchField();
    }
  }

  activateSearchField() {
    this.setState({ isSearchActive: true });
    this.searchInputRef.current && this.searchInputRef.current.focus();
  };

  deactivateSearchField() {
    const ref = this.searchInputRef.current;

    if (ref && (ref.value === '' || ref.value === undefined)) {
      ref.value = '';

      this.setState({ isSearchActive: false, searchValue: '' });
      this.props.onSearch(undefined);
    }
  };

  toggleSearchFieldActivity() {
    this.state.isSearchActive
      ? this.deactivateSearchField()
      : this.activateSearchField()
  }

  handleSearch(event: any) {
    const value = event.target && event.target.value;
    this.setState({ searchValue: value });
    this.props.onSearch(value);
  }

  render() {
    const { onSetLayoutType, layoutType, onCollectionAdd } = this.props;

    return (
      <Bar className={this.context.isPanelCollapsed ? "" : "top-bar-narrow"}>
        <Search
          onSearch={this.handleSearch}
          isActive={this.state.isSearchActive}
          ref={this.searchInputRef}
        />
        <TopBarButton
          action={() => this.toggleSearchFieldActivity()}
          icon={<FontAwesomeIcon icon={faSearch}/>}
        />
        <TopBarButton
          action={() => onCollectionAdd()}
          icon={<FontAwesomeIcon icon={faPlus}/>}
        />
        <LayoutButtonsGroup>
          <TopBarButton
            action={() => onSetLayoutType(LAYOUT_TYPES_CODES.Grid)}
            icon={<FontAwesomeIcon icon={faThLarge}/>}
            isGrouped={true}
            isActive={layoutType === LAYOUT_TYPES_CODES.Grid}
          />
          <TopBarButton
            action={() => onSetLayoutType(LAYOUT_TYPES_CODES.List)}
            icon={<FontAwesomeIcon icon={faList}/>}
            isGrouped={true}
            isActive={layoutType === LAYOUT_TYPES_CODES.List}
          />
        </LayoutButtonsGroup>
      </Bar>
    );
  }
}

const Bar = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  padding: 0 60px 0 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: .3s padding-right;
  
  &.top-bar-narrow {
    padding: 0 330px 0 20px;
  }
`;

const LayoutButtonsGroup = styled.div`
  margin-left: 10px;
  border: 2px solid ${defaultAccent};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

interface PropTypes {
  onSetLayoutType: (type: LayoutType) => void
  onCollectionAdd: () => void
  onSearch: (query?: string) => void
  layoutType: LayoutType
}


export default TopBar;

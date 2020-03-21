import React, {RefObject, useContext} from 'react';
import styled from "styled-components";
import TopBarButton from "./top-bar-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { LayoutType } from "../../models/layout-type";
import { LAYOUT_TYPES_CODES } from "../../constants";
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
    this.onSearch = this.onSearch.bind(this);
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
    const { onSetLayoutType, layoutType } = this.props;

    return (
      <Bar className={this.context.isPanelCollapsed ? "" : "top-bar-narrow"}>
        <Search
          onSearch={this.onSearch}
          isActive={this.state.isSearchActive}
          ref={this.searchInputRef}
        />
        <TopBarButton
          action={() => this.toggleSearchFieldActivity()}
          icon={<FontAwesomeIcon icon={faSearch}/>}
        />
        <TopBarButton
          action={() => {}}
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
  box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.45);
  border-radius: 5px;
`;

interface PropTypes {
  onSetLayoutType: (type: LayoutType) => void
  layoutType: LayoutType
}


export default TopBar;

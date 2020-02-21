import React from 'react';
import { LayoutType } from "../models/layout-type";
import styled from "styled-components";
import {MIN_CARD_WIDTH, LAYOUT_TYPES_CODES, LIST_GAP} from "../constants";
import MasonryLayout from "./lists-masonry/lists-wrapper";

class LayoutResolver extends React.Component<PropTypes, StateTypes> {
  gridRef: any;

  constructor(props: any) {
    super(props);
    this.gridRef = React.createRef();
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const  { layoutType, children } = this.props;
    const  { width } = this.state;

    return (
      layoutType === LAYOUT_TYPES_CODES.Grid
        ? (
          <div>
            {children}
          </div>
        ) : (
          // @ts-ignore
          <MasonryLayout columns={Math.ceil((width - LIST_GAP) / (MIN_CARD_WIDTH + LIST_GAP))} gap={LIST_GAP}>
            {children}
          </MasonryLayout>
        )
    );
  }
}

type PropTypes = {
  layoutType: LayoutType
  children: any
}

type StateTypes = {
  width: number
  height: number
}

export default LayoutResolver;

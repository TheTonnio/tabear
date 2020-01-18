import React from 'react';
import * as PropTypes from 'prop-types';

class BookmarksGridItem extends React.Component<PropTypes> {
  private itemImgRef = React.createRef<HTMLImageElement>();

  constructor(props: PropTypes) {
    super(props);
  }

  render() {
    const { url, iconUrl, name, description } = this.props;
    return (
      <a href={url}>
        <div>
          <img
            src={iconUrl || `${url}/favicon.ico`}
            height="30px"
            width="30px"
            alt=""
            ref={this.itemImgRef}
          />
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </a>
    );
  }

  handleImgError(this: HTMLImageElement): void {
    this.src = 'https://de.seaicons.com/wp-content/uploads/2015/06/file-picture-icon.png';
  }

  componentDidMount() {
    this.itemImgRef.current
      && this.itemImgRef.current.addEventListener('error', this.handleImgError, { once: true });
  }
}

export default BookmarksGridItem;

type PropTypes = {
  id: string
  url: string
  name: string
  description: string
  iconUrl?: string | null
}

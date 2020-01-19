import React from 'react';
import { Bookmark } from '../../models/bookmark';

class BookmarksGridItem extends React.Component<PropTypes> {
  private itemImgRef = React.createRef<HTMLImageElement>();

  componentDidMount() {
    return this.itemImgRef.current
      && this.itemImgRef.current.addEventListener('error', this.handleImgError, { once: true });
  }

  handleImgError(this: HTMLImageElement): void {
    this.src = 'https://de.seaicons.com/wp-content/uploads/2015/06/file-picture-icon.png';
  }

  render() {
    const { props } = this;
    const {
      url, iconUrl, name, description,
    } = props.record;

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
}

export default BookmarksGridItem;

type PropTypes = {
  record: Bookmark
}

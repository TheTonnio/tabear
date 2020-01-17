import React from "react";
import * as PropTypes from "prop-types";

class BMGridItem extends React.Component {
  constructor(props) {
    super(props);
    this.itemImg = React.createRef();
  }

  render() {
    let { id, url, iconUrl, name, description } = this.props;
    return (
      <a href={url}>
        <div>
          <img
            src={iconUrl || `${url}/favicon.ico`}
            height="30px"
            width="30px"
            alt=""
            ref={this.itemImg}
          />
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </a>
    );
  }

  handleImgError() {
    this.src = "https://de.seaicons.com/wp-content/uploads/2015/06/file-picture-icon.png";
  }

  componentDidMount() {
    this.itemImg.current.addEventListener("error", this.handleImgError, { once: true });
  }
}

BMGridItem.propTypes = {
  id: PropTypes.any,
  collectionId: PropTypes.any,
  url: PropTypes.any,
  iconUrl: PropTypes.any,
  name: PropTypes.any,
  description: PropTypes.any
};

export default BMGridItem;

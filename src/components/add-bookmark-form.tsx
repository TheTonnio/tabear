import React, { FormEvent } from 'react';
import v4 from 'uuid/v4';
import { Bookmark } from '../models/bookmark';

class AddBookmarkForm extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      name: '',
      description: '',
      url: '',
      iconUrl: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(fieldName: string, event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ [fieldName as string]: event.target.value } as StateTypes);
  }

  handleSubmit(event: FormEvent): void {
    event.preventDefault();

    const { collectionId, onAddBookmark } = this.props;
    const {
      name, description, url, iconUrl,
    } = this.state;

    onAddBookmark({
      id: v4(),
      collectionId,
      name,
      description,
      url,
      iconUrl,
    });

    this.resetFrom();
  }

  resetFrom(): void {
    this.setState({
      name: '',
      description: '',
      url: '',
      iconUrl: '',
    });
  }

  render() {
    const {
      name, description, url, iconUrl,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => this.handleChange('name', e)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => this.handleChange('description', e)}
            />
          </label>
          <label>
            Url:
            <input
              type="text"
              name="url"
              value={url}
              onChange={(e) => this.handleChange('url', e)}
            />
          </label>
          <label>
            Icon Url:
            <input
              type="text"
              name="iconUrl"
              value={iconUrl}
              onChange={(e) => this.handleChange('iconUrl', e)}
            />
          </label>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default AddBookmarkForm;

type PropTypes = {
  collectionId: string
  onAddBookmark: (data: Bookmark) => void
}

type StateTypes = {
  name: string
  description: string
  url: string
  iconUrl?: string
}

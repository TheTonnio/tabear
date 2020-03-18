import React, { FormEvent } from 'react';
import v4 from 'uuid/v4';
import { Collection } from '../models/collection';

class CreateCollectionForm extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      name: '',
      emoji: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(fieldName: string, event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [fieldName as string]: event.target.value } as StateTypes);
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { onCreateCollection } = this.props;
    const { name } = this.state;

    onCreateCollection({
      id: v4(),
      name,
      bookmarksIds: [],
      isCollapsed: false,
    });

    this.resetFrom();
  }

  resetFrom() {
    this.setState({
      name: '',
      emoji: '',
    });
  }

  render() {
    const { name, emoji } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => this.handleChange('name', e)}
            />
          </label>
          <label>
            Emoji:
            <input
              type="text"
              name="emoji"
              value={emoji}
              onChange={(e) => this.handleChange('emoji', e)}
            />
          </label>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default CreateCollectionForm;

type PropTypes = {
  onCreateCollection: (data: Collection) => void
}

type StateTypes = {
  name: string
  emoji: string
}

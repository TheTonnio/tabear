import React, { useContext } from 'react';
import TopBarButton from "./top-bar-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { AppDataContext } from "../../store/app-data-context";
import v4 from "uuid/v4";
import { addNewCollectionToOrder } from "../../actions/collections-order";
import { addCollection } from "../../actions/collections";

const TopBarButtons = (props: PropTypes) => {
  const { onToggleSearchFieldActivity } = props;
  const { dispatch }: any = useContext(AppDataContext);

  const handleCollectionAdd = () => {
    const newCollectionId = v4();
    dispatch(addNewCollectionToOrder(newCollectionId));
    dispatch(addCollection(newCollectionId));
  };

  return (
    <>
      <TopBarButton
        action={onToggleSearchFieldActivity}
        icon={<FontAwesomeIcon icon={faSearch}/>}
      />
      <TopBarButton
        action={handleCollectionAdd}
        icon={<FontAwesomeIcon icon={faPlus}/>}
      />
    </>
  );
};

interface PropTypes {
  onToggleSearchFieldActivity: () => void
}

export default TopBarButtons;

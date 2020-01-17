import React from "react";
import BMGridItem from "./bm-grid-item";

const BMGridCollection = ({ bookmarks, id, name, description, emoji}) => (
  <div>
    <h1>{`${emoji} ${name}`}</h1>
    <h2>{description}</h2>
    <div>
      {
        bookmarks.map(item => <BMGridItem key={item.id} {...item} />)
      }
    </div>
  </div>
);

export default BMGridCollection;

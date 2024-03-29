import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors.js";

import CollectionPreview from "../../components/collection-preview/collection-preview.component.jsx";

import "./collections-overview.component.scss";

const collectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      <div>
        {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(collectionsOverview);

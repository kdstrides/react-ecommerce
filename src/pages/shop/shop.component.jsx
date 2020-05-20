import React from 'react';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route component={CollectionOverview} exact path={`${match.path}`} />
    <Route component={CollectionPage} path={`${match.path}/:collectionId`} />
  </div>
);

export default ShopPage;
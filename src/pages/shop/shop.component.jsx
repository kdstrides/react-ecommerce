import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionPageWithSpinner = WithSpinner(CollectionPage);
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapshot => {
      const collectionMaps = convertCollectionsToMap(snapshot);
      updateCollections(collectionMaps);

      this.setState({ isLoading: false });
    })
  }

  render() {
    const { match } = this.props;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`}
          render={ (props) => <CollectionsOverviewWithSpinner isLoading={this.state.isLoading} {...props} /> }/>
        <Route path={`${match.path}/:collectionId`}
          render={ (props) => <CollectionPageWithSpinner isLoading={this.state.isLoading} {...props} />} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectStyle } from 'native-base-shoutem-theme';
import { get } from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

class IconNB extends Component {
  static contextTypes = {
    theme: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.setIcon(props.type);
  }

  setIcon(iconType) {
    if (iconType === undefined && get(this, 'context.theme')) {
      // eslint-disable-next-line
      iconType = this.context.theme['@@shoutem.theme/themeStyle'].variables
        .iconFamily;
    }
    this.Icon = Ionicons;
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.type && this.props.type !== nextProps.type) {
      this.setIcon(nextProps.type);
    }
  }

  render() {
    return <this.Icon ref={c => (this._root = c)} {...this.props} />;
  }
}

IconNB.propTypes = {
  type: PropTypes.oneOf(['Ionicons'])
};

const StyledIconNB = connectStyle(
  'NativeBase.IconNB',
  {},
  mapPropsToStyleNames
)(IconNB);

export { StyledIconNB as IconNB };

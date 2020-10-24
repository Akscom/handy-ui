import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SkeletonElement extends React.Component {
  static displayName = 'SkeletonElement'

  static propTypes = {
    className: PropTypes.any,
    animate: PropTypes.bool,
  }


  static defaultProps = {
    className: undefined,
    animate: false,
  }


  render() {
    const {
      className,
      animate,
      ...others
    } = this.props;
    return (
      <div className={classnames(`ha-skeleton-element${animate ? ' ha-skeleton-loading' : ''} ${className}`)} {...others} />
    );
  }
}

export default SkeletonElement
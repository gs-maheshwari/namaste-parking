import React from 'react';

import styles from './styles.module.css';

const NotFound = () => {
  return (
    <div className={styles.flexColumn}>
      <h1>404 Not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
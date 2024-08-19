import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function Avatar({ avatarSrc, status }) {
  return (
    <div className="avatar-status">
      <img src={avatarSrc} alt="User Avatar" className="avatar" />
      <div className={`status-circle ${status}`}></div>
    </div>
  );
}

Avatar.propTypes = {
  avatarSrc: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['online', 'offline']).isRequired,
};

export default Avatar;

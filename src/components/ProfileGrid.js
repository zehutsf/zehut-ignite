import React from 'react';
import ProfileGridItem from './ProfileGridItem';

export default ({ profiles }) => {
  const profileItems = profiles.map(profile => (
    <ProfileGridItem key={profile.name} {...profile}/>
  ));

  return (
    <div className="profile-grid">
      {profileItems}
    </div>
  );
};

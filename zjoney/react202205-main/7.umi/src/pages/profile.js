import React from 'react';
import { history } from 'umi';
function Profile() {
  return (
    <div>
      <h1 >Page profile</h1>
      <button onClick={history.goBack}>返回</button>
    </div>
  );
}
Profile.wrappers = ['@/wrappers/auth'];
export default Profile;
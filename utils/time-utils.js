'use strict';

function getHumanReadableTime() {
  const now = new Date();
  const hours = now.getHours();
    return `${hours}::${now.getMinutes()}::${now.getSeconds()} ${hours < 12 ? 'AM' : 'PM'}`;
}

module.exports = {
  getHumanReadableTime
};

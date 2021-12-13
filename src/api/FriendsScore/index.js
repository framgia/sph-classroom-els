import API from '../Base';

const FriendsScoreApi = {
  getAll: (quiz_id) => {
    const options = {
      method: 'GET',
      url: `/friendscore/${quiz_id}`,
    };

    return API.request(options);
  },
};

export default FriendsScoreApi;

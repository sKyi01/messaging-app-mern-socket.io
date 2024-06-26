export const getSender = (loggedUser, user) => {
    console.log(
        "users ",user
    )
    if (!user || user.length < 2) {
      return "Unknown User";
    }
    return user[0]._id === loggedUser._id ? user[1].name : user[0].name;
  };
  
  export const getSenderFull = (loggedUser, user) => {
    console.log(
        "users ",user
    )
    if (!user || user.length < 2) {
      return "Unknown User";
    }
    return user[0]._id === loggedUser._id ? user[1] : user[0];
  };

  
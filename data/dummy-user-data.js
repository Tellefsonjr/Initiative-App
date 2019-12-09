const USERS = [
  { id: "1",
    userName: "Timbo",
    characters: [],
    friends: [{
      id: "1.1",
      userName: "Jake",
      characters: [
        {
          id: "1.2",
          name: "Okaros",
          initiative: "15"
        }
      ]
    }]
  },
  {
    id: 2,
    userName: "Jake",
    characters: [
      {
        id: Math.random().toString(),
        name: "Okaros",
        initiative: "15"
      }
    ],
    friends:[]
  },
];

export default USERS;

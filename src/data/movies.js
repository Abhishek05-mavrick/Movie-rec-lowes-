const poster = (id) => `https://image.tmdb.org/t/p/w500${id}`;

export const movies = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi', rating: 8.8, year: 2010, poster: poster('/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'), description: 'A skilled thief who steals corporate secrets through dream-sharing technology is given an impossible task: planting an idea in a target’s mind.' },
  { id: 2, title: 'The Dark Knight', genre: 'Action', rating: 9.0, year: 2008, poster: poster('/qJ2tW6WMUDux911r6m7haRef0WH.jpg'), description: 'Batman faces a criminal mastermind whose reign of chaos pushes Gotham and its heroes to their limits.' },
  { id: 3, title: 'The Shawshank Redemption', genre: 'Drama', rating: 9.3, year: 1994, poster: poster('/lyQBXzOQTgA6Oqm21Yxql4vO5F.jpg'), description: 'Two imprisoned men find hope and friendship over decades in a harsh Maine penitentiary.' },
  { id: 4, title: 'The Godfather', genre: 'Drama', rating: 9.2, year: 1972, poster: poster('/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'), description: 'The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.' },
  { id: 5, title: 'Pulp Fiction', genre: 'Action', rating: 8.9, year: 1994, poster: poster('/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'), description: 'Interwoven stories of criminals, a boxer, and a pair of armed robbers unfold across Los Angeles.' },
  { id: 6, title: 'Forrest Gump', genre: 'Romance', rating: 8.8, year: 1994, poster: poster('/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'), description: 'A gentle man from Alabama witnesses and influences several defining moments in American history.' },
  { id: 7, title: 'The Matrix', genre: 'Sci-Fi', rating: 8.7, year: 1999, poster: poster('/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'), description: 'A hacker discovers that reality is a simulated world and joins a rebellion against its machine creators.' },
  { id: 8, title: 'Spirited Away', genre: 'Drama', rating: 8.6, year: 2001, poster: poster('/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg'), description: 'A young girl enters a world ruled by gods, witches, and spirits where humans are changed into beasts.' },
  { id: 9, title: 'Parasite', genre: 'Drama', rating: 8.5, year: 2019, poster: poster('/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'), description: 'A struggling family gradually inserts itself into the home and lives of a wealthy household.' },
  { id: 10, title: 'Interstellar', genre: 'Sci-Fi', rating: 8.7, year: 2014, poster: poster('/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'), description: 'Explorers travel through a wormhole in space in search of a new home for humanity.' },
  { id: 11, title: 'The Grand Budapest Hotel', genre: 'Comedy', rating: 8.1, year: 2014, poster: poster('/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg'), description: 'A concierge and his lobby boy become caught up in the theft of a priceless painting and a family fortune.' },
  { id: 12, title: 'Get Out', genre: 'Horror', rating: 7.8, year: 2017, poster: poster('/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg'), description: 'A young man uncovers a disturbing secret when he visits his girlfriend’s family estate.' },
  { id: 13, title: 'Mad Max: Fury Road', genre: 'Action', rating: 8.1, year: 2015, poster: poster('/hA2ple9q4qnwxp3hKVNhroipsir.jpg'), description: 'In a ruined wasteland, a woman rebels against a tyrant and joins a band of escaped prisoners.' },
  { id: 14, title: 'The Notebook', genre: 'Romance', rating: 7.8, year: 2004, poster: poster('/rNzQk4xZB8M8y3Z9g3aYqzV4c6v.jpg'), description: 'A timeless love story follows two people from different worlds whose bond endures through the years.' },
  { id: 15, title: 'Whiplash', genre: 'Drama', rating: 8.5, year: 2014, poster: poster('/7fn624j5lj3xTme2SgiLCeuedmO.jpg'), description: 'An ambitious jazz drummer is pushed to his limits by an intimidating and demanding instructor.' },
  { id: 16, title: 'The Hangover', genre: 'Comedy', rating: 7.7, year: 2009, poster: poster('/A0X0b8c9v9fK9x3Y4xM7W3S5W1.jpg'), description: 'Three friends retrace a chaotic night in Las Vegas to find their missing groom before the wedding.' },
  { id: 17, title: 'Alien', genre: 'Horror', rating: 8.5, year: 1979, poster: poster('/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg'), description: 'The crew of a commercial spacecraft encounters a deadly life form after answering a mysterious signal.' },
  { id: 18, title: 'La La Land', genre: 'Romance', rating: 8.0, year: 2016, poster: poster('/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'), description: 'A musician and an aspiring actor fall in love while pursuing their dreams in modern Los Angeles.' },
];

export const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance'];

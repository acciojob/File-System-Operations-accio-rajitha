const fs = require('fs');


const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.error('Please provide the path to the JSON file as a command line argument.');
  process.exit(1);
}


fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  let users;
  try {
    users = JSON.parse(data);
  } catch (parseErr) {
    console.error(`Error parsing JSON: ${parseErr}`);
    return;
  }

 
  console.log(`Total number of users: ${users.length}`);

  
  const highestScoreUser = users.reduce((prev, current) => (prev.score > current.score ? prev : current));
  console.log('User with the highest score:', highestScoreUser);

 
  users.sort((a, b) => b.score - a.score);

  
  fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      return;
    }
    console.log('Data sorted and written back to the JSON file.');
  });
});

const fs = require('fs');
const GetExistedArgv = require('./GetExistedArgv')
const path = require('path');

function GetFiles() {
  let files = GetExistedArgv()
  
  if (files.length === 0) {
    // 可能是colab模式
    try {
      const dockerAPPDirectoryPath = '/input/.docker-app';
      
      if (fs.existsSync(dockerAPPDirectoryPath)) {
        let stats = fs.statSync(dockerAPPDirectoryPath)
          
        if (stats.isDirectory()) {
          console.log(`${dockerAPPDirectoryPath} is a directory.`);
          files = getFilesInInput()
        } else {
          console.log(`${dockerAPPDirectoryPath} is not a directory.`);
        }
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  return files
}

function getFilesInInput () {
  const directoryPath = '/input/';

  let files = fs.readdirSync(directoryPath)
  let filteredFiles = files.filter(file => !file.startsWith('.') && !fs.statSync(path.join(directoryPath, file)).isDirectory())
    .map(file => '/input/' + file);

  return filteredFiles
}

module.exports = GetFiles
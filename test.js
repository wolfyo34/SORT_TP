const fs = require('fs-extra');

fs.ensureDir('./cat', err => {
    console.log(err)
});
const express = require('express')
const app = express()
const exec = require('child_process').exec
const port = 3000

app.post('/run-script', (req, res) => {
  exec(
    'sudo node /home/pi/GitHub/nevo/apps/plant_client/dist/src/index.js',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return res.status(500).send(`Error: ${error}`)
      }
      res.send(`stdout: ${stdout}\nstderr: ${stderr}`)
    }
  )
})

app.listen(port, () => {
  console.log(`Plant client server listening at http://localhost:${port}`)
})

const express = require("express")
const proxy = require("express-http-proxy")
const bodyParser = require("body-parser")
const _ = require("lodash")
const fs = require("fs")

const systemTemplates = require("./system_templates")
_.forEach(systemTemplates, el => el.system = true)

const userTemplates = require("./user_templates")


const app = express()

app.use(bodyParser.json())
app.use("/", express.static("./dist/iw-light-gui2"))
app.use("/service", proxy("http://bananapi:6080"))

app.get("/templates", function (req, res) {
  let templates = {}
  _.assign(templates, systemTemplates)
  _.assign(templates, userTemplates)
  res.status(200).json(templates).end()
})

app.post("/templates", function (req, res) {
  _.assign(userTemplates, req.body)

  persistUserTemplates((err) => {
    if (err) {
      res.status(500).end()
    } else {
      res.status(200).end()
    }
  })
})

app.delete("/templates/:tmpl", function (req, res) {
  let tmpl = req.params.tmpl
  _.unset(userTemplates, tmpl)

  persistUserTemplates((err) => {
    if (err) {
      res.status(500).end()
    } else {
      res.status(200).end()
    }
  })
})

function persistUserTemplates(cb) {
  let out = fs.createWriteStream("./user_templates.json")
  out.end(JSON.stringify(userTemplates), () => cb())
  out.on("error", (err) => cb(err))
}

app.listen(8082)

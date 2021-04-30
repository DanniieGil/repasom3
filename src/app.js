var express = require("express");
var bodyParser = require("body-parser");

var model = {
  clients: {},
  reset: () => {
    model.clients = {};
  },
  addAppointment: (name, arg2) => {
    let objeto = {
      date: arg2.date,
      status: "pending",
    };
    if (!model.clients.hasOwnProperty(name)) {
      model.clients[name] = [objeto];
    } else {
      model.clients[name].push(objeto);
    }
  },
  attend: (name, date) => {
    for (var i in model.clients[name]) {
      if (model.clients[name][i].date == date) {
        model.clients[name][i].status = "attended";
      }
    }
  },
  expire: (name, date) => {
    for (var i in model.clients[name]) {
      if (model.clients[name][i].date == date) {
        model.clients[name][i].status = "expired";
      }
    }
  },
  cancel: (name, date) => {
    for (var i in model.clients[name]) {
      if (model.clients[name][i].date == date) {
        model.clients[name][i].status = "cancelled";
      }
    }
  },
  erase: (name, info) => {
    var users = model.clients[name];
    if (info == "attended" || info == "cancelled") {
      for (var i = users.length - 1; i >= 0; i--) {
        if (users[i].status == info) {
          model.clients[name].splice(i, 1);
        }
      }
    } else {
      for (let i in model.clients[name]) {
        if (model.clients[name][i].date == info) {
          model.clients[name].splice(i, 1);
        }
      }
    }
  },
  getAppointments: (name, info) => {
    if (info) {
      return model.clients[name].filter((el) => {
        return el.status == info;
      });
    }
    return model.clients[name];
  },

  getClients: () => {
    return Object.keys(model.clients);
  },
};

var server = express();

server.get("/api", (req, res) => {
  res.json(model.clients);
});

server.post("/api/Appointments/", (req, res) => {
  try {
    const {client} = req.body
  } catch (error) {
    res.status(400).send("the body must have a client property")
  }

  // if (resultado) {
  //   res.status(400).send("the body must have a client property");
  // }
});

server.listen(3000);

module.exports = { model, server };

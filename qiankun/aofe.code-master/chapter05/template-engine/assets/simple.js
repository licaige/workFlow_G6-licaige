/*
 * Copyright 2014 Tomasz Mazur, Jacek Becela
 * https://github.com/trix/nano
 */

function simple(template, data) {
  return template.replace(/\{\{([\w\.]*)\}\}/g, function (str, key) {
    var keys = key.split(".");
    var value = data[keys.shift()];
    for (var i = 0; i < keys.length; i++) {
      value = value[keys[i]];
    }
    return (typeof value !== "undefined" && value !== null) ? value : "";
  });
}

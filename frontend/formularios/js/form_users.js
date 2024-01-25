"use strict";
const d = document;
const form = d.getElementById("formulario");
const crear_usuario = d.getElementById("crear_usuario");
const table = d.getElementById("crud-table");
const template = d.getElementById("crud-template").content;
const fragment = d.createDocumentFragment();

const ajax = (options) => {
  let { url, method, success, error, data } = options;

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 || xhr.status < 300) {
      const json = JSON.parse(xhr.responseText);
      success(json);
    } else {
      const err = xhr.statusText || "Ocurrio un error en la peticion";
      error(`Error ${xhr.status} : ${err}`);
    }
  });
  xhr.open(method || "GET", url);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(JSON.stringify(data));
};

const getAllUsers = () => {
  ajax({
    method: "GET",
    url: "http://127.0.0.1:3001/api/prueba/users",
    success: (res) => {
      const usuarios = res.users;
      console.log(usuarios);
      usuarios.forEach((el) => {
        // console.log(el.nombre);
        template.getElementById("nombre").textContent = el.nombre;
        template.getElementById("apellido").textContent = el.apellido;
        template.getElementById("numero").textContent = el.numero;
        template.getElementById("fecha").textContent = el.fecha;

        const clone = d.importNode(template, true);
        fragment.appendChild(clone);
      });
      table.querySelector("tbody").appendChild(fragment);
    },
    error: (err) => {
      console.warn(err);
      table.insertAdjacentHTML("afterend", `<p><b>${err}<b/><p/>`);
    },
    data: null,
  });
};

d.addEventListener("DOMContentLoaded", getAllUsers);

d.addEventListener("submit", (e) => {
  if (e.target === form) {
    e.preventDefault();

    if (!e.target.id.value) {
      //peticion post
      ajax({
        url: "http://127.0.0.1:3001/api/prueba/users",
        method: "POST",
        success: (res) => {
          location.reload();
          console.log("Creado");
        },
        error: (err) => {
          form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
        data: {
          nombre: e.target.nombre.value,
          apellido: e.target.apellido.value,
          numero: e.target.numero.value,
          fecha: e.target.fecha.value,
        },
      });
    }
  }
});

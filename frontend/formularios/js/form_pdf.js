"use strict";
const d = document;
const formulario = d.getElementById("formulario");
const input = d.getElementById("archivo_pdf");
const table = d.getElementById("crud-table");
const btn_preview = d.getElementById("preview");
const template = d.getElementById("crud-template").content;
const endopoint = "http://127.0.0.1:3001/api/prueba/pdf";

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

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:3001/api/prueba/pdf", true);

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const res = JSON.parse(xhr.responseText);
      console.log("PDF cargado", res);
    } else {
      console.log("Error al cargar el pdf", xhr.statusText);
    }
  };

  let pdfFile;

  xhr.send(formData);
});

const getPdf = () => {
  ajax({
    method: "GET",
    url: "http://127.0.0.1:3001/api/prueba/pdf",
    success: (res) => {
      const archivos = res.files;
      console.log(archivos);
      archivos.forEach((el) => {
        const titulo = el.titulo;
        const path = el.path;
        const link = path;

        // TABLA
        const row = document.createElement("tr");
        const tituloCell = document.createElement("td");
        const pathCell = document.createElement("td");
        const accionesCell = document.createElement("td");
        const btn = document.createElement("a");

        // CONTENIDO
        tituloCell.textContent = titulo;
        pathCell.textContent = path;
        btn.textContent = "Ver";

        // PREVISUALIZACION Y DESCARGA ARCHIVO
        btn.addEventListener("click", () => window.open(link, "_blank"));

        accionesCell.appendChild(btn);

        row.appendChild(tituloCell);
        row.appendChild(pathCell);
        row.appendChild(accionesCell);

        table.querySelector("tbody").appendChild(row);
      });
    },
    error: (err) => {
      console.warn(err);
      table.insertAdjacentHTML("afterend", `<p><b>${err}<b/><p/>`);
    },
    data: null,
  });
};

btn_preview.addEventListener("click", getPdf);

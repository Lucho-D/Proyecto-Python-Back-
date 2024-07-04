const BASEURL = 'http://127.0.0.1:5000';

/**
 * @param {string} url 
 * @param {string} method 
 * @param {Object} [data=null] 
 * @returns {Promise<Object>} 
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null, 
  };
  try {
    const response = await fetch(url, options); 
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
  @returns 
 */
async function saveProducto(){
  const idProducto = document.querySelector('#id-producto').value;
  const producto = document.querySelector('#producto').value;
  const descripcion = document.querySelector('#descripcion').value;
  const releaseDate = document.querySelector('#release-date').value;
  const banner = document.querySelector('#banner-form').value;

  //VALIDACION DE FORMULARIO
  if (!producto || !descripcion || !releaseDate || !banner) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  const productoData = {
      producto: producto,
      descripcion: descripcion,
      release_date: releaseDate,
      banner: banner,
  };

    
  let result = null;
  if(idProducto!==""){
    result = await fetchData(`${BASEURL}/api/productos/${idProducto}`, 'PUT', productoData);
  }else{
    result = await fetchData(`${BASEURL}/api/productos/`, 'POST', productoData);
  }
  
  const formProducto = document.querySelector('#form-producto');
  formProducto.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showProductos();
}



async function showProductos(){
  let productos =  await fetchData(BASEURL+'/api/productos/', 'GET');
  const tableProductos = document.querySelector('#list-table-productos tbody');
  tableProductos.innerHTML='';
  productos.forEach((producto,index) => {
    let tr = `<tr>
                  <td>${producto.producto}</td>
                  <td>${producto.descripcion}</td>
                  <td>${producto.release_date}</td>
                  <td>
                      <img src="${producto.banner}" width="20%">
                  </td>
                  <td>
                      <button class="btn-cac" onclick='updateProducto(${producto.id_producto})'><i class="fa fa-pencil" ></button></i>
                      <button class="btn-cac" onclick='deleteProducto(${producto.id_producto})'><i class="fa fa-trash" ></button></i>
                  </td>
                </tr>`;
    tableProductos.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
  @param {number} id 
 */
function deleteProducto(id){
  Swal.fire({
      title: "Esta seguro de eliminar la producto?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'DELETE');
        showProductos();
        Swal.fire(response.message, "", "success");
      }
  });
  
}


/**
  @param {number} id
 */
async function updateProducto(id){
  let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'GET');
  const idProducto = document.querySelector('#id-producto');
  const producto = document.querySelector('#producto');
  const descripcion = document.querySelector('#descripcion');
  const releaseDate = document.querySelector('#release-date');
  const banner = document.querySelector('#banner-form');
  
  idProducto.value = response.id_producto;
  producto.value = response.producto;
  descripcion.value = response.descripcion;
  releaseDate.value = response.release_date;
  banner.value = response.banner;
}
  
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveProducto = document.querySelector('#btn-save-producto');
  btnSaveProducto.addEventListener('click',saveProducto);
  showProductos();
});
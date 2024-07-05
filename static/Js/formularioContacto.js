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
async function saveContacto(){
  const idContacto = document.querySelector('#id-contacto').value;
  const nombre = document.querySelector('#nombre').value;
  const email = document.querySelector('#email').value;
  const asunto = document.querySelector('#asunto').value;
  const consulta = document.querySelector('#consulta').value;

  //VALIDACION DE FORMULARIO
  if (!nombre || !email || !asunto || !consulta) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  const contactoData = {
      nombre: nombre,
      email: email,
      asunto: asunto,
      consulta: consulta,
  };

    
  let result = null;
  if(idContacto!==""){
    result = await fetchData(`${BASEURL}/api/contacto/${idContacto}`, 'PUT', contactoData);
  }else{
    result = await fetchData(`${BASEURL}/api/contacto/`, 'POST', contactoData);
  }
  
  const formContacto = document.querySelector('#formulario');
  formContacto.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showContacto();
}



async function showContacto(){
  let contacto=  await fetchData(BASEURL+'/api/contacto/', 'GET');
  const tableContacto = document.querySelector('#list-table-contacto tbody');
  tableContacto.innerHTML='';
  contacto.forEach((contacto,index) => {
    let tr = `<tr>
                  <td>${contacto.nombre}</td>
                  <td>${contacto.email}</td>
                  <td>${contacto.asunto}</td>
                  <td>${contacto.consulta}</td>

                  <td>
                      <button class="btn-cac" onclick='updateContacto(${contacto.id_contacto})'><i class="fa fa-pencil" ></button></i>
                      <button class="btn-cac" onclick='deleteContacto(${contacto.id_contacto})'><i class="fa fa-trash" ></button></i>
                  </td>
                </tr>`;
    tableContacto.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
  @param {number} id 
 */
// function deleteContacto(id){
//   Swal.fire({
//       title: "Esta seguro de eliminar la contacto?",
//       showCancelButton: true,
//       confirmButtonText: "Eliminar",
//   }).then(async (result) => {
//       if (result.isConfirmed) {
//         let response = await fetchData(`${BASEURL}/api/contacto/${id}`, 'DELETE');
//         showContacto();
//         Swal.fire(response.message, "", "success");
//       }
//   });
  
// }


/**
  @param {number} id
 */
async function updateContacto(id){
  let response = await fetchData(`${BASEURL}/api/contacto/${id}`, 'GET');
  const idContacto = document.querySelector('#id-contacto');
  const nombre = document.querySelector('#nombre');
  const email = document.querySelector('#email');
  const asunto = document.querySelector('#asunto');
  const consulta= document.querySelector('#consulta');
  const banner = document.querySelector('#banner-form');
  
  idContacto.value = response.id_contacto;
  nombre.value = response.nombre;
  email.value = response.email;
  asunto.value = response.asunto;
  consulta.value = response.consulta;
  banner.value = response.banner;
}
  
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveContacto = document.querySelector('#btn-save-contacto');
  btnSaveContacto.addEventListener('click',saveContacto);
//   showProductos();
});
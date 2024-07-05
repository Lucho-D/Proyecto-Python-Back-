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
async function saveComment(){
  const idComment = document.querySelector('#id-comment').value;
  const usuario = document.querySelector('#usuario').value;
  const comentario = document.querySelector('#comentario').value;
  const releaseDate = document.querySelector('#release-date').value;

  //VALIDACION DE FORMULARIO
  if (!usuario || !comentario || !releaseDate) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  const commentData = {
      usuario: usuario,
      comentario: comentario,
      release_date: releaseDate,
  };

    
  let result = null;
  if(idComment!==""){
    result = await fetchData(`${BASEURL}/api/comments/${idComment}`, 'PUT', commentData);
  }else{
    result = await fetchData(`${BASEURL}/api/comments/`, 'POST', commentData);
  }
  
  const formComment = document.querySelector('#form-comment');
  formComment.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showComments();
}


async function showComments(){
  let comments =  await fetchData(BASEURL+'/api/comments/', 'GET');
  const tableComments = document.querySelector('#list-table-comments tbody');
  tableComments.innerHTML='';
  comments.forEach((comment,index) => {
    let tr = `<tr>
                  <td>${comment.usuario}</td>
                  <td>${comment.comentario}</td>
                  <td>${comment.release_date}</td>
                  <td>
                      <button class="btn-cac" onclick='updateComment(${comment.id_comment})'><i class="fa fa-pencil"></button></i>
                      <button class="btn-cac" onclick='deleteComment(${comment.id_comment})'><i class="fa fa-trash"></button></i>
                  </td>
                </tr>`;
    tableComments.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
  @param {number} id
 */
function deleteComment(id){
  Swal.fire({
      title: "¿Está seguro de eliminar el comentario?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/comments/${id}`, 'DELETE');
        showComments();
        Swal.fire(response.message, "", "success");
      }
  });
}


/**
  @param {number} id
 */
async function updateComment(id){
  let response = await fetchData(`${BASEURL}/api/comments/${id}`, 'GET');
  const idComment = document.querySelector('#id-comment');
  const usuario = document.querySelector('#usuario');
  const comentario = document.querySelector('#comentario');
  const releaseDate = document.querySelector('#release-date');
  
  idComment.value = response.id_comment;
  usuario.value = response.usuario;
  comentario.value = response.comentario;
  releaseDate.value = response.release_date;
}
  
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveComment = document.querySelector('#btn-save-comment');
  btnSaveComment.addEventListener('click',saveComment);
  showComments();
});

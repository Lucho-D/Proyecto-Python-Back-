from flask import jsonify, request
from app.models import Comment, Producto, Contacto

def index():
    return jsonify({'message': 'Hello World API Cac-comments/productoscontacto'})

def create_comment():
    data = request.json
    new_comment = Comment(usuario=data['usuario'], comentario=data['comentario'], release_date=data['release_date'])
    new_comment.save()
    return jsonify({'message': 'Comment created successfully'}), 201

def get_all_comments():
    comments = Comment.get_all()
    return jsonify([comment.serialize() for comment in comments])

def get_comment(comment_id):
    comment = Comment.get_by_id(comment_id)
    if not comment:
        return jsonify({'message': 'Comment not found'}), 404
    return jsonify(comment.serialize())

def update_comment(comment_id):
    comment = Comment.get_by_id(comment_id)
    if not comment:
        return jsonify({'message': 'Comment not found'}), 404
    data = request.json
    comment.usuario = data['usuario']
    comment.comentario = data['comentario']
    comment.release_date = data['release_date']
    comment.save()
    return jsonify({'message': 'Comment updated successfully'})

def delete_comment(comment_id):
    comment = Comment.get_by_id(comment_id)
    if not comment:
        return jsonify({'message': 'Comment not found'}), 404
    comment.delete()
    return jsonify({'message': 'Comment deleted successfully'})



# def index():
#     return jsonify({'message': 'Hello World API Cac-productos'})

def create_producto():
    data = request.json
    new_producto = Producto(producto=data['producto'], descripcion=data['descripcion'], release_date=data['release_date'], banner=data['banner'])
    new_producto.save()
    return jsonify({'message': 'Producto created successfully'}), 201

def get_all_productos():
    productos = Producto.get_all()
    return jsonify([producto.serialize() for producto in productos])

def get_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto not found'}), 404
    return jsonify(producto.serialize())

def update_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto not found'}), 404
    data = request.json
    producto.producto = data['producto']
    producto.descripcion = data['descripcion']
    producto.release_date = data['release_date']
    producto.banner = data['banner']
    producto.save()
    return jsonify({'message': 'Producto updated successfully'})

def delete_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto not found'}), 404
    producto.delete()
    return jsonify({'message': 'Producto deleted successfully'})

# ##################################

def create_contacto():
    data = request.json
    new_contacto = Contacto(nombre=data['nombre'], email=data['email'], asunto=data['asunto'], consulta=data['consulta'])
    new_contacto.save()
    return jsonify({'message': 'Contacto created successfully'}), 201

def get_all_contactos():
    contactos = Contacto.get_all()
    return jsonify([contacto.serialize() for contacto in contactos])

def get_contacto(contacto_id):
    contacto = Contacto.get_by_id(contacto_id)
    if not contacto:
        return jsonify({'message': 'Contacto not found'}), 404
    return jsonify(contacto.serialize())

def update_contacto(contacto_id):
    contacto = Contacto.get_by_id(contacto_id)
    if not contacto:
        return jsonify({'message': 'Contacto not found'}), 404
    data = request.json
    contacto.nombre = data['nombre']
    contacto.email = data['email']
    contacto.asunto = data['asunto']
    contacto.consulta = data['consulta']
    contacto.save()
    return jsonify({'message': 'Contacto updated successfully'})

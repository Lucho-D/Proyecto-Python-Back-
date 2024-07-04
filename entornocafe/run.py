from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *



app = Flask(__name__)

init_app(app)

CORS(app)

app.route('/', methods=['GET'])(index)
app.route('/api/comments/', methods=['POST'])(create_comment)
app.route('/api/comments/', methods=['GET'])(get_all_comments)
app.route('/api/comments/<int:comment_id>', methods=['GET'])(get_comment)
app.route('/api/comments/<int:comment_id>', methods=['PUT'])(update_comment)
app.route('/api/comments/<int:comment_id>', methods=['DELETE'])(delete_comment)

app.route('/', methods=['GET'])(index)
app.route('/api/productos/', methods=['POST'])(create_producto)
app.route('/api/productos/', methods=['GET'])(get_all_productos)
app.route('/api/productos/<int:producto_id>', methods=['GET'])(get_producto)
app.route('/api/productos/<int:producto_id>', methods=['PUT'])(update_producto)
app.route('/api/productos/<int:producto_id>', methods=['DELETE'])(delete_producto)

app.route('/', methods=['GET', 'POST'])(index)
app.route('/api/contacto/', methods=['POST'])(create_contacto)
app.route('/api/contacto/', methods=['GET'])(get_all_contactos)
app.route('/api/contacto/<int:contacto_id>', methods=['GET'])(get_contacto)
app.route('/api/contacto/<int:contacto_id>', methods=['PUT'])(update_contacto)

if __name__ == '__main__':
    app.run(debug=True)
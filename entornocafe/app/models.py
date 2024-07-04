from app.database import get_db

class Comment:
    
    def __init__(self, id_comment=None, usuario=None, comentario=None, release_date=None):
        self.id_comment = id_comment
        self.usuario = usuario
        self.comentario = comentario
        self.release_date = release_date

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_comment:
            cursor.execute("""
                UPDATE comments SET usuario = %s, comentario = %s, release_date = %s
                WHERE id_comment = %s
            """, (self.usuario, self.comentario, self.release_date, self.id_comment))
        else:
            cursor.execute("""
                INSERT INTO comments (usuario, comentario, release_date) VALUES (%s, %s, %s)
            """, (self.usuario, self.comentario, self.release_date))
            self.id_comment = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM comments")
        rows = cursor.fetchall()
        comments = [Comment(id_comment=row[0], usuario=row[1], comentario=row[2], release_date=row[3]) for row in rows]
        cursor.close()
        return comments

    @staticmethod
    def get_by_id(comment_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM comments WHERE id_comment = %s", (comment_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Comment(id_comment=row[0], usuario=row[1], comentario=row[2], release_date=row[3])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM comments WHERE id_comment = %s", (self.id_comment,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_comment': self.id_comment,
            'usuario': self.usuario,
            'comentario': self.comentario,
            'release_date': self.release_date.strftime('%Y-%m-%d')
        }





class Producto:
    
    def __init__(self, id_producto=None, producto=None, descripcion=None, release_date=None, banner=None):
        self.id_producto = id_producto
        self.producto = producto
        self.descripcion = descripcion
        self.release_date = release_date
        self.banner = banner

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_producto:
            cursor.execute("""
                UPDATE productos SET producto = %s, descripcion = %s, release_date = %s, banner = %s
                WHERE id_producto = %s
            """, (self.producto, self.descripcion, self.release_date, self.banner, self.id_producto))
        else:
            cursor.execute("""
                INSERT INTO productos (producto, descripcion, release_date, banner) VALUES (%s, %s, %s, %s)
            """, (self.producto, self.descripcion, self.release_date, self.banner))
            self.id_producto = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM productos")
        rows = cursor.fetchall()
        productos = [Producto(id_producto=row[0], producto=row[1], descripcion=row[2], release_date=row[3], banner=row[4]) for row in rows]
        cursor.close()
        return productos

    @staticmethod
    def get_by_id(producto_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM productos WHERE id_producto = %s", (producto_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Producto(id_producto=row[0], producto=row[1], descripcion=row[2], release_date=row[3], banner=row[4])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM productos WHERE id_producto = %s", (self.id_producto,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_producto': self.id_producto,
            'producto': self.producto,
            'descripcion': self.descripcion,
            'release_date': self.release_date.strftime('%Y-%m-%d'),
            'banner': self.banner
        }



class Contacto:
    
    def __init__(self, id_contacto=None, nombre=None, email=None, asunto=None, consulta=None):
        self.id_contacto = id_contacto
        self.nombre = nombre
        self.email = email
        self.asunto = asunto
        self.consulta = consulta

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_contacto:
            cursor.execute("""
                UPDATE contacto SET nombre = %s, email = %s, asunto = %s, consulta = %s
                WHERE id_contacto = %s
            """, (self.nombre, self.email, self.asunto, self.consulta, self.id_contacto))
        else:
            cursor.execute("""
                INSERT INTO contacto (nombre, email, asunto, consulta) VALUES (%s, %s, %s, %s)
            """, (self.nombre, self.email, self.asunto, self.consulta))
            self.id_producto = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM contacto")
        rows = cursor.fetchall()
        contacto = [Contacto(id_contacto=row[0], nombre=row[1], email=row[2], asunto=row[3], consulta=row[4]) for row in rows]
        cursor.close()
        return contacto

    @staticmethod
    def get_by_id(contacto_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM contacto WHERE id_contacto = %s", (contacto_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Contacto(id_contacto=row[0], nombre=row[1], email=row[2], asunto=row[3], consulta=row[4])
        return None

    def serialize(self):
        return {
            'id_contacto': self.id_contacto,
            'nombre': self.nombre,
            'email': self.email,
            'asunto': self.asunto,
            'consulta': self.consulta
        }

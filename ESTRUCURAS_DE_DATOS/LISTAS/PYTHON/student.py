class Student:
    """Clase que representa a un estudiante con nombre, ID y calificación."""
    def __init__(self, student_id, name, grade):
        self.student_id = student_id
        self.name = name
        self.grade = grade

    def get_info(self):
        return f"ID: {self.student_id}, Nombre: {self.name}, Nota: {self.grade}"


class Course:
    """Clase que gestiona una lista de estudiantes dentro de un curso."""
    def __init__(self, course_name):
        self.course_name = course_name
        self.students = []

    def add_student(self, student):
        """Agrega un nuevo estudiante a la lista."""
        self.students.append(student)
        print(f"✅ Estudiante {student.name} agregado al curso {self.course_name}")

    def remove_student(self, student_id):
        """Elimina un estudiante por ID."""
        for i, s in enumerate(self.students):
            if s.student_id == student_id:
                del self.students[i]
                print(f"🗑️ Estudiante con ID {student_id} eliminado.")
                return
        print("❌ Estudiante no encontrado.")

    def update_grade(self, student_id, new_grade):
        """Actualiza la nota de un estudiante."""
        for s in self.students:
            if s.student_id == student_id:
                s.grade = new_grade
                print(f"✏️ Nota actualizada para {s.name}. Nueva nota: {new_grade}")
                return
        print("❌ Estudiante no encontrado.")

    def list_students(self):
        """Muestra todos los estudiantes registrados."""
        if not self.students:
            print("No hay estudiantes inscritos.")
        else:
            print(f"📋 Estudiantes en {self.course_name}:")
            for s in self.students:
                print(" -", s.get_info())


# === Simulación ===
python_course = Course("Programación en Python")

s1 = Student(1, "Felipe", 4.5)
s2 = Student(2, "María", 3.8)
s3 = Student(3, "Juan", 4.0)

python_course.add_student(s1)
python_course.add_student(s2)
python_course.add_student(s3)

python_course.list_students()
python_course.update_grade(2, 4.2)
python_course.remove_student(3)
python_course.list_students()

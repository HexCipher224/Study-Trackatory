START

CREATE empty list called students

WHEN user submits form:
    GET student name
    GET student ID
    GET course
    GET grade

    IF any field is empty:
        SHOW error message
    ELSE:
        CREATE student object with name, id, course, grade
        ADD student object to students list
        DISPLAY student in table
        CLEAR form inputs

FUNCTION displayStudents:
    CLEAR table body
    FOR each student in students list:
        CREATE table row
        INSERT student details into row
        ADD row to table

END                   //////////                       <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Tracker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
  <h2 class="text-center mb-4">📚 Student Tracker</h2>

  <!-- Form -->
  <div class="card p-4 mb-4">
    <form id="studentForm">
      <div class="row">
        <div class="col-md-3">
          <input type="text" id="name" class="form-control" placeholder="Student Name">
        </div>
        <div class="col-md-3">
          <input type="text" id="studentId" class="form-control" placeholder="Student ID">
        </div>
        <div class="col-md-3">
          <input type="text" id="course" class="form-control" placeholder="Course">
        </div>
        <div class="col-md-2">
          <input type="text" id="grade" class="form-control" placeholder="Grade">
        </div>
        <div class="col-md-1">
          <button type="submit" class="btn btn-primary w-100">Add</button>
        </div>
      </div>
    </form>
  </div>

  <!-- Table -->
  <div class="card p-3">
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>ID</th>
          <th>Course</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody id="studentTable">
        <!-- Data goes here -->
      </tbody>
    </table>
  </div>
</div>

<script>
  // Store students
  let students = [];

  // Get form
  const form = document.getElementById("studentForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById("name").value;
    const id = document.getElementById("studentId").value;
    const course = document.getElementById("course").value;
    const grade = document.getElementById("grade").value;

    // Validation
    if (name === "" || id === "" || course === "" || grade === "") {
      alert("Please fill all fields!");
      return;
    }

    // Create student object
    const student = {
      name: name,
      id: id,
      course: course,
      grade: grade
    };

    // Add to array
    students.push(student);

    // Display
    displayStudents();

    // Reset form
    form.reset();
  });

  function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${student.name}</td>
          <td>${student.id}</td>
          <td>${student.course}</td>
          <td>${student.grade}</td>
        </tr>
      `;
      table.innerHTML += row;
    });
  }
</script>

</body>
</html>

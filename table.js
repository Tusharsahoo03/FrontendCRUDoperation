$(document).ready(function() {
    // Fetch data from the server
    $.get("http://localhost:8084/student/fetchAll", function(data) {
        var tableBody = $("#studentTableBody");
        var noDataMessage = $("#noDataMessage");

        // Check if data is undefined or not an array
        if (!Array.isArray(data) || data.length === 0) {
            noDataMessage.text("No data available.");
        } else {
            // Clear any previous "No data available" message
            noDataMessage.text("");

            // Loop through the student data
            data.forEach(function(student) {
                // Create a new table row with student data and buttons for actions
                var row = "<tr id='row-" + student.id + "'>" +
                    "<td>" + student.name + "</td>" +
                    "<td>" + student.age + "</td>" +
                    "<td>" + student.email + "</td>" +
                    "<td>" +
                        "<button class='w3-button w3-blue' onclick='editStudent(" + JSON.stringify(student) + ")'>Update</button> " +
                        "<button class='w3-button w3-red' onclick='deleteStudent(\"" + student.id + "\")'>Delete</button>" +
                    "</td>" +
                    "</tr>";
                
                // Append the row to the table body
                tableBody.append(row);
            });
        }
    }).fail(function() {
        alert("Error fetching student data.");
    });
});

// Function to handle the update action
function editStudent(student) {
    // Show modal with student info
    $("#studentId").val(student.id);
    $("#studentName").val(student.name);
    $("#studentAge").val(student.age);
    $("#studentEmail").val(student.email);
    document.getElementById('updateModal').style.display = 'block';
}

// Handle the form submission for updating the student
$("#updateStudentForm").submit(function(event) {
    event.preventDefault();

    var studentId = $("#studentId").val();
    var updatedStudent = {
        id: studentId,
        name: $("#studentName").val(),
        age: $("#studentAge").val(),
        email: $("#studentEmail").val()
    };

    // Send the updated data to the server via PUT
    $.ajax({
        url: "http://localhost:8084/students/" + studentId,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedStudent),
        success: function(result) {
            // Close the modal
            document.getElementById('updateModal').style.display = 'none';

            // Update the student row in the table
            $("#row-" + studentId + " td:nth-child(1)").text(updatedStudent.name);
            $("#row-" + studentId + " td:nth-child(2)").text(updatedStudent.age);
            $("#row-" + studentId + " td:nth-child(3)").text(updatedStudent.email);

            alert("Student with ID " + studentId + " has been updated.");
        },
        error: function(xhr, status, error) {
            console.error("Error updating student: " + error);
            alert("Error updating student with ID " + studentId);
        }
    });
});

// Function to handle Delete action
function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        $.ajax({
            url: "http://localhost:8084/students/" + id,  // Use the actual student ID in the URL
            type: "DELETE",  // DELETE method
            success: function(result) {
                // Remove the student row from the table after successful deletion
                $("#row-" + id).remove();

                // Check if the table is empty after deletion
                if ($("#studentTableBody tr").length === 0) {
                    $("#noDataMessage").text("No data available.");
                }

                alert("Student with ID " + id + " has been deleted.");
            },
            error: function(xhr, status, error) {
                console.error("Error deleting student: " + error);
                alert("Error deleting student with ID " + id);
            }
        });
    }
}
var courseName=document.querySelector("#courseName");
var courseCategory=document.querySelector("#courseCategory");
var coursePrice=document.querySelector("#coursePrice");
var courseDescription=document.querySelector("#courseDescription");
var courseCapacity=document.querySelector("#courseCapacity");
var addBtn=document.querySelector("#click");

var inputs=document.querySelectorAll('.input')
var courses=[];

var search=document.querySelector('#search')
var nameError =document.querySelector('.nameError')
if(JSON.parse(localStorage.getItem("courses"))==null){
    var courses=[];
}
else{
courses=JSON.parse(localStorage.getItem("courses"));
displayData();
}
addBtn.addEventListener("click",function(e){


    e.preventDefault();
    addCourses();
    clearInputs();
})

function addCourses(){
    var course ={
        name:courseName.value,
        category:courseCategory.value,
        price:coursePrice.value,
        description:courseDescription.value,
        capacity:courseCapacity.value
    }
    courses.push(course)
    localStorage.setItem("courses",JSON.stringify(courses));
    displayData();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 3000
      });
    }

function clearInputs(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
    
}

function displayData(){
    var result="";
    for(var i =0;i<courses.length;i++){
        result += `
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].description}</td>
            <td>${courses[i].capacity}</td>
            <td><button class='btn btn-outline-info' onclick="updateCourse(${i})">update</button></td>
            <td><button class='btn btn-outline-danger' onclick="deleteCourse(${i})">Delete</button></td>
        </tr>
    `;
    }
document.getElementById("data").innerHTML=result;
}

function deleteCourse(id){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id,1)
            localStorage.setItem("courses",JSON.stringify(courses));

            displayData();
        
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
   
}
function updateCourse(id) {
    console.log("update", id);
    displayData();

}

search.addEventListener("keyup",function(e){

    var result="";
    for(var i =0;i<courses.length;i++){
        if(courses[i].name.toLowerCase().includes(e.target.value.toLowerCase()))

        result += `
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].description}</td>
            <td>${courses[i].capacity}</td>
            <td><button class='btn btn-outline-info' onclick="updateCourse(${i})">update</button></td>
            <td><button class='btn btn-outline-danger' onclick="deleteCourse(${i})">Delete</button></td>
        </tr>
    `;
}
document.getElementById("data").innerHTML=result;

})


courseName.addEventListener("keyup", function() {
    var pattern = /^[A-Z][a-z]{2,10}$/;

    if (pattern.test(courseName.value)) {
        if (courseName.classList.contains("is-invalid")) {
            courseName.classList.remove("is-invalid");
        }
        courseName.classList.add("is-valid");
        nameError.style.cssText = "display: none"; // إخفاء رسالة الخطأ
        addBtn.removeAttribute("disabled")
    } else {
        if (courseName.classList.contains("is-valid")) {
            courseName.classList.remove("is-valid");
        }
        courseName.classList.add("is-invalid");
        nameError.style.cssText = "display: block"; // إظهار رسالة الخطأ
        addBtn.setAttribute("disabled","disabled")

    }
});

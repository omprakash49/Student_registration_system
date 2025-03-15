

const form = document.getElementById("student_form");
form.addEventListener("submit", studentData);

let studentNo = 1;


function studentData(e) {
    
    e.preventDefault();

    

    let stuName = document.getElementById("name").value;
    let stuId = document.getElementById("id").value;
    let email = document.getElementById("email").value;
    let number = document.getElementById("contact").value;


    if (localStorage.getItem("latestKey"))
        studentNo = parseInt(localStorage.getItem("latestKey"));
    
    // const students = []; 

    // store form data to localstorage 
    student = [stuName, stuId, email, number];
    localStorage.setItem('a'+studentNo, student.toString());
    


    updateFormAfter(student ,'a'+studentNo );
    studentNo = studentNo + 1;

    localStorage.setItem("latestKey", studentNo);
    
    


    console.log(stuName,stuId,email , number);
    this.reset(); 
    
    
}


                


// adding new student to the register
function addStudent(stuName, stuId, email, number,nkey){

    // creating taable row for add students
    const stuRow = document.createElement("tr");
    stuRow.className = nkey ;
    stuRow.setAttribute("contenteditable", "false");

    const nameData = document.createElement("td");
    nameData.innerHTML = stuName;  
    stuRow.appendChild(nameData);

    const idData = document.createElement("td");
    idData.innerHTML = stuId;
    stuRow.appendChild(idData);

    const emailData = document.createElement("td");
    emailData.innerHTML = email;
    stuRow.appendChild(emailData);
       
    const numberData = document.createElement("td");
    numberData.innerHTML = number;
    stuRow.appendChild(numberData);

    const editButton = document.createElement("td");
    const eButton = document.createElement("button");
    eButton.innerHTML = "Edit" ;
    eButton.classList.add('ebut',nkey);
    editButton.appendChild(eButton);
    stuRow.appendChild(editButton);


    const delbutton = document.createElement("td");
    const dButton = document.createElement("button");
    dButton.innerHTML = "Delete" ;
    dButton.classList.add('dbut', nkey);
    delbutton.appendChild(dButton);
    stuRow.appendChild(delbutton);

    const tabBody = document.getElementById("tabBody");
    tabBody.appendChild(stuRow);
    console.log(studentNo, "afte update");

}
         




window.onload =  function updateForm(){
    let keys = Object.keys(localStorage);

    for(let key of keys){
        if (key === 'latestKey') continue;0
        let arry = localStorage.getItem(key).split(",");
        addStudent(arry[0],arry[1],arry[2],arry[3],key);
        
    }
}








function updateFormAfter(student, nkey){
    addStudent(student[0],student[1],student[2],student[3],nkey);

}




  

// adding event listener for deleting  and editing a row


const wrapper = document.getElementById("tabBody");
wrapper.addEventListener("click", deleteRow );

function deleteRow(e) {
    if (e.target.matches(".dbut") )
    {

        console.log(e.target.classList[1]);
        const delEle =  document.querySelector("."+e.target.classList[1]);
        localStorage.removeItem(e.target.classList[1]);
        delEle.remove();


    }


    if (e.target.matches(".ebut"))
    {
        const edtEle = document.querySelector("."+e.target.classList[1]);
        console.log(edtEle);
        if(edtEle.contentEditable === 'false')
        {
            edtEle.contentEditable = 'true';
            edtEle.childNodes[4].childNodes[0].innerHTML = "Save";
        }
        else
        {
            console.log(studentNo);
            edtEle.contentEditable = 'false';
            edtEle.childNodes[4].childNodes[0].innerHTML = "Edit";
            let newData = [];
            newData[0] = edtEle.childNodes[0].innerHTML;
            newData[1] = edtEle.childNodes[1].innerHTML;
            newData[2] = edtEle.childNodes[2].innerHTML;
            newData[3] = edtEle.childNodes[3].innerHTML;
            console.log(newData);
            console.log(edtEle.childNodes[0].innerHTML);
            localStorage.setItem(e.target.classList[1], newData.toString());
            console.log(studentNo);
        }

    }
}
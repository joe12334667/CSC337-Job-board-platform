// CSC337 CHIU YEH CHEN
// This file is a js file to be used in this project.
// it contain a function that need to be called when the event happens.

const URL = "http://localhost";

// check user's info to login in.
function userLogin() {

    var u = document.getElementById("username_login").value;
    var p = document.getElementById("password_login").value;

    let url = URL + '/account/login/' + u + '/' + p + '/';
    fetch(url)
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            console.log('username' + u);
            if (JSON.parse(text)['status'] == true) {
                searchUsername(u);
            } else {
                document.getElementById("login_p").value = "wrong username/password!";
            }
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
        });

}

//  using ajax to add a user to the database.
function addUser() {

    var u = document.getElementById("username").value;
    var p = document.getElementById("password").value;
    var e = document.getElementById('email').value;

    var radioButtons = document.querySelectorAll('input[name="userType"]');
    let userType;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            userType = radioButton.value;
            break;
        }
    }

    //add recruiter/seeker and email

    if(u == undefined) {
        document.getElementById("create_p").innerHTML = "Must enter a username.";
    }else if (p == undefined) {
        document.getElementById("create_p").innerHTML = "Must enter a password. It's recommended you choose a strong password for your new account";
    }else if (e == undefined) {
        document.getElementById("create_p").innerHTML = "Must enter an email.";
    }else if (userType == undefined) {
        document.getElementById("create_p").innerHTML = "Must state what user experience you are looking for.";
    }else {
        if(!e.includes("@")) 
            document.getElementById("create_p").innerHTML = "Enter a valid email address.";
        else {
            let url =  URL + '/add/user/';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    username: u,
                    password: p,
                    email: e,
                    accountType: userType,
                }),
                headers: {
                    'Content-type': 'application/json',
                }
            })
                .then((response) => {
                    return response.text();
                })
                .then((results) => {
                    console.log(results);
                    if(results == 'taken') {
                        document.getElementById("create_p").innerHTML = 'That username is taken. Please choose another.';
                    } else {
                        document.getElementById("create_p").innerHTML = 'Account created! Log in to start yopur job looking needs.';

                    }
                })
                .catch((error) => {
                    console.log('THERE WAS A PROBLEM');
                    console.log(error);
                });
        }
    }
}

//  using ajax to add a item to the database.
function addItem() {
    var t = document.getElementById("title").value;
    var d = document.getElementById("description").value;
    var i = document.getElementById("image").value;
    var p = document.getElementById("price").value;
    var s = document.getElementById("stat").value;
    var u = getUsername();

    let url = URL + '/add/item/' + u + '/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: t,
            description: d,
            image: i,
            price: p,
            stat: s

        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            console.log(text);
            alert(text);
            window.location.href = "/User_home.html";
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });
}

function addPosting() {
    var t = document.getElementById("title").value;
    var d = document.getElementById("description").value;
    var c = document.getElementById("company").value;
    var l = document.getElementById("location").value;

    var employmentRadio = document.querySelectorAll('input[name="employment"]');
    let employment;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            employment = radioButton.value;
            break;
        }
    }

    var experienceRadio = document.querySelectorAll('input[name="experience"]');
    let experience;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            experience = radioButton.value;
            break;
        }
    }

    var educationRadio = document.querySelectorAll('input[name="education"]');
    let education;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            education = radioButton.value;
            break;
        }
    }

    let url = URL + '/add/posting/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: t,
            description: d,
            company: c,
            location: l,
            employmentType: employment,
            experienceLevel: experience,
            educationLevel: education,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            console.log(text);
            alert(text);
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });
}

function searchUsername(u, at) {
    console.log('i got here');
    var url = '/search/users/' + u;

    let p = fetch(url);
    let ps = p.then((results) => {
        return results.json();
    }).then((items) => {
        if (items[0].accountType == 'recruiter' || at == "recruiter") {
            window.location.href = "/job_post.html";
        } else {
            //job seeker
            window.location.href = "/User_home.html";
        }
    }).catch(() => {
        alert('something went wrong');
    });
}

function searchJob() {
    var t = document.getElementById("title").value;
    var l = document.getElementById("location").value;
    var e = document.getElementById("employment-type").value;
    var a = document.getElementById("salary").value;
    var d = document.getElementById("date").value;

    if (d == "Past 24h") {
        d = new Date();
        d.setDate(d.getDate() - 1);
    } else if (d == "Past week") {
        d = new Date();
        d.setDate(d.getDate() - 7);
    } else if (d == "Past month") {
        d = new Date();
        d.setDate(d.getDate() - 30);
    } else if (d == "Anytime") {
        d = "";

    }
    if (a == "All salaries") {
        a = "";
    }
    if (e == "All jobs") {
        e = "";
    }



    // var c = document.getElementById("company").value;
    // var l = document.getElementById("location").value;

    console.log(JSON.stringify({
        title: t,
        company: t,
        description: t,
        location: l,
        date: d,
        amount: a,
        employmentType: e
        // employmentType: employment,
        // experienceLevel: experience,
        // educationLevel: education,
    }));

    let url = URL + '/search/job/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: t,
            company: t,
            description: t,
            location: l,
            date: d,
            amount: a,
            employmentType: e
            // employmentType: employment,
            // experienceLevel: experience,
            // educationLevel: education,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((text) => {
            displayPostings(text);
            displayCompanies();
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });


}

function JobSearchUsedRecruiterUserId(RId){
    let url = URL + '/search/job/';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: "",
            company: "",
            description: "",
            location: "",
            date: "",
            amount: "",
            employmentType: "",
            RecruiterUserId : RId
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((text) => {
            displayPostings(text);
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });

}

function displayPostings(items) {
    let items_div = document.getElementById("displayContent");

    //clearing the display area
    while (items_div.firstChild) {
        items_div.removeChild(items_div.firstChild);
    }

    if (items.length == 0) {
        items_div.innerHTML = 'No job results found. Try redefining your search terms';
    }

    for (let i = 0; i < items.length; i++) {
        var salary = items[i].salary;
        formatString = '<div' + '">'
            + items[i].title.bold() + '<br/>'
            + '<p> Job Description </p>'
            + items[i].description + '<br/>'
            + '' + '<br/>'
            + 'Company: ' + items[i].company + '<br/>'
            + 'Field location: ' + items[i].location + '</div>\n' + '<br/>'
            + 'Job type: ' + items[i].employmentType  + '</div>\n' + '<br/>'
            + '<p> Salary Information </p>'
            + "Salary type: " + salary.JobType + '<br/>' + " Starting salary: " + salary.amount + '<br/>' + " Currency type: " + salary.currency + '<br/>'
            + '<p> Date Posted: </p>' + items[i].createdAt + '</div>\n' + '<br/>';

        //styling the new div
        let div = document.createElement("div");
        div.setAttribute('id', 'posting');
        div.innerHTML = formatString;

        // add apply button
        let button = document.createElement('button');
        button.textContent = 'Apply';
        button.id = items[i]['_id'];
        button.onclick = () => {
            applyJob(button);
        };
        div.appendChild(button);

        items_div.appendChild(div);
    }
}

function applyJob(job) {
    userId = getCookie().u_Id;
    fetch(URL + '/apply/job/' + userId + '/' + job.id + '/')
        .then((response) => { return response.text() })
        .then((text) => {
             console.log(text); 
             alert(text);
            })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });

}

// turn js cookie to readable string.
// from internet.
const parseCookie = str =>
    str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});


// return username in the cookie.        
function getCookie() {
    return JSON.parse(parseCookie(document.cookie)['login'].slice(2,));
}

function sendUToProfile() {
    window.location.href = "/User_profile.html";
}

function sendRToProfile(){
    window.location.href = "/recruiter_profile.html";
}

function sendToHelp(){
    window.location.href = "/help.html";
}

function sendToJobs(){
    console.log('hello?')
    window.location.href = "/User_home.html";
}

function addExperience(){

    const experience= document.getElementById("experience-info");
    const div= document.createElement("div");

    const line=document.createElement("p");
    line.innerHTML="------------------------------------";

    const label1= document.createElement("label");
    label1.innerHTML="Title";
    const title= document.createElement("input");
    title.id="title";

    const label2= document.createElement("label");
    label2.innerHTML="company";
    const company= document.createElement("input");
    company.id="company";

    const label3= document.createElement("label");
    label3.innerHTML="description";
    const description= document.createElement("input");
    description.id="description";

    const label4= document.createElement("label");
    label4.innerHTML="start Date";
    const startdate= document.createElement("input");
    startdate.id="startdate";

    const label5= document.createElement("label");
    label5.innerHTML="End Date";
    const enddate= document.createElement("input");
    startdate.id="enddate";


    div.appendChild(line);
    div.appendChild(label1);
    div.appendChild(title);
    div.appendChild(label2);
    div.appendChild(company);
    div.appendChild(label3);
    div.appendChild(description);
    div.appendChild(label4);
    div.appendChild(startdate);
    div.appendChild(label5);
    div.appendChild(enddate);

    div.id="experience-info";

    experience.appendChild(div);
}

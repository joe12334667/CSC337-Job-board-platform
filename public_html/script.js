// CSC337 CHIU YEH CHEN
// This file is a js file to be used in this project.
// it contain a function that need to be called when the event happens.

const URL = "http://localhost";
selectedUser = '';

// check user's info to login in.
function userLogin() {

    var u = document.getElementById("username_login").value;
    var p = document.getElementById("password_login").value;

    localStorage.setItem("selectedUser", u);

    let url = '/account/login/' + u + '/' + p + '/';
    fetch(url)
        .then((response) => {
            return response.text();
        })
        .then((text) => {
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

    console.log('employment ' + employment + ' experience ' + experience + ' education ')
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
            postedBy : {
                RecruiterUserId : getCookie().u_Id,
                RecruiterUserName : getCookie().username,
            },
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

function searchUsername(u) {
    var url = '/search/users/' + u;

    let p = fetch(url);
    let ps = p.then((results) => {
        return results.json();
    }).then((items) => {
        console.log(items[0].accountType)
        if (items[0].accountType == 'recruiter') {
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
        })
        .catch((error) => {
            console.log('THERE WAS A PROBLEM');
            console.log(error);
        });
}

function searchCompany(title) {
    let url = '/search/company/' + title + '/';

    let p = fetch(url);
    let ps = p.then( (results) => {
      return results.text();
    }).then((items) => { 
        console.log(items)
    }).catch((err) => { 
        console.log(err);
      alert('something went wrong');
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

function sendRToProfile() {
    window.location.href = "/recruiter_profile.html";
}

function sendToHelp() {
    window.location.href = "/help.html";
}

function sendToJobs() {
    window.location.href = "/User_home.html";
}

function sendToPostings() {
    window.location.href = "/job_post.html";
}

function addExperience() {
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
        //here is where i wanted to grab every company
        // searchCompany(items[i].company);
        console.log(items[i].title);
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

function postedJobs() {
    var url = '/search/users/' + localStorage.getItem("selectedUser");

    let p = fetch(url);
    let ps = p.then((results) => {
        return results.json();
    }).then((items) => {
        displayPostedJobs(items);
    }).catch(() => {
        alert('something went wrong');
    });
}

function displayApplications() {
    let items_div = document.getElementById("profile-info");

    //clearing the display area
    while (items_div.firstChild) {
        items_div.removeChild(items_div.firstChild);
    }

}

function displayPostedJobs(items) {
    let items_div = document.getElementById("profile-info");

    //clearing the display area
    while (items_div.firstChild) {
        items_div.removeChild(items_div.firstChild);
    }

    for (let i = 0; i < items.length; i++) {
        //here is where i wanted to grab every company
        formatString = '<div' + '">'
            + items[i].postedJobs + '<br/>'


        //styling the new div
        let div = document.createElement("div");
        div.setAttribute('id', 'profile-section');
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
    
function displayAppliedJobs(){

    userId = getCookie().u_Id;

    let url="/display/jobs/"+userId;

    let p=fetch(url);

    p.then((response)=>{
        return response.json();
    })

    .then((data)=>{

        if (data.length==0){
            let section=document.getElementById("profile-info");
            section.innerHTML="";
            section.innerHTML="You have not applied to jobs yet";

        }

        else{se

                let section=document.getElementById("profile-info");
                section.innerHTML="";


            for (i in data){
                let div= document.createElement("div");


                let title= document.createElement("div");
                title.innerHTML=data[i].title;
                div.appendChild(title);

                let description =document.createElement("div");
                description.innerHTML="Description: " + data[i].description;
                div.appendChild(description);

                let company =document.createElement("div");
                company.innerHTML="Company: "+data[i].company;
                div.appendChild(company);

                let location =document.createElement("div");
                location.innerHTML="Location: "+data[i].location;
                div.appendChild(location);

                let employmentType =document.createElement("div");
                employmentType.innerHTML="Type: "+data[i].employmentType;
                div.appendChild(employmentType);

                let experienceLevel =document.createElement("div");
                experienceLevel.innerHTML= "Experience Level: "+ data[i].experienceLevel;
                div.appendChild(experienceLevel);

                let educationLevel =document.createElement("div");
                educationLevel.innerHTML="Education Level: "+ data[i].educationLevel;
                div.appendChild(educationLevel);

                let salary= document.createElement("div");
                salary.innerHTML= "Salary: "+data[i].salary.amount+ " "+ data[i].salary.currency;
                div.appendChild(salary);

                div.id="applied_job";

                section.appendChild(div);
            }
        }

    }).catch((error) => {
        console.log('THERE WAS A PROBLEM');
        console.log(error);
    });

}



function save2(){

    let fname=document.getElementById("fname").value;
    let lname=document.getElementById("lname").value;
    let about=document.getElementById("about").value;

    const data ={ firstname:fname,lastname:lname,about:about };

    let url="/save2/data/";

    let p = fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });


    p.then((response)=>{
        return response.text;
    });

    p.then((data)=>{
        if(data=="saved")
        alert("Saved");
    });

}


function save3(){

    let country=document.getElementById("country").value;
    let city=document.getElementById("city").value;

    const data ={country:country,city:city};

    let url="/save3/data/";

    let p = fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });


    p.then((response)=>{
        return response.text;
    });

    p.then((data)=>{
        if(data=="saved")
        alert("Saved");
    });

}

function save4(){

    let instituation=document.getElementById("instituation").value;
    let degree=document.getElementById("degree").value;
    let field=document.getElementById("field").value;
    let start=document.getElementById("start").value;
    let end=document.getElementById("start").value;

    const data ={instituation:instituation,degree:degree,field:field,start:start,end:end};
    
    let url="/save4/data/";

    let p = fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });


    p.then((response)=>{
        return response.text;
    });

    p.then((data)=>{
        if(data=="saved")
        alert("Saved");
    });

}

function save5(){

    let website=document.getElementById("website").value;
    let linkedin=document.getElementById("linkedin").value;
    let portfolio=document.getElementById("portfolio").value;

    const data ={website:website,linkedin:linkedin,portfolio:portfolio};
    
    let url="/save5/data/";

    let p = fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });


    p.then((response)=>{
        return response.text;
    });

    p.then((data)=>{
        if(data=="saved")
        alert("Saved");
    });

}

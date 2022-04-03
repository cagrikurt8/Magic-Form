function saveData() {
    let fName = document.getElementById("fname").value
    localStorage.setItem("firstName", fName)

    let lName = document.getElementById("lname").value
    localStorage.setItem("lastName", lName)

    let email = document.getElementById("email").value
    localStorage.setItem("email", email)

    let phone = document.getElementById("phone").value
    localStorage.setItem("phone", phone)

    let company = document.getElementById("company").value
    localStorage.setItem("company", company)

    let address = document.getElementById("address").value
    localStorage.setItem("address", address)
}

function reload() {
    document.getElementById("fname").value = localStorage.getItem("firstName")
    document.getElementById("lname").value = localStorage.getItem("lastName")
    document.getElementById("email").value = localStorage.getItem("email")
    document.getElementById("phone").value = localStorage.getItem("phone")
    document.getElementById("company").value = localStorage.getItem("company")
    document.getElementById("address").value = localStorage.getItem("address")

    repeatReload()
}

function saveHistory() {
    let userData = new Array(0)

    if (localStorage.getItem("userData") == null) {
        localStorage.setItem("userData", JSON.stringify(userData))
    } else {
        userData = JSON.parse(localStorage.getItem("userData"))
    }

    let fName = document.getElementById("fname").value
    let lName = document.getElementById("lname").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let company = document.getElementById("company").value
    let address = document.getElementById("address").value

    let template = `<p><b>First Name</b></p>
                    <p class="card-first-name">${fName}</p><br>
                    <p><b>Last Name</b></p>
                    <p class="card-last-name">${lName}</p><br>
                    <P><b>Email</b></P>
                    <p class="card-email">${email}</p><br>
                    <p><b>Phone</b></p>
                    <p class="card-phone">${phone}</p><br>
                    <p><b>Company</b></p>
                    <p class="card-company">${company}</p><br>
                    <p><b>Address</b></p>
                    <p class="card-address">${address}</p><br>
                    <button class="delete-button" onclick="deleteRecord(this.parentElement)">Delete</button>`

    userData.push(template)
    localStorage.setItem("userData", JSON.stringify(userData))

    localStorage.setItem("firstName", "")
    localStorage.setItem("lastName", "")
    localStorage.setItem("email", "")
    localStorage.setItem("phone", "")
    localStorage.setItem("company", "")
    localStorage.setItem("address", "")
}

function importHistory() {
    if (localStorage.getItem("userData") !== null) {
        let userData = JSON.parse(localStorage.getItem("userData"))
        let i;

        for (i = 0; i < userData.length; i++) {
            if (userData[i] !== null) {
                const div = document.createElement("div")
                div.innerHTML = userData[i]
                div.setAttribute("class", "submit-history-card")
                document.body.appendChild(div)
            }
        }
    }
}

function repeatReload() {
    return setInterval(reload, 100)
}

function deleteRecord(parentDiv) {
    let userData = JSON.parse(localStorage.getItem("userData"))
    let i;

    let fName = parentDiv.querySelector(".card-first-name").innerText

    for (i = 0; i < userData.length; i++) {
        if (userData[i].includes(fName)) {
            userData[i] = null
            break
        }
    }

    document.body.innerHTML = `
    <nav>
        <ul>
            <li><a id="form-link" href="index.html">Form</a></li>
            <li><a id="history-link" href="history.html">History</a></li>
        </ul>
    </nav>
`

    localStorage.setItem("userData", JSON.stringify(userData))
    importHistory()
}
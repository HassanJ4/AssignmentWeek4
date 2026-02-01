const display = document.getElementById('app')
const form = document.getElementById('form')
const baseURL = 'http://localhost:4242'

async function fetchData() {
  const response = await fetch(`${baseURL}/messages`)
  const messages = await response.json()

  console.log(messages)

  return messages
}



async function displayMessages() {
  const messages = await fetchData()

  messages.forEach((message) => {
    const div = document.createElement('div')
    const userName = document.createElement('p')
    const messageContent = document.createElement('p')

    userName.textContent = message.msg_name
    messageContent.textContent = message.content

    div.append(userName, messageContent)

    display.appendChild(div)
  })
}

displayMessages()


async function handleSubmit(event) {
  event.preventDefault()

  const formData = new FormData(form)
  const userInput = Object.fromEntries(formData)
  const userInputJSON = JSON.stringify(userInput)

  if (!userInput.msg_name || !userInput.content) {
  alert("Please fill in all fields")
  return
}

  async function fetchMessages() {
    const response = await fetch(`${baseURL}/messages`)
    const messages = await response.json()
    return messages
  }

  

  async function displayMessages() {
    const messages = await fetchMessages()

    display.innerHTML = ''

    messages.forEach((message) => {
      const div = document.createElement('div')
      const userName = document.createElement('p')
      const messageContent = document.createElement('p')

      userName.textContent = message.msg_name
      messageContent.textContent = message.content
      
      div.append(userName, messageContent)
      display.appendChild(div)
    })
  }
  
  const response = await fetch(`${baseURL}/messages`, {
    headers: {
      "Content-Type" : "application/json"
    },
    method: "POST",
    body: userInputJSON
  })
  window.location.reload()
} 

form.addEventListener('submit', handleSubmit)
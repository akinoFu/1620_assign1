// elements
const wrap = document.querySelector('.wrapper')
const btnNew = document.querySelector('.btn_new')
const btnTheme = document.querySelector('.btn_theme')
const btnSave = document.querySelector('.btn_save')
const btnCancel = document.querySelector('.btn_cancel')
const divHeader = document.querySelector('.header')
const divMenu = document.querySelector('.sidebar')
const divContent = document.querySelector('.content')
const divFooter = document.querySelector('.footer')
const textarea = document.querySelector('textarea')
const buttons = document.querySelectorAll('button')
const ulNotes = document.querySelector('.note_list')
const lblMsg = document.querySelector('.lbl_message')

// Keep the original colors for Light Theme
const bgWrap = window.getComputedStyle(wrap, null).getPropertyValue('background-color')
const bgHeader = window.getComputedStyle(divHeader, null).getPropertyValue('background-color')
const bgFooter = window.getComputedStyle(divFooter, null).getPropertyValue('background-color')
const bgMenu = window.getComputedStyle(divMenu, null).getPropertyValue('background-color')
const bgContent = window.getComputedStyle(divContent, null).getPropertyValue('background-color')
const bgBtnNew = window.getComputedStyle(btnNew, null).getPropertyValue('background-color')
const bgBtnTheme = window.getComputedStyle(btnTheme, null).getPropertyValue('background-color')
const bgBtnSave = window.getComputedStyle(btnSave, null).getPropertyValue('background-color')
const bgBtnCancel = window.getComputedStyle(btnCancel, null).getPropertyValue('background-color')
const bgTextarea = window.getComputedStyle(textarea, null).getPropertyValue('background-color')
const colorHeader = window.getComputedStyle(divHeader, null).getPropertyValue('color')
const colorFooter = window.getComputedStyle(divFooter, null).getPropertyValue('color')
const colorMenu = window.getComputedStyle(divMenu, null).getPropertyValue('color')
const colorBtnNew = window.getComputedStyle(btnNew, null).getPropertyValue('color')
const colorBtnTheme = window.getComputedStyle(btnTheme, null).getPropertyValue('color')
const colorBtnSave = window.getComputedStyle(btnSave, null).getPropertyValue('color')
const colorBtnCancel = window.getComputedStyle(btnCancel, null).getPropertyValue('color')
const colorTextarea = window.getComputedStyle(textarea, null).getPropertyValue('color')


let notesArray = [{title:"note one", body:"some text 1"},
                    {title:"note two", body:"some text 2"}]


let editingTitle = ''    // used when the save button is pressed


textarea.value = ''
dispNoteLists()


btnTheme.addEventListener('click', () => {
    if (btnTheme.innerText == "Dark Theme") {
        wrap.style.backgroundColor = 'rgb(0, 0, 0)'
        divHeader.style.backgroundColor = 'rgb(77,69,69)'
        divHeader.style.color = 'rgb(237,141,141)'
        divFooter.style.backgroundColor = 'rgb(77,69,69)'
        divFooter.style.color = 'rgb(141,98,98)'
        divMenu.style.backgroundColor = 'rgb(0, 0, 0)'
        divMenu.style.color = 'rgb(255, 255, 255)'
        divContent.style.backgroundColor = 'rgb(64, 64, 64)'
        textarea.style.backgroundColor = 'rgb(96, 96, 96)'
        textarea.style.color = 'rgb(255, 255, 255)'
        btnNew.style.backgroundColor = 'rgb(0, 51, 0)'
        btnTheme.style.backgroundColor = 'rgb(0, 0, 0)'
        btnSave.style.backgroundColor = 'rgb(0, 51, 0)'
        btnCancel.style.backgroundColor = 'rgb(51, 0, 0)'
        btnNew.style.color = 'rgb(160, 160, 160)'
        btnTheme.style.color = 'rgb(160, 160, 160)'
        btnSave.style.color = 'rgb(160, 160, 160)'
        btnCancel.style.color = 'rgb(160, 160, 160)'
        btnTheme.innerText = 'Light Theme'
        

    } else {
        wrap.style.backgroundColor = bgWrap
        divHeader.style.backgroundColor = bgHeader
        divHeader.style.color = colorHeader
        divFooter.style.backgroundColor = bgFooter
        divFooter.style.color = colorFooter
        divMenu.style.backgroundColor = bgMenu
        divMenu.style.color = colorMenu
        divContent.style.backgroundColor = bgContent
        textarea.style.backgroundColor = bgTextarea
        textarea.style.color = colorTextarea
        btnNew.style.backgroundColor = bgBtnNew
        btnTheme.style.backgroundColor = bgBtnTheme
        btnSave.style.backgroundColor = bgBtnSave
        btnCancel.style.backgroundColor = bgBtnCancel
        btnNew.style.color = colorBtnNew
        btnTheme.style.color = colorBtnTheme
        btnSave.style.color = colorBtnSave
        btnCancel.style.color = colorBtnCancel
        btnTheme.innerText = 'Dark Theme'
    }
    
})


btnCancel.addEventListener('click', () => {
    showObjects(false)
    showMessage(false)
})


btnNew.addEventListener('click', () => {
    showObjects(true)
    showMessage(false)
    textarea.value = ''
    editingTitle = ''
})


btnSave.addEventListener('click', () => {
    const noteAll = textarea.value.trim()
    let noteTitle = ''
    let noteBody = ''

    // Execute only if there is a text
    if (noteAll) {
        // Separate the text into the title and body
        const i = noteAll.indexOf(`\n`)
        if (i == -1) {
            noteTitle = noteAll
            noteBody = ''
        } else {
            noteTitle = noteAll.substring(0, i)
            noteBody = noteAll.substring(i+1)
        }
        
        // Update or Add
        if (editingTitle) {
            // update an existing note
            updateNote(noteTitle, noteBody, editingTitle)
            dispNoteLists()
        } else {
            // add a new note
            const index = notesArray.findIndex(({title}) => title === noteTitle)
            if (index == -1) {
                notesArray.push({title: noteTitle, body: noteBody})
                showMessage(true)
                dispNoteLists()
            } else {
                const overwrite = window.confirm(`The title "${noteTitle}" exists. Do you with to overwrite?`)
                if (overwrite) {
                    updateNote(noteTitle, noteBody, noteTitle)
                    dispNoteLists()
                } else {
                    alert('Change the title.')
                }
            }
        }
    }
})


ulNotes.addEventListener('click', (e) => {
    showObjects(true)
    showMessage(false)
    editingTitle = e.target.innerText
    for (a_note of notesArray) {
        if (a_note.title == editingTitle) {
            textarea.value = `${a_note.title}\n${a_note.body}`
        }
    }
})


function dispNoteLists() {
    let noteList = ''
    for (a_note of notesArray) {
        noteList += `<li>${a_note.title}</li>`
    }
    document.querySelector('ul').innerHTML = noteList
}


function updateNote(newTitle, newBody, oldTitle) {
    const index = notesArray.findIndex(({title}) => title === oldTitle)
    notesArray[index].title = newTitle
    notesArray[index].body = newBody
    showMessage(true)
}


function showObjects(flgVisible) {
    if (flgVisible) {
        textarea.style.display = 'block'
        btnSave.style.display = 'block'
        btnCancel.style.display = 'block'
    } else {
        textarea.style.display = 'none'
        btnSave.style.display = 'none'
        btnCancel.style.display = 'none'
    }
}

function showMessage(flgShow) {
    if (flgShow) {
        const date1 = new Date()
        lblMsg.innerText = `Saved [`
                            + `${date1.getHours()}:`
                            + `${date1.getMinutes()}:`
                            + `${date1.getSeconds()}]`

    } else {
        lblMsg.innerText = ''
    }
}
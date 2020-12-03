/* Set HTML */
const headerHTML = `        <div class="header">
                                <img class="menu_img" src="images/menu.png" onclick="showMobileMenu()">
                                <h1>Take Better Notes</h1>
                            </div>`

const menuHTML = getMenuHTML('sidebar')

const mobileMenuHTML = getMenuHTML('mobileMenu')

const contentHTML = `       <div class="content">
                                <div class="disp_mode">
                                    <div><button class="btn_new" onclick="newNote()">New Note</button></div>
                                    <div><button class="btn_theme" onClick="clickBtnTheme()">Dark Theme</button></div>
                                    <div class="lbl_message"><label></label></div>
                                </div>
                                <div class="note_text">
                                    <textarea placeholder="This is a placeholder"></textarea>
                                </div>
                                <div class="note_save">
                                    <div><button class="btn_save" onclick="saveNote()">Save</button></div>
                                    <div><button class="btn_cancel" onclick="cancel()">Cancel</button></div>
                                </div>
                            </div>`
const footerHTML = `        <div class="footer">
                                <div class="footer_txt">Keep in Touch</div>
                                <div class="icons">
                                    <div><img class="icon_1" src="images/instagram.png" alt="SNS icon 1"></div>
                                    <div><img class="icon_2" src="images/facebook.png" alt="SNS icon 2"></div>
                                </div>
                            </div>`


/* Load initial HTML */
const divWrapInit = document.querySelector('.wrapper')
divWrapInit.innerHTML = headerHTML + menuHTML + contentHTML + footerHTML
let notesArray = [{title:"note one", body:"some text 1"},
                    {title:"note two", body:"some text 2"}]
dispNoteLists()
let editingTitle = ''        // used to judge the displayed text is being created or edited
let currentTheme = 'light'   // 'light' or 'dark'


/* Keep the original colors for Light Theme */
const btnNewInit = document.querySelector('.btn_new')
const btnThemeInit = document.querySelector('.btn_theme')
const btnSaveInit = document.querySelector('.btn_save')
const btnCancelInit = document.querySelector('.btn_cancel')
const divHeaderInit = document.querySelector('.header')
const divMenuInit = document.querySelector('.sidebar')
const divContentInit = document.querySelector('.content')
const divFooterInit = document.querySelector('.footer')
const textareaInit = document.querySelector('textarea')
const bgWrap = window.getComputedStyle(divWrapInit, null).getPropertyValue('background-color')
const bgHeader = window.getComputedStyle(divHeaderInit, null).getPropertyValue('background-color')
const bgFooter = window.getComputedStyle(divFooterInit, null).getPropertyValue('background-color')
const bgMenu = window.getComputedStyle(divMenuInit, null).getPropertyValue('background-color')
const bgContent = window.getComputedStyle(divContentInit, null).getPropertyValue('background-color')
const bgBtnNew = window.getComputedStyle(btnNewInit, null).getPropertyValue('background-color')
const bgBtnTheme = window.getComputedStyle(btnThemeInit, null).getPropertyValue('background-color')
const bgBtnSave = window.getComputedStyle(btnSaveInit, null).getPropertyValue('background-color')
const bgBtnCancel = window.getComputedStyle(btnCancelInit, null).getPropertyValue('background-color')
const bgTextarea = window.getComputedStyle(textareaInit, null).getPropertyValue('background-color')
const clrHeader = window.getComputedStyle(divHeaderInit, null).getPropertyValue('color')
const clrFooter = window.getComputedStyle(divFooterInit, null).getPropertyValue('color')
const clrMenu = window.getComputedStyle(divMenuInit, null).getPropertyValue('color')
const clrBtnNew = window.getComputedStyle(btnNewInit, null).getPropertyValue('color')
const clrBtnTheme = window.getComputedStyle(btnThemeInit, null).getPropertyValue('color')
const clrBtnSave = window.getComputedStyle(btnSaveInit, null).getPropertyValue('color')
const clrBtnCancel = window.getComputedStyle(btnCancelInit, null).getPropertyValue('color')
const clrTextarea = window.getComputedStyle(textareaInit, null).getPropertyValue('color')


/*
    <button class="btn_new" onclick="newNote()">
    onClick event   : newNote()
    Description     : Show the initial screen
*/
function newNote() {
    showObjects(true)
    showMessage(false)
    document.querySelector('textarea').value = ''
    editingTitle = ''
}

/*
    <button class="btn_theme" onClick="clickBtnTheme()">
    onClick event   : clickBtnTheme()
    Description     : Switchover the theme
*/
function clickBtnTheme() {
    if (currentTheme == 'light') {
        changeTheme('dark')
    } else {
        changeTheme('light')
    }
}


/*
    <button class="btn_cancel" onclick="cancel()">
    onClick event   : cancel()
    Description     : Cancel creating/editing a note
*/
function cancel() {
    showObjects(false)
    showMessage(false)
}


/*
    <button class="btn_save" onclick="saveNote()">
    onClick event   : saveNote()
    Description     : Save the current note
*/
function saveNote() {
    const textarea = document.querySelector('textarea')
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
                // if the title is unique
                notesArray.push({title: noteTitle, body: noteBody})
                showMessage(true)
                dispNoteLists()
                editingTitle = noteTitle
            } else {
                // if the same title exists 
                const overwrite = window.confirm(`The title "${noteTitle}" exists. Do you with to overwrite?`)
                if (overwrite) {
                    updateNote(noteTitle, noteBody, noteTitle)
                    dispNoteLists()
                    editingTitle = noteTitle
                } else {
                    alert('Change the title.')
                }
            }
        }
    }
}


/*
    <img class="menu_img" src="images/menu.png" onclick="showMobileMenu()">
    onClick event   : showMobileMenu()
    Description     : Show the note list (only mobile mode)
*/
    function showMobileMenu() {
    const wrap = document.querySelector('.wrapper')
    wrap.innerHTML = mobileMenuHTML
    dispNoteLists()
    if (currentTheme == 'dark') {
        const divMenu = document.querySelector('.mobileMenu')
        divMenu.style.backgroundColor = 'rgb(0, 0, 0)'
        divMenu.style.color = 'rgb(255, 255, 255)'
    }
}


/*
    <div class="close" onclick="closeMenu()">
    onClick event   : closeMenu()
    Description     : Close the note list (only mobile mode)
*/
function closeMenu(){
    const wrap = document.querySelector('.wrapper')
    wrap.innerHTML = headerHTML + menuHTML + contentHTML + footerHTML
    dispNoteLists()
    changeTheme(currentTheme)
}


/*
    <li onclick="selectNote(this)">
    onClick event   : selectNote(element)
    Description     : Display the note clicked on the list
*/
function selectNote(element) {
    editingTitle = element.innerText
    // mobile menu => exit menu display
    if (document.querySelector(".header") == null) {
        const wrap = document.querySelector('.wrapper')
        wrap.innerHTML = headerHTML + menuHTML + contentHTML + footerHTML
        dispNoteLists()
        changeTheme(currentTheme)
    // pc menu
    } else {
        showObjects(true)
        showMessage(false)
    }
    // Show the note in the textarea
    for (a_note of notesArray) {
        if (a_note.title == editingTitle) {
            const textarea = document.querySelector('textarea')
            textarea.value = `${a_note.title}\n${a_note.body}`
            break
        }
    }
}


/*
    Function    : getMenuHTML(className)
    Decctiption : Create HTML for the note menu
    Argument    : String
    Return      : String
*/
function getMenuHTML(className) {
    const menuHTML = `        <div class="${className}">
                                <div class="menu_title">
                                    <div>My Notes</div>
                                    <div class="close" onclick="closeMenu()">X</div>
                                </div>
                                <ul class="note_list"></ul>
                            </div>`
    return menuHTML
}


/*
    Function    : changeTheme(theme)
    Decctiption : Change elements' colors according to the argument
    Argument    : String ("dark"/"light")
    Return      : None
*/
function changeTheme(theme) {
    const divWrap = document.querySelector('.wrapper') 
    const btnNew = document.querySelector('.btn_new')
    const btnTheme = document.querySelector('.btn_theme')
    const btnSave = document.querySelector('.btn_save')
    const btnCancel = document.querySelector('.btn_cancel')
    const divHeader = document.querySelector('.header')
    const divMenu = document.querySelector('.sidebar')
    const divContent = document.querySelector('.content')
    const divFooter = document.querySelector('.footer')
    const textarea = document.querySelector('textarea')

    if (theme == 'dark') {
        currentTheme = 'dark'
        btnTheme.innerText = 'Light Theme'
        divWrap.style.backgroundColor = 'rgb(0, 0, 0)'
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
    } else {
        currentTheme = 'light'
        btnTheme.innerText = 'Dark Theme'
        divWrap.style.backgroundColor = bgWrap
        divHeader.style.backgroundColor = bgHeader
        divHeader.style.color = clrHeader
        divFooter.style.backgroundColor = bgFooter
        divFooter.style.color = clrFooter
        divMenu.style.backgroundColor = bgMenu
        divMenu.style.color = clrMenu
        divContent.style.backgroundColor = bgContent
        textarea.style.backgroundColor = bgTextarea
        textarea.style.color = clrTextarea
        btnNew.style.backgroundColor = bgBtnNew
        btnTheme.style.backgroundColor = bgBtnTheme
        btnSave.style.backgroundColor = bgBtnSave
        btnCancel.style.backgroundColor = bgBtnCancel
        btnNew.style.color = clrBtnNew
        btnTheme.style.color = clrBtnTheme
        btnSave.style.color = clrBtnSave
        btnCancel.style.color = clrBtnCancel
    }
}


/*
    Function    : dispNoteLists()
    Decctiption : Create <li> elements and insert in the <ul>
    Argument    : None
    Return      : None
*/
function dispNoteLists() {
    const noteList = `${notesArray.map(i => `<li onclick="selectNote(this)">${i['title']}</li>`).join('\n ')}`
    document.querySelector('ul').innerHTML = noteList
}


/*
    Function    : updateNote(newTitle, newBody, oldTitle)
    Decctiption : Update the existing values in notesArray
    Argument    : String, string, string
    Return      : None
*/
function updateNote(newTitle, newBody, oldTitle) {
    const index = notesArray.findIndex(({title}) => title === oldTitle)
    notesArray[index].title = newTitle
    notesArray[index].body = newBody
    showMessage(true)
}


/*
    Function    : showObjects(flgVisible)
    Decctiption : Switch the display of the texarea and save/cancel buttons
    Argument    : Boolean
    Return      : None
*/
function showObjects(flgVisible) {
    const textarea = document.querySelector('textarea')
    const btnSave = document.querySelector('.btn_save')
    const btnCancel = document.querySelector('.btn_cancel')   
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


/*
    Function    : showMessage(flgShow)
    Decctiption : Switch the display of save message on the label
    Argument    : Boolean
    Return      : None
*/
function showMessage(flgShow) {
    const lblMsg = document.querySelector('.lbl_message')
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

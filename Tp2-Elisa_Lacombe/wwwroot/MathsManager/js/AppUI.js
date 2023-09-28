Init_UI();

function Init_UI() {
    renderMaths();
}

async function renderBookmarks() {
    showWaitingGif();
    let Bookmarks = await Bookmarks_API.Get();
    compileCategories(Bookmarks)
    eraseContent();
    if (Bookmarks !== null) {
        Bookmarks.forEach(Bookmark => {
            if ((selectedCategory === "") || (selectedCategory === Bookmark.Category))
                $("#content").append(renderBookmark(Bookmark));
        });
        restoreContentScrollPosition();
        // Attached click events on command icons
        $(".editCmd").on("click", function () {
            saveContentScrollPosition();
            renderEditBookmarkForm(parseInt($(this).attr("editBookmarkId")));
        });
        $(".deleteCmd").on("click", function () {
            saveContentScrollPosition();
            renderDeleteBookmarkForm(parseInt($(this).attr("deleteBookmarkId")));
        });
        // $(".BookmarkRow").on("click", function (e) { e.preventDefault(); })
    } else {
        renderError("Service introuvable");
    }
}
function showWaitingGif() {
    $("#content").empty();
    $("#content").append($("<div class='waitingGifcontainer'><img class='waitingGif' src='Loading_icon.gif' /></div>'"));
}
function eraseContent() {
    $("#content").empty();
}
function saveContentScrollPosition() {
    contentScrollPosition = $("#content")[0].scrollTop;
}
function restoreContentScrollPosition() {
    $("#content")[0].scrollTop = contentScrollPosition;
}
function renderError(message) {
    eraseContent();
    $("#content").append(
        $(`
            <div class="errorContainer">
                ${message}
            </div>
        `)
    );
}
function renderCreateBookmarkForm() {
    renderBookmarkForm();
}
async function renderEditBookmarkForm(id) {
    showWaitingGif();
    let Bookmark = await Bookmarks_API.Get(id);
    if (Bookmark !== null)
        renderBookmarkForm(Bookmark);
    else
        renderError("Bookmark introuvable!");
}
async function renderDeleteBookmarkForm(id) {
    showWaitingGif();
    $("#createBookmark").hide();
    $("#abort").show();
    $("#actionTitle").text("Retrait");
    let Bookmark = await Bookmarks_API.Get(id);
    let favicon = makeFavicon(Bookmark.Url);
    eraseContent();
    if (Bookmark !== null) {
        $("#content").append(`
        <div class="BookmarkdeleteForm">
            <h4>Effacer le favori suivant?</h4>
            <br>
            <div class="BookmarkRow" Bookmark_id=${Bookmark.Id}">
                <div class="BookmarkContainer noselect">
                    <div class="BookmarkLayout">
                        <div class="Bookmark">
                            <a href="${Bookmark.Url}" target="_blank"> ${favicon} </a>
                            <span class="BookmarkTitle">${Bookmark.Title}</span>
                        </div>
                        <span class="BookmarkCategory">${Bookmark.Category}</span>
                    </div>
                    <div class="BookmarkCommandPanel">
                        <span class="editCmd cmdIcon fa fa-pencil" editBookmarkId="${Bookmark.Id}" title="Modifier ${Bookmark.Title}"></span>
                        <span class="deleteCmd cmdIcon fa fa-trash" deleteBookmarkId="${Bookmark.Id}" title="Effacer ${Bookmark.Title}"></span>
                    </div>
                </div>
            </div>   
            <br>
            <input type="button" value="Effacer" id="deleteBookmark" class="btn btn-primary">
            <input type="button" value="Annuler" id="cancel" class="btn btn-secondary">
        </div>    
        `);
        $('#deleteBookmark').on("click", async function () {
            showWaitingGif();
            let result = await Bookmarks_API.Delete(Bookmark.Id);
            if (result)
                renderBookmarks();
            else
                renderError("Une erreur est survenue!");
        });
        $('#cancel').on("click", function () {
            renderBookmarks();
        });
    } else {
        renderError("Bookmark introuvable!");
    }
}
function getFormData($form) {
    const removeTag = new RegExp("(<[a-zA-Z0-9]+>)|(</[a-zA-Z0-9]+>)", "g");
    var jsonObject = {};
    $.each($form.serializeArray(), (index, control) => {
        jsonObject[control.name] = control.value.replace(removeTag, "");
    });
    return jsonObject;
}
function newBookmark() {
    Bookmark = {};
    Bookmark.Id = 0;
    Bookmark.Title = "";
    Bookmark.Url = "";
    Bookmark.Category = "";
    return Bookmark;
}
function renderBookmarkForm(Bookmark = null) {
    $("#createBookmark").hide();
    $("#abort").show();
    eraseContent();
    let create = Bookmark == null;
    let favicon = `<div class="big-favicon"></div>`;
    if (create)
        Bookmark = newBookmark();
    else
        favicon = makeFavicon(Bookmark.Url, true);
    $("#actionTitle").text(create ? "Création" : "Modification");
    $("#content").append(`
        <form class="form" id="BookmarkForm">
            <a href="${Bookmark.Url}" target="_blank" id="faviconLink" class="big-favicon" > ${favicon} </a>
            <br>
            <input type="hidden" name="Id" value="${Bookmark.Id}"/>

            <label for="Title" class="form-label">Titre </label>
            <input 
                class="form-control Alpha"
                name="Title" 
                id="Title" 
                placeholder="Titre"
                required
                RequireMessage="Veuillez entrer un titre"
                InvalidMessage="Le titre comporte un caractère illégal"
                value="${Bookmark.Title}"
            />
            <label for="Url" class="form-label">Url </label>
            <input
                class="form-control URL"
                name="Url"
                id="Url"
                placeholder="Url"
                required
                value="${Bookmark.Url}" 
            />
            <label for="Category" class="form-label">Catégorie </label>
            <input 
                class="form-control"
                name="Category"
                id="Category"
                placeholder="Catégorie"
                required
                value="${Bookmark.Category}"
            />
            <br>
            <input type="submit" value="Enregistrer" id="saveBookmark" class="btn btn-primary">
            <input type="button" value="Annuler" id="cancel" class="btn btn-secondary">
        </form>
    `);
    initFormValidation();
    $("#Url").on("change", function () {
        let favicon = makeFavicon($("#Url").val(), true);
        console.log($("#Url").val())

        $("#faviconLink").empty();
        $("#faviconLink").attr("href", $("#Url").val());
        $("#faviconLink").append(favicon);
    })
    $('#BookmarkForm').on("submit", async function (event) {
        event.preventDefault();
        let Bookmark = getFormData($("#BookmarkForm"));
        Bookmark.Id = parseInt(Bookmark.Id);
        showWaitingGif();
        let result = await Bookmarks_API.Save(Bookmark, create);
        if (result)
            renderBookmarks();
        else
            renderError("Une erreur est survenue!");
    });
    $('#cancel').on("click", function () {
        renderBookmarks();
    });
}
function makeFavicon(url, big = false) {
    // Utiliser l'API de google pour extraire le favicon du site pointé par url
    // retourne un élément div comportant le favicon en tant qu'image de fond
    ///////////////////////////////////////////////////////////////////////////
    if (url.slice(-1) != "/") url += "/";
    let faviconClass = "favicon";
    if (big) faviconClass = "big-favicon";
    url = "http://www.google.com/s2/favicons?sz=64&domain=" + url;
    return `<div class="${faviconClass}" style="background-image: url('${url}');"></div>`;
}
function renderBookmark(Bookmark) {
    let favicon = makeFavicon(Bookmark.Url);
    return $(`
     <div class="BookmarkRow" Bookmark_id=${Bookmark.Id}">
        <div class="BookmarkContainer noselect">
            <div class="BookmarkLayout">
                <div class="Bookmark">
                    <a href="${Bookmark.Url}" target="_blank"> ${favicon} </a>
                    <span class="BookmarkTitle">${Bookmark.Title}</span>
                </div>
                <span class="BookmarkCategory">${Bookmark.Category}</span>
            </div>
            <div class="BookmarkCommandPanel">
                <span class="editCmd cmdIcon fa fa-pencil" editBookmarkId="${Bookmark.Id}" title="Modifier ${Bookmark.Title}"></span>
                <span class="deleteCmd cmdIcon fa fa-trash" deleteBookmarkId="${Bookmark.Id}" title="Effacer ${Bookmark.Title}"></span>
            </div>
        </div>
    </div>           
    `);
}
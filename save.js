function saveTextToFile(saveText, path) {
    //const saveText = "tmp";

    // file setting
    const text = saveText;
    const name = path;
    const type = "text/plain";

    // create file
    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function saveJsonObjToFile(saveObj, path) {
    //const saveObj = { "a": 3 }; // tmp

    // file setting
    const text = JSON.stringify(saveObj);
    const name = path;
    const type = "text/plain";

    // create file
    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
}
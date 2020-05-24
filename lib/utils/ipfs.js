const folderUrl = url => {
    const lastSlashIndex = url.lastIndexOf("/");
    if (lastSlashIndex !== url.length-1) {
        url += "/"
    }
    if (url.endsWith("/index/")) {
        url = url.slice(0, url.length - 6);
    }
    let baseHref = "./";
    const slashCount = (url.match(/\//g) || []).length;
    if (slashCount > 1) {
        baseHref = "../".repeat(slashCount - 1);
    }

    let basepath;
    let regex;
    if (url.indexOf("/_") === -1) {
        let trimmed = url;
        if (trimmed.startsWith('/')) {
            trimmed = trimmed.slice(1)
        }
        if (trimmed.endsWith("/")) {
            trimmed = trimmed.slice(0, trimmed.length - 1)
        }
        if (slashCount > 1) {
            basepath = `/?.*`  //   `/.*/?(${trimmed})(/.*)?$`
            regex = `/${trimmed}/`
        } else {
            basepath = `/?.*` // "/.*(/)(/.*)?$"
            regex = `/`
        }
    }
    
    return {url, baseHref, slashCount, basepath, regex};
}

module.exports = {
    folderUrl,
}

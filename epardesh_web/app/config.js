var config = {};

config.appSettings = {};
//config.appSettings.serviceUrl = 'http://54.172.109.78:4000/';
config.appSettings.serviceUrl = 'http://www.epardesh.com:4000/';

CKEDITOR.editorConfig = function(config) {
    // config.filebrowserBrowseUrl = '/kcfinder/browse.php?opener=ckeditor&type=files';
    // config.filebrowserImageBrowseUrl = '/kcfinder/browse.php?opener=ckeditor&type=images';
    // config.filebrowserFlashBrowseUrl = '/kcfinder/browse.php?opener=ckeditor&type=flash';
    config.filebrowserUploadUrl = '/kcfinder/upload.php?opener=ckeditor&type=files';
    config.filebrowserImageUploadUrl = '/kcfinder/upload.php?opener=ckeditor&type=images';
    config.filebrowserFlashUploadUrl = '/kcfinder/upload.php?opener=ckeditor&type=flash';
};



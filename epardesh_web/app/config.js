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

config.metaData = {
    events: {
        title: 'Indian Events in USA — ePardesh',
        description: 'Find all the upcoming Indian events in USA here. Buy online tickets for Indian shows, artist tours, and community celebrations.'
    },
    default: {
        title: 'Free Classified Websites | Advertise Your Business | Local Ad Posting Sites — ePardesh',
        description: 'All in one— publish free classified ads for matrimony, finding roommates, or share Indian community events on our online advertising site.'
    },
    matrimony: {
        title: 'Indian Matrimony Sites in USA – ePardesh',
        description: 'Find your Indian bride or groom on one of the most trusted Indian matrimonial sites in USA. Start your search for soulmate today!'
    },
    training: {
        title: 'It Training Institutes – ePardesh',
        description: 'Our IT training institute offers hands-on training and certifications. Check out our online and on-demand trainings currently open for registrations.'
    }
}



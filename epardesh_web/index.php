<?php

/**
 * @var Data for setting up metadata via server
 */
$metaData = [
    'events' => [
        'title'         => 'Indian Events in USA — ePardesh',
        'description'   => 'Find all the upcoming Indian events in USA here. Buy online tickets for Indian shows, artist tours, and community celebrations.',
        'match'         => 'events?.*'
    ],
    'default' => [
        'title'         => 'Free Classified Websites | Advertise Your Business | Local Ad Posting Sites — ePardesh',
        'description'   => 'All in one— publish free classified ads for matrimony, finding roommates, or share Indian community events on our online advertising site.'
    ],
    'matrimony' => [
        'title'         => 'Indian Matrimony Sites in USA – ePardesh',
        'description'   => 'Find your Indian bride or groom on one of the most trusted Indian matrimonial sites in USA. Start your search for soulmate today!',
        'match'         => '(matrimony)|(mlogin)|(msign)|(mforgot)|(mupdate-password).*'
    ],
    'training' => [
        'title'         => 'It Training Institutes – ePardesh',
        'description'   => 'Our IT training institute offers hands-on training and certifications. Check out our online and on-demand trainings currently open for registrations.',
        'match'         => 'training.*'
    ]
];

/**
 * @var container for PHP variables we need to render
 */
$vars = [];

$vars += $metaData['default'];
foreach ($metaData as $name => $route) if ($name != 'default') {
    if ($route['match']) {
        if (preg_match('/\/' . $route['match'] . '/', $_SERVER['REQUEST_URI'])) {
            $vars['title'] = $route['title'];
            $vars['description'] = $route['description'];
            break;
        }
    }
}

/**
 * Run PHP as it is to render PHP variables
 */
ob_start();
extract($vars, EXTR_SKIP);
require_once('index.html');
$content = ob_get_contents();
ob_end_clean();

print $content;
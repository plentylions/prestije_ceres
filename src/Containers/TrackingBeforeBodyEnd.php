<?php

namespace PrestijeLegend\Containers;

use Plenty\Plugin\Templates\Twig;

class TrackingBeforeBodyEnd
{
    public function call(Twig $twig, $arg):string
    {
        return $twig->render('PrestijeLegend::Containers.TrackingBeforeBodyEnd');
    }
}
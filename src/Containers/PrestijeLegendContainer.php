<?php

namespace PrestijeLegend\Containers;

use Plenty\Plugin\Templates\Twig;

class PrestijeLegendContainer
{
    public function call(Twig $twig):string
    {
        return $twig->render('PrestijeLegend::Stylesheet');
    }
}